import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};
  id;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {
    this.categories$ = categoryService.getAll();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      // take(1) is workaroud for avoid implemenataion on unsubscribe
      this.productService.get(this.id).take(1).subscribe(p => this.product = p);
    }
  }

  ngOnInit() {
  }

  save(product) {
    if (this.id) {
      console.log(product);
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }

    this.navigateToProducts();
  }

  delete(productId) {
    if (!confirm('Are you sure to you want delete this product?')) {
      return;
    }

    this.productService.delete(productId);
    this.navigateToProducts();
  }

  private navigateToProducts() {
    this.router.navigate(['/admin/products']);
  }
}
