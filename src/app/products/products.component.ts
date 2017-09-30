import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnDestroy {
  products: Product[];
  allProducts: Product[];
  subscribcion: Subscription;
  categories$;
  category;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute) {
    this.subscribcion = productService.getAll().subscribe(products => {
      this.allProducts = products;
      this.filter(this.category);
    });

    this.categories$ = categoryService.getAll();
    this.route.queryParamMap.subscribe(param => {
      this.category = param.get('category');
      this.filter(this.category);
    });
  }

  public ngOnDestroy(): void {
    this.subscribcion.unsubscribe();
  }

  private filter(category: string) {
    if (!this.allProducts) {
      return;
    }

    this.products = (category)
      ? this.allProducts.filter(product => product.category.includes(category))
      : this.allProducts;
  }
}
