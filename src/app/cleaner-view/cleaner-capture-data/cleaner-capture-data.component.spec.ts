import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanerCaptureDataComponent } from './cleaner-capture-data.component';

describe('CleanerCaptureDataComponent', () => {
  let component: CleanerCaptureDataComponent;
  let fixture: ComponentFixture<CleanerCaptureDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleanerCaptureDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanerCaptureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
