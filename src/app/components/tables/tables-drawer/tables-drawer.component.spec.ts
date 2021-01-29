import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesDrawerComponent } from './tables-drawer.component';

describe('TablesDrawerComponent', () => {
  let component: TablesDrawerComponent;
  let fixture: ComponentFixture<TablesDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablesDrawerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
