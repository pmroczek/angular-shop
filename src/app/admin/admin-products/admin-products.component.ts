import { query } from '@angular/core/src/animation/dsl';
import { ProductService } from '../../services/product.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  items: Product[] = [];
  filteredProducts: Product[];
  tableResourse: DataTableResource<Product>;
  subscription: Subscription;
  itemsCount: number;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll().subscribe(products => {
      this.products = this.filteredProducts = products;
      this.initTable(products);
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  reloadItems(params) {
    if (!this.tableResourse) {
      return;
    }
    this.tableResourse.query(params)
      .then(items => this.items = items);
  }

  private initTable(products: Product[]) {
    this.tableResourse = new DataTableResource(products);
    this.tableResourse.query({ offset: 0 })
      .then(items => this.items = items);
    this.tableResourse.count()
      .then(count => this.itemsCount = count);
  }
}
