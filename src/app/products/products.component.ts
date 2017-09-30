import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnDestroy {
  products: Product[] = [];
  allProducts: Product[] = [];
  subscribcion: Subscription;
  categories$;
  category;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.subscribcion = productService.getAll()
    .switchMap(products => {
      this.allProducts = products;
      return route.queryParamMap;
    }).subscribe(param => {
      this.category = param.get('category');
      this.filter(this.category);
    });

    this.categories$ = categoryService.getAll();
  }

  public ngOnDestroy(): void {
    this.subscribcion.unsubscribe();
  }

  private filter(category: string) {
    this.products = (category)
      ? this.allProducts.filter(product => product.category.includes(category))
      : this.allProducts;
  }
}
