import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBlankComponent } from './product-blank.component';

describe('ProductBlankComponent', () => {
  let component: ProductBlankComponent;
  let fixture: ComponentFixture<ProductBlankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBlankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBlankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
