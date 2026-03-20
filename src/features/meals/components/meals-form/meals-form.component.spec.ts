import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealsFormComponent } from './meals-form.component';

describe('MealsForm', () => {
  let component: MealsFormComponent;
  let fixture: ComponentFixture<MealsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MealsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MealsFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
