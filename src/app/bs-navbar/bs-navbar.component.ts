import { forEach } from '@angular/router/src/utils/collection';
import { ShoppingCartService } from '../src/app/services/shopping-cart.service';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Cart } from '../models/cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  appUser: AppUser;
  cart: Cart;
  shoppingItemCount: number;
  constructor(private auth: AuthService, private cartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
  }

  public async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    let cart$ = await this.cartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      this.cart = cart;
      this.shoppingItemCount = 0;
      // tslint:disable-next-line:forin
      for (const productId in cart.items) {
        console.log(cart.items[productId].quantity);
        this.shoppingItemCount += cart.items[productId].quantity;
      }
    });
  }

  public ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }
}
