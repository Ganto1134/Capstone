import { Component, OnInit } from '@angular/core';
import { CardService } from '../../../services/card.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-card-purchase',
  templateUrl: './card-purchase.component.html',
  styleUrls: ['./card-purchase.component.css']
})
export class CardPurchaseComponent implements OnInit {
  cards: any[] = [];

  constructor(private cardService: CardService, private cartService: CartService) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getAllCards(): void {
    this.cardService.getCards().subscribe((data: any[]) => {
      this.cards = data;
    });
  }

  addToCart(cardId: number, quantity: number = 1): void {
    this.cartService.addToCart(cardId, quantity).subscribe(() => {
      alert('Carta aggiunta al carrello!');
    });
  }
}
