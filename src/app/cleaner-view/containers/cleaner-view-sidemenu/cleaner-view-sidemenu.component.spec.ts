import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerViewSidemenuComponent } from './cleaner-view-sidemenu.component';

describe('CleanerViewSidemenuComponent', () => {
  let component: CleanerViewSidemenuComponent;
  let fixture: ComponentFixture<CleanerViewSidemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerViewSidemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerViewSidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
