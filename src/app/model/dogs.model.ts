export interface Dog {
  name: string
  img: string;
}

export interface DogList<T> {
  message: T[];
  status: string;
}
