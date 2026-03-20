import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartIngredientsList } from './cart-ingredients-list';

describe('CartIngredientsList', () => {
  let component: CartIngredientsList;
  let fixture: ComponentFixture<CartIngredientsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartIngredientsList],
    }).compileComponents();

    fixture = TestBed.createComponent(CartIngredientsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
