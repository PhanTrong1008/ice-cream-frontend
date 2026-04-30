import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { API_URL } from '../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${API_URL}/auth`;
  private readonly tokenKey = 'access_token';

  private readonly _token = signal<string | null>(this.getStoredToken());
  readonly isLoggedIn = computed(() => !!this._token());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  private getStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  get token(): string | null {
    return this._token();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.accessToken);
        this._token.set(res.accessToken);
      }),
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        localStorage.setItem(this.tokenKey, res.accessToken);
        this._token.set(res.accessToken);
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._token.set(null);
    this.router.navigate(['/login']);
  }
}
