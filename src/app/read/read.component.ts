import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Dog } from '../model/dogs.model'
import { GetDogs, RemoveDog} from '../actions/dogs.actions'
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})

export class ReadComponent implements OnInit {

  dogs$: Observable<Dog[]>

  constructor(private store: Store,private sanitizer: DomSanitizer) {
      this.dogs$ = this.store.select(state => state.dogs.dogs)
      this.store.dispatch(new GetDogs);

  }

  sanitizeImageUrl(imageUrl: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
}


  delDog(name: String) {
    this.store.dispatch(new RemoveDog(name))
  }

  ngOnInit() {}

}
