import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TUTORIAL_URLS } from '@app/urls/tutorial.urls';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) { }

  public getLanguageTopics(lang: string, module: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getLanguageTopics}`.replace(':lang', lang).replace(':module', module), {
      headers: {
        'X-Secret-Key': 'Oct2024'
      }
    });
  }
  public getSubTopicTitles(lang: string, subTopic: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getSubTopicsTitles}`.replace(':lang', lang).replace(':topic', subTopic), {
      headers: {
        'X-Secret-Key': 'Oct2024'
      }
    });
  }
  public getTopicContent(title: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/${TUTORIAL_URLS.getSubTopicContent}`.replace(':title', title), {
      headers: {
        'X-Secret-Key': 'Oct2024'
      }
    });
  }
}
