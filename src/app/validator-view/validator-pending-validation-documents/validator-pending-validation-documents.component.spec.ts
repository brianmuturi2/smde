import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorPendingValidationDocumentsComponent } from './validator-pending-validation-documents.component';

describe('ValidatorPendingValidationDocumentsComponent', () => {
  let component: ValidatorPendingValidationDocumentsComponent;
  let fixture: ComponentFixture<ValidatorPendingValidationDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorPendingValidationDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorPendingValidationDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
