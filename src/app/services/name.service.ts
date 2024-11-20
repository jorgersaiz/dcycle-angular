import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, switchMap } from 'rxjs';
import { Gender } from '../models/gender.model';
import { Age } from '../models/age.model';
import { Nationality } from '../models/nationality.model';

@Injectable({
  providedIn: 'root'
})
export class NameService {

  private url = 'http://localhost:3200';

  constructor(private http: HttpClient) { }

  public getGender(name: string): Observable<Gender> {
    return this.http.get<Gender>(`${this.url}/api/genderize/${name}`);
  }

  public getNationality(name: string): Observable<Nationality> {
    return this.http.get<Nationality>(`${this.url}/api/nationalize/${name}`);
  }

  public getAge(name: string): Observable<Age> {
    return this.http.get<Age>(`${this.url}/api/agify/${name}`);
  }
}
