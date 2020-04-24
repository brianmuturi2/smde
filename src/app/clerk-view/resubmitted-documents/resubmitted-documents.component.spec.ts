import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResubmittedDocumentsComponent } from './resubmitted-documents.component';

describe('ResubmittedDocumentsComponent', () => {
  let component: ResubmittedDocumentsComponent;
  let fixture: ComponentFixture<ResubmittedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResubmittedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResubmittedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
