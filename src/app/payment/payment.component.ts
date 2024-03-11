import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../orders.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomerData } from '../customer-data';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _OrdersService: OrdersService,
    private _CartService: CartService
  ) {}
  cartId!: string;
  successMsg: boolean = false;
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((p) => (this.cartId = p['id']));
  }
  paymentForm: FormGroup = new FormGroup({
    details: new FormControl(null),
    phone: new FormControl(null),
    city: new FormControl(null),
  });
  payMethod(paymentForm: any): void {
    this._OrdersService
      .createOnlineOrder(paymentForm.value, this.cartId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this._CartService.carItemsNum.next(0)
          this.successMsg = true;
          window.open(res.session.url, '_self');
        },
        error: (err) => {
          this.successMsg = false;
          console.log(err);
        },
      });
    this.successMsg = false;
  }
}
