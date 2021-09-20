
import { DogService } from '../services/dog.service';
import { Dog } from '../model/dogs.model';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddDog, GetDogs, RemoveDog} from '../actions/dogs.actions'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

/*
export class TutorialStateModel {
  tutorials: Tutorial[] = [];
}

*/
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
        console.log(data)
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

}


/*
export class TutorialState {
  @Selector()
  static getTutorials(state: TutorialStateModel) {
      return state.tutorials
  }

  @Action(AddTutorial)
    add({getState, patchState }: StateContext<TutorialStateModel>, { payload }:AddTutorial) {
        const state = getState();
        patchState({
            tutorials: [...state.tutorials, payload]
        })
    }

    @Action(RemoveTutorial)
    remove({getState, patchState }: StateContext<TutorialStateModel>, { payload }:RemoveTutorial) {
        patchState({
            tutorials: getState().tutorials.filter(a => a.name != payload)
        })
    }

}
*/




