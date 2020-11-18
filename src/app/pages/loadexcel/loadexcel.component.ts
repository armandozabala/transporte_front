import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/service/customers.service';
import * as XLSX from 'xlsx';
import { BlockUI, NgBlockUI } from 'ng-block-ui';


type AOA = any[][];

@Component({
  selector: 'app-loadexcel',
  templateUrl: './loadexcel.component.html',
  styleUrls: ['./loadexcel.component.css']
})
export class LoadexcelComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  data: AOA = [];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName: string = 'SheetJS.xlsx';


  constructor(private customerService: CustomersService) { }

  ngOnInit(): void {
  }


  onFileChange(evt: any) {

    this.blockUI.start('Loading...');
    /* wire up file reader */

    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1, raw: true}));


      let dataExcel = this.data.shift();


      this.customerService.registerEntregas(this.data).subscribe((res:any) =>{

          console.log(res);

          this.blockUI.stop();
      });



    };
    reader.readAsBinaryString(target.files[0]);
  }




  export(): void {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.data);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


}
