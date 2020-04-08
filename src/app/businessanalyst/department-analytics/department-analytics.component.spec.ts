import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentAnalyticsComponent } from './department-analytics.component';

describe('DepartmentAnalyticsComponent', () => {
  let component: DepartmentAnalyticsComponent;
  let fixture: ComponentFixture<DepartmentAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
