import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Dog } from '../model/dogs.model'
import { GetDogs, RemoveDog} from '../actions/dogs.actions'
import { Observable, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DogState } from '../states/dogs.state';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})

export class ReadComponent implements OnInit,OnDestroy {
  listDogs: Dog[] = [];


  @Select(DogState.getDogs)
  dogs$!: Observable<Dog[]>;

  dogsSubscription!: Subscription;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetDogs());
    this.dogsSubscription = this.dogs$.subscribe(res => {
       if (res) {
      this.listDogs = res;}
    })
  }

    ngOnDestroy(): void {
    this.dogsSubscription.unsubscribe();
  }



  delDog(name: String) {
    this.store.dispatch(new RemoveDog(name))
  }


}
