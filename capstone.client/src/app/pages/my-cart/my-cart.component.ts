import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {
  cart: any = { cartItems: [] };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getMyCart().subscribe((data) => {
      console.log("Dati del carrello dal backend:", data);
      this.cart = data;
    }, error => {
      console.error('Errore nel recuperare il carrello:', error);
    });
  }

  getTotal(): number {
    return this.cart.items.reduce((sum: number, item: any) => {
      return sum + (item.card.price * item.quantity);
    }, 0);
  }

  removeFromCart(itemId: number): void {
    this.cartService.removeFromCart(itemId).subscribe(() => {
      this.cartService.getMyCart().subscribe((data) => {
        this.cart = data;
      });
    }, error => {
      console.error('Errore durante la rimozione dell\'articolo:', error);
    });
  }

  checkout(): void {
    this.cartService.checkout().subscribe((response) => {
      console.log(response.message);
      this.cart = { items: [] };
    }, error => {
      console.error('Errore durante il checkout:', error);
    });
  }
}
