import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedDocumentsComponent } from './approved-documents.component';

describe('ApprovedDocumentsComponent', () => {
  let component: ApprovedDocumentsComponent;
  let fixture: ComponentFixture<ApprovedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
