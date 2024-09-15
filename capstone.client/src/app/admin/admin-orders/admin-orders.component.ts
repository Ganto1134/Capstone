import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];
  selectedOrder: any = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Errore nel recuperare gli ordini:', error);
      }
    );
  }

  updateOrderStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe(
      () => {
        this.fetchOrders();
      },
      (error) => {
        console.error('Errore durante l\'aggiornamento dello stato:', error);
      }
    );
  }

  openModal(order: any): void {
    this.selectedOrder = order;
  }

  closeModal(): void {
    this.selectedOrder = null;
  }
}

