import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorViewBaseComponent } from './auditor-view-base.component';

describe('AuditorViewBaseComponent', () => {
  let component: AuditorViewBaseComponent;
  let fixture: ComponentFixture<AuditorViewBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorViewBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
