import { TestBed, inject } from '@angular/core/testing';

import { ProductCartService } from './product-cart.service';

describe('ProductCartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCartService]
    });
  });

  it('should be created', inject([ProductCartService], (service: ProductCartService) => {
    expect(service).toBeTruthy();
  }));
});
