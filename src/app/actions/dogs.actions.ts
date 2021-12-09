import { Dog } from '../model/dogs.model';



export class RemoveDog {
  static readonly type = '[DOG]  Remove'

  constructor(public payload: String) {}
}

export class GetDogs {
  static readonly type = '[DOG] Get All'
  constructor() {}
}

export class AddDog {
  static readonly type = '[DOG] Add'
  constructor(public payload: Dog) {}
}

export class EditDog {
  static readonly type = '[DOG] Edit'
  constructor(public payload: Dog,public oldName:String) {}
}

