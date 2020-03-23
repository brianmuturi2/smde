import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorDocumentDetailsComponent } from './validator-document-details.component';

describe('ValidatorDocumentDetailsComponent', () => {
  let component: ValidatorDocumentDetailsComponent;
  let fixture: ComponentFixture<ValidatorDocumentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorDocumentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorDocumentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
