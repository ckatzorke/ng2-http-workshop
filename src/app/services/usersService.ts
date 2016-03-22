import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService {

    constructor(private http: Http) {

    }
    getUsers(): Observable<any> {
        return this.http.get('/assets/users.json').map(response => response.json());
    }
}
