import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../orders.service';
import { Order } from '../customer-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-order',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './all-order.component.html',
  styleUrls: ['./all-order.component.scss'],
})
export class AllOrderComponent implements OnInit{
  constructor(private _OrdersService: OrdersService){};
  cartId!:any
  orders!:Order[]
  ngOnInit(): void {
    this.cartId = localStorage.getItem('userCartId');
      this._OrdersService.getUserOrders(this.cartId).subscribe({
        next: (res)=>{
          this.orders = res
          console.log(this.orders);
        },
        error: (err)=>{
          console.log(err);
        }
      })
  }
}
