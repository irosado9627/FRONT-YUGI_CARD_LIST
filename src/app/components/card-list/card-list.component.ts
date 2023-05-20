import { Component, OnInit } from '@angular/core';
import { CardsService } from 'src/app/services/cards.service';
import { map } from 'rxjs/operators';
import { DataCards } from '../../interfaces/DataCards';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit{
  allCards: DataCards[] = [];
  constructor(
    private cardService: CardsService
  ){}

  async ngOnInit() {
    // this.getCardsByDate().subscribe((data:DataCards[]) => {
    //   this.allCards=data;
    // });
    // setTimeout(() => {
    //   console.log(this.allCards)
    // }, 1000);
  }

  getCardsByDate() {
    return this.cardService.getCardsByDate('01/01/2000', '12/01/2001').pipe(
      map((data: any) => {
        if (!data.ok) {
          const {error} = data;
          const {error: err} = error;
          console.log(err.error);
          return [];
        }
        const {data: card} = data;
        return card;
      })
    );
  }

}
