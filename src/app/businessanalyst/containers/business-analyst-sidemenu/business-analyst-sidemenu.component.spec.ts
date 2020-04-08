import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAnalystSidemenuComponent } from './business-analyst-sidemenu.component';

describe('AdministrationManagementSidemenuComponent', () => {
  let component: BusinessAnalystSidemenuComponent;
  let fixture: ComponentFixture<BusinessAnalystSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessAnalystSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessAnalystSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
