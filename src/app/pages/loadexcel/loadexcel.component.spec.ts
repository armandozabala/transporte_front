import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadexcelComponent } from './loadexcel.component';

describe('LoadexcelComponent', () => {
  let component: LoadexcelComponent;
  let fixture: ComponentFixture<LoadexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
