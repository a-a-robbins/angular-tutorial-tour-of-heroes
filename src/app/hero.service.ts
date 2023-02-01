import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hero } from './hero';
import { HEROES } from "./mock-heroes";
import {Observable, of, tap} from 'rxjs';
import { MessageService } from "./message.service";
import { catchError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroesUrl = 'api/heroes'; //URL to the web api
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  getHero(id: number): Observable<Hero> {
    const url = `$(this.heroesUrl)/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }
  getHeroes(): Observable<Hero[]> {
    //get heroes from the server
    //using ...get<Hero[]> gives a type to the JSON response
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //taps into the flow of observable and logs its completion
        tap(_ => this.log('fetched heores')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  private log(message: string) {
    this.messageService.add(`HeroService: $(message)`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //send the error to the console
      console.error(error);

      //transform error for consumption
      this.log(`${operation} failed: ${error.message}`);

      //return an empty result to keep the app running
      return of(result as T);
    };
  }
}
