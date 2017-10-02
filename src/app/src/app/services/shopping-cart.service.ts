import { Product } from '../../../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import { Cart } from '../../../models/cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  public async addToCart(product: Product) {
    this.chagneProductQuantity(product, 1);
  }

  public async removeFromCart(product: Product) {
    this.chagneProductQuantity(product, -1);
  }

  public async getCart(): Promise<FirebaseObjectObservable<Cart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem('cartId', cartId);
    return result.key;
  }

  private async chagneProductQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.$key);
    item$
      .take(1).subscribe(item => {
        item$.update({ product: product, quantity: (item.quantity || 0) + change });
      });
  }
}
