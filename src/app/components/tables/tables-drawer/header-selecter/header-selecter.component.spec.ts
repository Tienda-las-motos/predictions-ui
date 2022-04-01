import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSelecterComponent } from './header-selecter.component';

describe('HeaderSelecterComponent', () => {
  let component: HeaderSelecterComponent;
  let fixture: ComponentFixture<HeaderSelecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderSelecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSelecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
