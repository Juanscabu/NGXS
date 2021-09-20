import { Dog} from '../model/dogs.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  private myUrl: string = 'assets/dogs.json';

  constructor(private http: HttpClient) { }

  getAllBreeds() : Observable<Dog[]> {
    return this.http.get<Dog[]>(this.myUrl).pipe(
      delay(1000));
  }


}
