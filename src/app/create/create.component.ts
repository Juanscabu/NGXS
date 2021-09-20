import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddDog } from '../actions/dogs.actions';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private store: Store) { }

  addDog(name: any, img: any) {
    this.store.dispatch(new AddDog({name: name, img: img}))
  }


  ngOnInit(): void {
  }

}
