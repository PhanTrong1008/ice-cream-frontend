import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../../environments/environment';
import { Order, CreateOrderItem } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly apiUrl = `${API_URL}/orders`;

  constructor(private http: HttpClient) {}

  create(items: CreateOrderItem[]): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, { items });
  }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }
}
