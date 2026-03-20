import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsListComponent } from './meals-list.component';

describe('MealsList', () => {
  let component: MealsListComponent;
  let fixture: ComponentFixture<MealsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MealsListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
