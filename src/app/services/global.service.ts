import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL_URLS } from '@app/urls/global.urls';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }

  public preSignup(payload: { email: string }): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/${GLOBAL_URLS.preSignup}`, { email: payload?.email }, {
      headers: {
        'X-Secret-Key': 'Oct2024'
      }
    })
  }

  public signup(payload): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/${GLOBAL_URLS.signup}`, payload, {
      headers: {
        'X-Secret-Key': 'Oct2024'
      }
    })
  }

  public login(payload): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/${GLOBAL_URLS.login}`, payload, {
      headers: {
        'Accept': '*/*',
        'X-Secret-Key': 'Oct2024',
        'Authorization': 'Basic d2ViOndlYg==',
        'Cache-Control': 'no-cache'
      }
    })
  }
}
