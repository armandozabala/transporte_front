import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerexcelComponent } from './customerexcel.component';

describe('CustomerexcelComponent', () => {
  let component: CustomerexcelComponent;
  let fixture: ComponentFixture<CustomerexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
