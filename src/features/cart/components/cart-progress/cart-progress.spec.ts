import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProgress } from './cart-progress';

describe('CartProgress', () => {
  let component: CartProgress;
  let fixture: ComponentFixture<CartProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(CartProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
