import { Component } from '@angular/core';
import { IcndbService } from '../services/icndb.service';
import { FavstoreService } from '../services/favstore.service';
import { Joke } from '../joke';


@Component({
  selector: 'mide-root',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent {


  public jokeObj = new Joke('', 0);
  public showNoJokesWarning = false;
  public showAddToFavoritesButton = false;
  public showRemoveFromFavoritesButton = false;


  constructor( private icndbService: IcndbService,
  public  favstoreService: FavstoreService ){

    icndbService.fetchJokes();
  }


  public showNextJoke(): void {

    this.jokeObj = this.icndbService.getJoke();

    if ( this.jokeObj.isFilled() ) {

      this.showNoJokesWarning = false;

      if ( this.favstoreService.isAlreadyStored( this.jokeObj ) ) {

        this.showAddToFavoritesButton      = false;
        this.showRemoveFromFavoritesButton = true;

      } else {

        this.showAddToFavoritesButton      = true;
        this.showRemoveFromFavoritesButton = false;
      }

    } else { 

      this.showNoJokesWarning            = true;
      this.showAddToFavoritesButton      = false;
      this.showRemoveFromFavoritesButton = false;
    }

    if (this.favstoreService.storageIsSupported() === false) {

      this.showAddToFavoritesButton      = false;
      this.showRemoveFromFavoritesButton = false;
    }
  }

  public onButtonSaveJoke(): void {

    this.favstoreService.saveJoke( this.jokeObj );

    this.showAddToFavoritesButton      = false;
    this.showRemoveFromFavoritesButton = true;
  }


  public onButtonRemoveFromFavorites(): void {

    this.favstoreService.removeJoke( this.jokeObj );

    this.showAddToFavoritesButton      = true;
    this.showRemoveFromFavoritesButton = false;
  }

}
