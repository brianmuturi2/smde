import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeDocumentComponent } from './revoke-document.component';

describe('RevokeDocumentComponent', () => {
  let component: RevokeDocumentComponent;
  let fixture: ComponentFixture<RevokeDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevokeDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevokeDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
