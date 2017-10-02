import { ShoppingCartService } from '../src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  allProducts: Product[] = [];
  subscribcion: Subscription;
  cartSubscribcion: Subscription;
  category: string;
  cart;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService) {
    this.subscribcion = productService.getAll()
      .switchMap(products => {
        this.allProducts = products;
        return route.queryParamMap;
      }).subscribe(param => {
        this.category = param.get('category');
        this.filter(this.category);
      });
  }

  async ngOnInit() {
    this.cartSubscribcion = (await this.cartService.getCart()).subscribe(cart => this.cart = cart);
  }

  public ngOnDestroy(): void {
    this.subscribcion.unsubscribe();
    this.cartSubscribcion.unsubscribe();
  }

  private filter(category: string) {
    this.products = (category)
      ? this.allProducts.filter(product => product.category.includes(category))
      : this.allProducts;
  }
}
