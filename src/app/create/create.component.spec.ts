import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgxsModule, Store } from '@ngxs/store';
import { DogState } from '../states/dogs.state';
import { CreateComponent } from './create.component';

describe('ReadComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let store: Store;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
      imports: [NgxsModule.forRoot([
        DogState
      ]), HttpClientModule],
    }).compileComponents();
    store = TestBed.inject(Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call add dog when clicked', () => {
    spyOn(component,'addDog');
    const boton = fixture.debugElement.query(By.css('button'));
    boton.nativeElement.click();
    fixture.detectChanges();
    expect(component.addDog).toHaveBeenCalled();
  });



  it('should call store to add dog', () => {
    spyOn(store,'dispatch');
    component.addDog("Firulais","img");
    expect(store.dispatch).toHaveBeenCalled();
  });



})
