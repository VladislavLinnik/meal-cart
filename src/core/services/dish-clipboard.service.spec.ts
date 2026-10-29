import { TestBed } from '@angular/core/testing';
import { TranslocoService, TranslocoTestingModule } from '@jsverse/transloco';
import { DishClipboardService } from './dish-clipboard.service';
import { Dish } from '../models/dish.model';
import { CartDish } from '../models/cart.model';

describe('DishClipboardService', () => {
  let service: DishClipboardService;
  const writeText = vi.fn<(text: string) => Promise<void>>();
  const dishes: Dish[] = [
    {
      id: 'soup',
      name: 'Soup',
      ingredients: [
        { name: 'Carrots', amount: 0.1, unit: 'Kg', selected: true },
        { name: 'Water', amount: 1, unit: 'Lt' },
      ],
    },
    {
      id: 'salad',
      name: 'Salad',
      ingredients: [{ name: 'Tomatoes', amount: 2, unit: 'Piece' }],
    },
  ];

  beforeEach(() => {
    writeText.mockReset().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    TestBed.configureTestingModule({
      imports: [
        TranslocoTestingModule.forRoot({
          langs: {
            en: { units: { kg: 'kg', lt: 'l', piece: 'pc' } },
            uk: { units: { kg: 'кг', lt: 'л', piece: 'шт' } },
          },
          translocoConfig: { availableLangs: ['en', 'uk'], defaultLang: 'en' },
          preloadLangs: true,
        }),
      ],
    });
    service = TestBed.inject(DishClipboardService);
  });

  afterEach(() => vi.unstubAllGlobals());

  it('copies every dish with its ingredients, amounts and units', async () => {
    await service.copy(dishes);

    expect(writeText).toHaveBeenCalledExactlyOnceWith(
      'Soup\n- Carrots: 0.1 kg\n- Water: 1 l\n\nSalad\n- Tomatoes: 2 pc',
    );
  });

  it('scales cart ingredients by each dish quantity without floating point artifacts', async () => {
    const cart: CartDish[] = dishes.map((dish, index) => ({ ...dish, quantity: index ? 2 : 3 }));
    const original = structuredClone(cart);

    await service.copy(cart);

    expect(writeText).toHaveBeenCalledExactlyOnceWith(
      'Soup ×3\n- Carrots: 0.3 kg\n- Water: 3 l\n\nSalad ×2\n- Tomatoes: 4 pc',
    );
    expect(cart).toEqual(original);
  });

  it('uses the active language for ingredient units', async () => {
    TestBed.inject(TranslocoService).setActiveLang('uk');

    await service.copy(dishes);

    expect(writeText).toHaveBeenCalledExactlyOnceWith(
      'Soup\n- Carrots: 0.1 кг\n- Water: 1 л\n\nSalad\n- Tomatoes: 2 шт',
    );
  });

  it('leaves the clipboard unchanged for an empty list', async () => {
    await service.copy([]);

    expect(writeText).not.toHaveBeenCalled();
  });

  it('reports a rejected clipboard request to the caller', async () => {
    writeText.mockRejectedValue(new Error('Clipboard access denied'));

    await expect(service.copy(dishes)).rejects.toThrow('Clipboard access denied');
  });

  it('reports an unavailable clipboard API to the caller', async () => {
    vi.stubGlobal('navigator', {});

    await expect(service.copy(dishes)).rejects.toThrow();
  });
});
