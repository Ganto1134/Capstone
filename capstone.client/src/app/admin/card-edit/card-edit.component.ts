import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrl: './card-edit.component.css'
})
export class CardEditComponent implements OnInit {
  card: Card = {
    id: 0,
    name: '',
    condition: '',
    gameCategory: '',
    price: 0,
    imageUrl: ''
  };

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cardService.getCard(id).subscribe((data: Card) => {
      this.card = data;
    });
  }

  updateCard(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cardService.updateCard(id, this.card).subscribe(() => {
      this.router.navigate(['/admin/list']);
    });
  }
}
