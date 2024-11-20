import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CovidData, CovidResponse } from '../models/covid.model';
import { removeNull } from '../helpers/remove-null.helper';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private url = 'http://localhost:3200';
  constructor(private http: HttpClient) { }

  public getData(): Observable<CovidData[]> {
    return this.http.get<CovidResponse>(`${this.url}/api/covid/historical`).pipe(
      map((res) => {
        return res.data.map(covidData => {
          return {
            date: covidData.date,
            cases: removeNull(covidData.cases.total.value),
            deaths: removeNull(covidData.outcomes.death.total.value),
            tests: removeNull(covidData.testing.total.value)
          }
        }).reverse()
      })
    );
  }
}
