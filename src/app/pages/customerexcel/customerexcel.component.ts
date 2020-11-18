import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CustomersService } from 'src/app/service/customers.service';
import * as XLSX from 'xlsx';

type AOA = any[][];

@Component({
  selector: 'app-customerexcel',
  templateUrl: './customerexcel.component.html',
  styleUrls: ['./customerexcel.component.css']
})
export class CustomerexcelComponent implements OnInit {

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


      this.customerService.registerCustomersExcel(this.data).subscribe((res:any) =>{

          console.log(res);

          this.blockUI.stop();
      });



    };
    reader.readAsBinaryString(target.files[0]);
  }


}
