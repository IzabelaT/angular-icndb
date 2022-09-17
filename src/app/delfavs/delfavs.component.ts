import { Component, OnInit } from '@angular/core';
import { FavstoreService } from '../services/favstore.service';
import { Router } from '@angular/router';


@Component({
  selector: 'mide-delfavs',
  templateUrl: './delfavs.component.html',
  styles: []
})
export class DelfavsComponent {

  constructor(public favstoreService: FavstoreService,
  private router: Router) { }


  public onButtonDeleteAllFavorites(): void {

    this.favstoreService.deleteAllJokes();

    this.router.navigate(['/']);
  }

}
