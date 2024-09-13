import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit {
  card: Card | null = null;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cardService.getCard(id).subscribe((data: Card) => {
      this.card = data;
    });
  }
}
