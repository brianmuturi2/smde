import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorApprovedDocumentsComponent } from './validator-approved-documents.component';

describe('ValidatorApprovedDocumentsComponent', () => {
  let component: ValidatorApprovedDocumentsComponent;
  let fixture: ComponentFixture<ValidatorApprovedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorApprovedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorApprovedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
