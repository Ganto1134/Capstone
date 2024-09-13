import { Component } from '@angular/core';
import { Card } from '../../models/card.model';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrl: './card-create.component.css'
})
export class CardCreateComponent {
  card: Card = {
    id: 0,
    name: '',
    condition: '',
    gameCategory: '',
    price: 0,
    imageUrl: ''
  };

  constructor(private cardService: CardService, private router: Router) { }

  createCard(): void {
    this.cardService.createCard(this.card).subscribe(() => {
      this.router.navigate(['/admin/list']);
    });
  }
}
