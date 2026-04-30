import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';
import { IceCream } from '../models/ice-cream.model';

@Injectable({ providedIn: 'root' })
export class IceCreamService {
  private readonly apiUrl = `${API_URL}/ice-creams`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<IceCream[]> {
    return this.http.get<IceCream[]>(this.apiUrl);
  }

  create(iceCream: Partial<IceCream>): Observable<IceCream> {
    return this.http.post<IceCream>(this.apiUrl, iceCream);
  }

  update(id: number, data: Partial<IceCream>): Observable<IceCream> {
    return this.http.patch<IceCream>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
