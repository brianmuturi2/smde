import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerViewBaseComponent } from './cleaner-view-base.component';

describe('CleanerViewBaseComponent', () => {
  let component: CleanerViewBaseComponent;
  let fixture: ComponentFixture<CleanerViewBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerViewBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerViewBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
