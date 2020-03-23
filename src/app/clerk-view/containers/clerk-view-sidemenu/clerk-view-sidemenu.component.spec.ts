import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationManagementSidemenuComponent } from './administration-management-sidemenu.component';

describe('AdministrationManagementSidemenuComponent', () => {
  let component: AdministrationManagementSidemenuComponent;
  let fixture: ComponentFixture<AdministrationManagementSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrationManagementSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrationManagementSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
