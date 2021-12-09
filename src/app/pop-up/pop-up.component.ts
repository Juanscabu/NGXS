import { Dog } from './../model/dogs.model';
import { GetDogs } from './../actions/dogs.actions';
import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { EditDog } from '../actions/dogs.actions';
import { Observable, Subscription } from 'rxjs';
import { DogState } from '../states/dogs.state';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  name : string | undefined;
  image: string | undefined;
  editForm!: FormGroup;
  listDogs: Dog[] = [];


  @Select(DogState.getDogs)
  dogs$!: Observable<Dog[]>;

  dogsSubscription!: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private store:Store,private formBuilder: FormBuilder) {
    this.name = data.dog.name;
    this.image = data.dog.img;
  }

  ngOnInit(): void {
    this.store.dispatch(new GetDogs());
    this.dogsSubscription = this.dogs$.subscribe(res => {
       if (res) {
      this.listDogs = res;
    }
    })
    this.createForm();
  }

  createForm(): void {
    this.editForm = this.formBuilder.group({
      name: [null, {validators: [Validators.required, Validators.email, Validators.maxLength(250), this.validateName.bind(this)]}],
      image: [null,Validators.required,Validators.pattern('.jpg\b')]
    }, {updateOn: "blur"});
  }

  editDog(name:any, newName: any, newImg: any) {
    this.store.dispatch(new EditDog({name: newName, img: newImg},name));
  }

  validateName(c: FormControl) {
    console.log(c,"dogs")
/*
    const foundDog = this.listDogs.find(x => x.name === dog.name);
    if(foundDog){
      return { 'userNameValidator': true }
    }else{
      return null;
    }
    */
  }

}
