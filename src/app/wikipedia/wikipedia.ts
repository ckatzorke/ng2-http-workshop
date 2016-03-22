//src/app/wikipedia/wikipedia.ts
import {Control} from 'angular2/common';
import {OnInit} from 'angular2/core';
import {URLSearchParams, Jsonp, JSONP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

@Component({
    providers: [JSONP_PROVIDERS],
    template: `
    <h1>Wikipedia</h1>
    <input type="text" [ngFormControl]="search">
    <div><ul>
      <li *ngFor="#result of results | async">{{result.title}}</li>
    </ul><div>`
})
export class Wikipedia {
    private WIKIPEDIA_URL = 'https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK';
    private search = new Control();
    private results;

    constructor(private jsonp: Jsonp) {
    }

    ngOnInit() {
        this.results = this.search.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap(term => {
                console.log(`Querying [${term}]...`);
                return this.jsonp
                    .get(this.WIKIPEDIA_URL, searchParams(term))
                    .map(response => {
                        //console.log(response);
                        var results = formatResults(response);
                        console.log(`> Results for [${term}]: ${results.length}`);
                        return results;
                    });
            });

        function searchParams(term) {
            var params = new URLSearchParams();
            params.append('action', 'opensearch');
            params.append('search', encodeURI(term));
            params.append('format', 'json');
            return {
                search: params
            };
        }

        function formatResults(response) {
            var results = response.json();
            return results[1].map((value, index) =>
                ({
                    title: value,
                    url: results[3][index]
                })
            );
        }
    }
}