import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDrawerComponent } from './products-drawer.component';

describe('ProductsDrawerComponent', () => {
  let component: ProductsDrawerComponent;
  let fixture: ComponentFixture<ProductsDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
