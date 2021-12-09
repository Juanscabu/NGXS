
import { DogService } from '../services/dog.service';
import { Dog } from '../model/dogs.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddDog, EditDog, GetDogs, RemoveDog} from '../actions/dogs.actions'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';

export class DogStateModel {
  dogs: Dog[] = [];
}

@State<DogStateModel>({
  name: 'dogs',
  defaults: {
      dogs: [],
  }
})

@Injectable()
export class DogState {
  constructor(
    private readonly dogService: DogService
  ) { }

  @Selector()
  static getDogs(state: DogStateModel) {

      return state.dogs
  }

  @Action(GetDogs)
  getDogs({
    getState,
    setState
  }: StateContext<DogStateModel>
  ): Observable<Dog[]> {
    return this.dogService.getAllBreeds().pipe(
      tap((data: Dog[]) => {
        const state = getState();
        setState({ ...state, dogs: data});
      }),
    );
  }

  @Action(AddDog)
  add({getState, patchState }: StateContext<DogStateModel>, { payload }:AddDog) {
      const state = getState();
      patchState({
          dogs: [...state.dogs, payload]
      })
  }

  @Action(RemoveDog)
    remove({getState, patchState }: StateContext<DogStateModel>, { payload }:RemoveDog) {
        patchState({
            dogs: getState().dogs.filter(a => a.name != payload)
        })
    }

    @Action(EditDog)
    updateItem({getState, setState }: StateContext<DogStateModel>, { payload,oldName }:EditDog) {
        setState(
          patch({
            dogs: updateItem<Dog>(item=> item?.name === oldName, patch({ name: payload.name, img: payload.img }))
          })
        );
      }
    }

