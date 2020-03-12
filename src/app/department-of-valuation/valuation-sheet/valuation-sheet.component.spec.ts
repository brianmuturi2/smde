import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuationSheetComponent } from './valuation-sheet.component';

describe('ValuationSheetComponent', () => {
  let component: ValuationSheetComponent;
  let fixture: ComponentFixture<ValuationSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuationSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
