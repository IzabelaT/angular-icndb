import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Joke } from '../joke';


@Injectable({
  providedIn: 'root'
})
export class IcndbService {

  private static readonly BATCHSIZE_OF_JOKES = 5;
  private static readonly BASE_URL_ENDPOINT = 'https://api.icndb.com/jokes/random';
  private readonly URL_ENDPOINT;
  private jokeQueue: Joke[] = [];


 
  constructor(private httpClient: HttpClient) {

    this.URL_ENDPOINT = `${IcndbService.BASE_URL_ENDPOINT}/${IcndbService.BATCHSIZE_OF_JOKES}`;

    console.log(`URL of REST-API to be queried: ${this.URL_ENDPOINT}`);
  }


  public getJoke(): Joke {

    if ( this.jokeQueue.length === 0 ) {

      this.fetchJokes();
      return new Joke('', -1);
    }

    const joke = this.jokeQueue.shift(); 
    console.log(`Fetched one joke, number of elements in queue is now ${this.jokeQueue.length}.`);

    if (this.jokeQueue.length === 0) {

      console.log('Queue of jokes is empty, will trigger fetching of next batch of jokes.');
      this.fetchJokes();
    }

    return joke!;
  }


  public fetchJokes(): void {

    const optionsObj: any = { observe: 'response' };

    this.httpClient.get(this.URL_ENDPOINT, optionsObj).subscribe((httpResponse) => {

        const httpResponseAny: any = httpResponse;

        const httpStatusCode = httpResponseAny.status;

        if (httpStatusCode !== 200) {

          const httpStatusText = httpResponseAny.statusText;

          console.log(`HTTP Status Code other than 200: ${httpStatusCode} (${httpStatusText})`);
          return;
        }

        const jsonPayload: any  = httpResponseAny.body;
        const statusTextFromApi = jsonPayload.type;

        if (statusTextFromApi !== 'success') {

          console.log(`Status Text from REST-API other than "success": ${statusTextFromApi}`);
          return;
        }

        const valueArray = jsonPayload.value;

        console.log(`Received batch of ${valueArray.length} jokes from REST-API.`);

        for (const resultObject of valueArray) {

          const jokeTxt    = resultObject.joke.replace(/&quot\;/g, '"');
          const categories = resultObject.categories; 
          const id         = resultObject.id;

          const jokeObj = new Joke( jokeTxt, id);

          for (const category of categories) {

            if (category === Joke.CATEGORY_NERDY) {

              jokeObj.setHasCategoryNerdy();
            }
            if (category === Joke.CATEGORY_EXPLICIT) {

              jokeObj.setHasCategoryExplicit();
            }
          }

          this.jokeQueue.push( jokeObj );
        }
    });

  }

}
