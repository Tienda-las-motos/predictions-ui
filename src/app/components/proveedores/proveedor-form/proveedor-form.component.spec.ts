import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorFormComponent } from './proveedor-form.component';

describe('ProveedorFormComponent', () => {
  let component: ProveedorFormComponent;
  let fixture: ComponentFixture<ProveedorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
