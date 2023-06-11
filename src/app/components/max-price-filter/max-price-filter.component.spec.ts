import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxPriceFilterComponent } from './max-price-filter.component';

describe('MaxPriceFilterComponent', () => {
  let component: MaxPriceFilterComponent;
  let fixture: ComponentFixture<MaxPriceFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxPriceFilterComponent]
    });
    fixture = TestBed.createComponent(MaxPriceFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
