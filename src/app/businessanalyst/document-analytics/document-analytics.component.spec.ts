import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAnalyticsComponent } from './document-analytics.component';

describe('DocumentAnalyticsComponent', () => {
  let component: DocumentAnalyticsComponent;
  let fixture: ComponentFixture<DocumentAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
