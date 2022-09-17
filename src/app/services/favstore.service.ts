import { Injectable } from '@angular/core';
import { Joke } from '../joke';


@Injectable({
  providedIn: 'root'
})
export class FavstoreService {

  private static readonly REGEXP_ONLY_NUMBERS = new RegExp('^[0-9]+$');
  private localStorageSupported = false;
  private shadowStorageMap = new Map<number, Joke>();


  constructor() {

    if (window.localStorage) {

      this.localStorageSupported = true;
      console.log('LocalStorage is supported in current browser.');

      this.readAllFavoritesFromLocalStorate();

    } else {

      this.localStorageSupported = false;
      console.log('LocalStorage is NOT supported in current browser, user will NOT be able to save his/her favorite jokes.');
    }
  }


  private readAllFavoritesFromLocalStorate() {

    for (let i = 0; i < window.localStorage.length; i++){

      const keyStr = window.localStorage.key(i);
      const jokeObjAsStr = window.localStorage.getItem(keyStr!);

      if (FavstoreService.REGEXP_ONLY_NUMBERS.test(keyStr!) === false) {

        console.log(`Skipping entry with non-number key "${keyStr}" while restoring from localStorage; content is: "${jokeObjAsStr}"`);
        continue;
      }

      const joke = new Joke('', 0);

      try {

        Object.assign( joke, JSON.parse(jokeObjAsStr!) );

        this.shadowStorageMap.set( joke.getID(), joke );

        console.log(`Restored object from localStorage: ${joke}`);
      }
      catch (error) {

        console.log(`Error during retrieval of joke with key ${keyStr} from localStorage: ${error}`);
      }
    }
  }

  public saveJoke(joke: Joke): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to save joke, but browser does not support localStorage.');

    } else {

      this.shadowStorageMap.set(   joke.getID(), joke );
      window.localStorage.setItem( joke.getID() + '', JSON.stringify(joke) );

      console.log(`Joke with ID ${joke.getID()} saved as favorite, number of saved jokes is now ${this.shadowStorageMap.size}.`);
    }
  }

  public removeJoke(joke: Joke): void {

    this.removeJokeById( joke.getID() );
  }

  public removeJokeById(jokeId: number): void {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Attempt to remove joke, but browser does not support localStorage.');

    } else {

      const wasRemoved = this.shadowStorageMap.delete( jokeId );
      window.localStorage.removeItem( jokeId + '' );

      if (wasRemoved === true) {

        console.log(`Joke with ID ${jokeId} was removed from favorites, number of saved jokes is now ${this.shadowStorageMap.size}.`);

      } else {

        console.log('Internal error: Attempt to remove joke that was not stored.');
      }
    }
  }

  public isAlreadyStored(joke: Joke): boolean {

    if (this.localStorageSupported === false) {

      console.log('Internal error: Query if joke is already stored, but browser does not support localStorage.');
      return false;
    }

    return this.shadowStorageMap.has( joke.getID() );
  }

  public storageIsSupported(): boolean {

    return this.localStorageSupported;
  }

  public getAllJokes(): Joke[] {

    const resultArray: Joke[] = [];

    this.shadowStorageMap.forEach((value: Joke, key: number) => {

      resultArray.push(value);
    });

    return resultArray;
  }

  public getNumberOfStoredJokes(): number {

    return this.shadowStorageMap.size;
  }

  public deleteAllJokes(): void {

    this.shadowStorageMap = new Map<number, Joke>();

    if ( this.storageIsSupported() === false ) { return; }

    for (let i = 0; i < window.localStorage.length; i++){

      const keyStr = window.localStorage.key(i);

      if (FavstoreService.REGEXP_ONLY_NUMBERS.test(keyStr!) === false) {

        localStorage.removeItem(keyStr!);
      }
    }
  }

}
