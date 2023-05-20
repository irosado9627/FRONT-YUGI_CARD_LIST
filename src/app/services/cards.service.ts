import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';
import { DataCards } from '../interfaces/DataCards';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  baseUrl: string = 'https://db.ygoprodeck.com/api/v7';
  constructor( private http: HttpClient ) { }

  getCardsByDate( startDate: string = '01/01/2000', endDate: string = '09/30/2011'): Observable<any> {
    const data: any = []
    return this.http.get(`${ this.baseUrl }/cardinfo.php?startdate=${startDate}&enddate=${endDate}&dateregion=tcg_date&misc=yes`)
    .pipe(
      map(({data}: any) => {
        return {
          ok: true,
          data
        }
      }),
      catchError((err) => of({
        ok: false,
        error:err
      }))
    );
  }

  getCardByName(cardName: string){
    return this.http.get(`${this.baseUrl}/cardinfo.php?name=${cardName}&misc=yes`);
  }
}
