import { DogService } from './dog.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Dog } from '../model/dogs.model';
import { TestBed } from '@angular/core/testing';

describe('DogService', () => {
  let service: DogService;
  let controller: HttpTestingController;
  let listDogs: Dog[];
  let response: any;
  let mockedDogs: any;
  const myUrl: string = 'assets/dogs.json';
  let expectedUrl: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogService]
    });
    service = TestBed.inject(DogService);
    controller = TestBed.inject(HttpTestingController);
    mockedDogs = [
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
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all dogs', () => {
    service.getAllBreeds().subscribe(
      (res) => {
        response = res;
      }
    );
    const request = controller.expectOne(expectedUrl);
    request.flush(mockedDogs);
    expect(response).toEqual(mockedDogs);
  });

});
