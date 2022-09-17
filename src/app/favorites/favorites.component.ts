import { Component } from '@angular/core';
import { FavstoreService } from '../services/favstore.service';


@Component({
  selector: 'mide-favorites',
  templateUrl: './favorites.component.html',
  styles: []  
})
export class FavoritesComponent {


  constructor(public favstoreService: FavstoreService) { }


  public onButtonRemoveFromFavoritesById(id: number): void {

    this.favstoreService.removeJokeById(id);
  }

}
