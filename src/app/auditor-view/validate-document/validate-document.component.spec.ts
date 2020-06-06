import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDocumentComponent } from './validate-document.component';

describe('ValidateDocumentComponent', () => {
  let component: ValidateDocumentComponent;
  let fixture: ComponentFixture<ValidateDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
