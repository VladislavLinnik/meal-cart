import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartMealsList } from './cart-meals-list';

describe('CartMealsList', () => {
  let component: CartMealsList;
  let fixture: ComponentFixture<CartMealsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartMealsList],
    }).compileComponents();

    fixture = TestBed.createComponent(CartMealsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
