import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataClerkAnalyticsComponent } from './data-clerk-analytics.component';

describe('DataClerkAnalyticsComponent', () => {
  let component: DataClerkAnalyticsComponent;
  let fixture: ComponentFixture<DataClerkAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataClerkAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataClerkAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
