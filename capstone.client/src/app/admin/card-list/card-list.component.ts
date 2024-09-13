import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.css'
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.cardService.getCards().subscribe((data: Card[]) => {
      this.cards = data;
    });
  }

  deleteCard(id: number): void {
    this.cardService.deleteCard(id).subscribe(() => {
      this.cards = this.cards.filter(card => card.id !== id);
    });
  }
}
