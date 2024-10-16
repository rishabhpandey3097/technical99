import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HOME_URLS } from '@app/urls/home.urls';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) {}

  public getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getCategories}`, {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    });
  }

  public getModules(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModules}`, {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    });
  }

  public getModuleInfo(moduleId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModuleInfo}`.replace(':moduleId', moduleId.toString()), {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    })
  }
  public getInterviewQuestions(moduleId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getInterviewQuestions}`.replace(':moduleId', moduleId.toString()), {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    })
  }
  public getModuleMenu(lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModuleMenu}`.replace(':lang', lang), {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    })
  }
  public getTechnologies(moduleName: string, lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getTechnologies}`.replace(':moduleName', moduleName).replace(':lang', lang), {
      headers: {
        'X-Secret-Key':'Oct2024'
      }
    })
  }
}
