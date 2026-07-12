import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCog6Tooth, heroShoppingCart } from '@ng-icons/heroicons/outline';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-header',
  imports: [RouterModule, NgIcon, TranslocoPipe],
  viewProviders: [provideIcons({ heroShoppingCart, heroCog6Tooth })],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly cartService = inject(CartService);
}
