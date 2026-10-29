import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslocoTestingModule } from '@jsverse/transloco';
import { DishClipboardService } from '../../../core/services/dish-clipboard.service';
import { CopyDishesButtonComponent } from './copy-dishes-button.component';

describe('CopyDishesButtonComponent', () => {
  let fixture: ComponentFixture<CopyDishesButtonComponent>;
  const copy = vi.fn<() => Promise<void>>();

  beforeEach(async () => {
    copy.mockReset().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({
      imports: [
        CopyDishesButtonComponent,
        TranslocoTestingModule.forRoot({
          langs: {
            en: {
              copy: {
                description: 'Copy all dishes with their ingredients',
                success: 'Dishes and ingredients copied',
                error: 'Could not copy. Allow clipboard access and try again.',
              },
            },
          },
          translocoConfig: { availableLangs: ['en'], defaultLang: 'en' },
          preloadLangs: true,
        }),
      ],
      providers: [{ provide: DishClipboardService, useValue: { copy } }],
    }).compileComponents();
    fixture = TestBed.createComponent(CopyDishesButtonComponent);
    fixture.componentRef.setInput('dishes', [{ id: 'soup', name: 'Soup', ingredients: [] }]);
    await fixture.whenStable();
  });

  it('provides an accessible icon button and confirms successful copying', async () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.getAttribute('aria-label')).toBe('Copy all dishes with their ingredients');
    expect(button.textContent?.trim()).toBe('');

    button.click();
    await fixture.whenStable();

    expect(copy).toHaveBeenCalledOnce();
    expect(button.title).toBe('Dishes and ingredients copied');
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Dishes and ingredients copied',
    );
  });

  it('shows a clipboard error and allows retrying', async () => {
    copy.mockRejectedValueOnce(new Error('Clipboard access denied'));
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');

    button.click();
    await fixture.whenStable();

    expect(button.disabled).toBe(false);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Could not copy',
    );

    button.click();
    await fixture.whenStable();

    expect(copy).toHaveBeenCalledTimes(2);
    expect(fixture.componentInstance.status()).toBe('success');
  });

  it('disables copying when the list becomes empty and clears stale feedback', async () => {
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    fixture.componentRef.setInput('dishes', []);
    await fixture.whenStable();

    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
    expect(fixture.componentInstance.status()).toBe('idle');
    button.click();
    expect(copy).toHaveBeenCalledOnce();
  });
});
