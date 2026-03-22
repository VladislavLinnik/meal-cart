import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartDishesList } from './cart-dishes-list';

describe('CartDishesList', () => {
  let component: CartDishesList;
  let fixture: ComponentFixture<CartDishesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDishesList],
    }).compileComponents();

    fixture = TestBed.createComponent(CartDishesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
