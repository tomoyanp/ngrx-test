import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorWrapperComponent } from './error-wrapper.component';

describe('ErrorWrapperComponent', () => {
  let component: ErrorWrapperComponent;
  let fixture: ComponentFixture<ErrorWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
