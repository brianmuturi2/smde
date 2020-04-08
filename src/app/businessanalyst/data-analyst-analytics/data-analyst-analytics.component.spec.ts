import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalystAnalyticsComponent } from './data-analyst-analytics.component';

describe('DataAnalystAnalyticsComponent', () => {
  let component: DataAnalystAnalyticsComponent;
  let fixture: ComponentFixture<DataAnalystAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataAnalystAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataAnalystAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
