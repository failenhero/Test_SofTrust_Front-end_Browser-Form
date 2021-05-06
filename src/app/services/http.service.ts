import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import FormText from '../interfaces/formText-interface';
import Topic from '../interfaces/topic-interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly apiURL: string = 'https://localhost:44329/api';
  readonly topicsURL: string = `${this.apiURL}/topics`;
  readonly sendingFormUrl: string = `${this.apiURL}/sendingForm`;

  constructor(
    private http: HttpClient
  ) { }


  gettopicsList(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsURL);
  }

  postForm(form: any) {
    return this.http.post(this.sendingFormUrl, form);
  }

}
