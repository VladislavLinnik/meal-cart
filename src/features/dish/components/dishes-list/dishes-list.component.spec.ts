import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishesListComponent } from './dishes-list.component';

describe('DishesList', () => {
  let component: DishesListComponent;
  let fixture: ComponentFixture<DishesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
