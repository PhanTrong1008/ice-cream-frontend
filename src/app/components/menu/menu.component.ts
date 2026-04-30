import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IceCreamService } from '../../services/ice-cream.service';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { IceCream } from '../../models/ice-cream.model';
import { CreateOrderItem } from '../../models/order.model';

interface CartItem {
  iceCream: IceCream;
  quantity: number;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  flavors = signal<IceCream[]>([]);
  cart = signal<CartItem[]>([]);
  loading = signal(true);
  error = signal('');
  orderSuccess = signal('');
  orderLoading = signal(false);

  cartTotal = computed(() =>
    this.cart().reduce((sum, item) => sum + +item.iceCream.price * item.quantity, 0),
  );

  constructor(
    private iceCreamService: IceCreamService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadFlavors();
  }

  loadFlavors(): void {
    this.loading.set(true);
    this.iceCreamService.getAll().subscribe({
      next: (flavors) => {
        this.flavors.set(flavors);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load menu. Please try again.');
        this.loading.set(false);
      },
    });
  }

  addToCart(flavor: IceCream): void {
    this.cart.update((cart) => {
      const existing = cart.find((item) => item.iceCream.id === flavor.id);
      if (existing) {
        if (existing.quantity < flavor.stock) {
          return cart.map((item) =>
            item.iceCream.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item,
          );
        }
        return cart;
      }
      return [...cart, { iceCream: flavor, quantity: 1 }];
    });
  }

  removeFromCart(flavorId: number): void {
    this.cart.update((cart) => cart.filter((item) => item.iceCream.id !== flavorId));
  }

  updateQuantity(flavorId: number, delta: number): void {
    this.cart.update((cart) => {
      const item = cart.find((i) => i.iceCream.id === flavorId);
      if (!item) return cart;

      const newQty = item.quantity + delta;
      if (newQty <= 0) return cart.filter((i) => i.iceCream.id !== flavorId);
      if (newQty > item.iceCream.stock) return cart;

      return cart.map((i) =>
        i.iceCream.id === flavorId ? { ...i, quantity: newQty } : i,
      );
    });
  }

  getCartQuantity(flavorId: number): number {
    return this.cart().find((item) => item.iceCream.id === flavorId)?.quantity ?? 0;
  }

  placeOrder(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.cart().length === 0) return;

    this.orderLoading.set(true);
    this.error.set('');
    this.orderSuccess.set('');

    const items: CreateOrderItem[] = this.cart().map((item) => ({
      iceCreamId: item.iceCream.id,
      quantity: item.quantity,
    }));

    this.orderService.create(items).subscribe({
      next: () => {
        this.orderSuccess.set('Order placed successfully!');
        this.cart.set([]);
        this.orderLoading.set(false);
        this.loadFlavors();
      },
      error: (err) => {
        this.error.set(err.error?.message || 'Failed to place order. Please try again.');
        this.orderLoading.set(false);
      },
    });
  }
}
