import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedDocumentsComponent } from './rejected-documents.component';

describe('RejectedDocumentsComponent', () => {
  let component: RejectedDocumentsComponent;
  let fixture: ComponentFixture<RejectedDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
