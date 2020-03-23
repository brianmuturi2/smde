import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorRejectedDocumentsComponent } from './validator-rejected-documents.component';

describe('ValidatorRejectedDocumentsComponent', () => {
  let component: ValidatorRejectedDocumentsComponent;
  let fixture: ComponentFixture<ValidatorRejectedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorRejectedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorRejectedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
