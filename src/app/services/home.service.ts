import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { HOME_URLS } from '@app/urls/home.urls';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getCategories}`);
  }

  public getCategoriesByLanguage(lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getCategoriesByLanguage}`.replace(':lang', lang));
  }

  public getModules(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModules}`);
  }

  public getModuleInfo(moduleId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModuleInfo}`.replace(':moduleId', moduleId.toString()))
  }
  public getInterviewQuestions(moduleId: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getInterviewQuestions}`.replace(':moduleId', moduleId.toString()))
  }
  public getModuleMenu(lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getModuleMenu}`.replace(':lang', lang))
  }
  public getTechnologies(moduleName: string, lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getTechnologies}`.replace(':moduleName', moduleName).replace(':lang', lang))
  }
  public getBlogs(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getTrendingBlogs}`)
  }
  public languageSpecificBlogs(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getTrendingBlogs}`)
  }
  public getReviews(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getReviews}`)
  }
  public getLanguageBasedBlogs(lang: string, size: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getLanguageBasedBlogs}`.replace(':lang', lang).replace(':size', size.toString()))
  }
  public getFaqs(lang: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${HOME_URLS.getLanguageBasedFaqs}`.replace(':lang', lang))
  }
}
