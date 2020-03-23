import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatorAnalyticsComponent } from './validator-analytics.component';

describe('ValidatorAnalyticsComponent', () => {
  let component: ValidatorAnalyticsComponent;
  let fixture: ComponentFixture<ValidatorAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidatorAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatorAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
