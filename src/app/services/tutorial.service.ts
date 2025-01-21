import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUTORIAL_URLS } from '@app/urls/tutorial.urls';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient, private cookieService: SsrCookieService) { }

  public getLanguageTopics(lang: string, module: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getLanguageTopics}`.replace(':lang', lang).replace(':module', module));
  }

  public getSubTopicTitles(lang: string, subTopic: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getSubTopicsTitles}`.replace(':lang', lang).replace(':topic', subTopic));
  }

  public getTopicContent(title: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getSubTopicContent}`.replace(':title', title));
  }

  public getSwitchLanguage(lang: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getSwitchLanguage}`.replace(':lang', lang));
  }

  public saveContentPageState(payload): void {
    for(const [key, value] of Object.entries(payload)) {
      this.cookieService.set(key, value.toString(), 7)
    }
  }
}
