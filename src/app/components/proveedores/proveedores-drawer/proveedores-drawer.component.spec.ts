import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresDrawerComponent } from './proveedores-drawer.component';

describe('ProveedoresDrawerComponent', () => {
  let component: ProveedoresDrawerComponent;
  let fixture: ComponentFixture<ProveedoresDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
