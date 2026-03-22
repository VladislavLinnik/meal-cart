import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormComponent } from './dish-form.component';

describe('MealsForm', () => {
  let component: DishFormComponent;
  let fixture: ComponentFixture<DishFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DishFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DishFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
