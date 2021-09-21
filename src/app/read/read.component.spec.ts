import { DogState, DogStateModel } from './../states/dogs.state';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { Dog } from '../model/dogs.model';

import { ReadComponent } from './read.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('ReadComponent', () => {
  let component: ReadComponent;
  let fixture: ComponentFixture<ReadComponent>;
  let store: Store;
  let dogs : Dog[];

  const mockedDogs = [
    {
        "name": "Husky",
        "img": "https://images.dog.ceo/breeds/husky/n02110185_698.jpg"
    },
    {
        "name": "Boxer",
        "img": "https://images.dog.ceo/breeds/boxer/n02108089_11122.jpg"
    },
    {
        "name": "Chihuahua",
        "img": "https://images.dog.ceo/breeds/chihuahua/n02085620_3928.jpg"
    },
    {
        "name": "Gran danes",
        "img": "https://images.dog.ceo/breeds/dane-great/n02109047_33029.jpg"
    }
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReadComponent],
      imports: [NgxsModule.forRoot([
        DogState
      ]), HttpClientModule],
    }).compileComponents();
    store = TestBed.inject(Store);
    spyOn(store, 'select').and.returnValue(of(mockedDogs));
    spyOn(store, 'selectSnapshot').and.returnValue(mockedDogs);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should get dogs from store', () => {
    component.ngOnInit();
    dogs = store.selectSnapshot(state => state);
    expect(dogs).toEqual(mockedDogs);
  });

  it('unsubscribes when destroyed', () => {
    spyOn(component['dogsSubscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['dogsSubscription'].unsubscribe).toHaveBeenCalledTimes(1);
  })

  it('should call store to remove dog', () => {
    spyOn(store,'dispatch');
    component.delDog("Firulais");
    expect(store.dispatch).toHaveBeenCalled();
  });

});
