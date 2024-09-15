import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getMyOrders().subscribe((data) => {
      this.orders = data;
    }, error => {
      console.error('Errore nel recuperare i miei ordini:', error);
    });
  }

  viewOrderDetails(orderId: number): void {
    this.orderService.getOrderById(orderId).subscribe((data) => {
      this.selectedOrder = data;
    }, error => {
      console.error('Errore nel recuperare i dettagli dell\'ordine:', error);
    });
  }

  closeModal(): void {
    this.selectedOrder = null;
  }
}
