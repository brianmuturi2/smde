import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSwapperComponent } from './document-swapper.component';

describe('DocumentSwapperComponent', () => {
  let component: DocumentSwapperComponent;
  let fixture: ComponentFixture<DocumentSwapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentSwapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSwapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
