import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorViewSidemenuComponent } from './auditor-view-sidemenu.component';

describe('AuditorViewSidemenuComponent', () => {
  let component: AuditorViewSidemenuComponent;
  let fixture: ComponentFixture<AuditorViewSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditorViewSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditorViewSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
