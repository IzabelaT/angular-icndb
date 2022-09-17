import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { DelfavsComponent } from './delfavs/delfavs.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'favs', component: FavoritesComponent },
  { path: 'delfavs', component: DelfavsComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }