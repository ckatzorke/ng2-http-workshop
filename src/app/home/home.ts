import {Component} from 'angular2/core';
import {AppState} from '../app.service';
import {Title} from './services/title';
import {XLarge} from './directives/x-large';

import {UsersService} from '../services/usersService';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title, UsersService
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css'), 'span.clock {color: red}' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})
export class Home {
    
  users: any;
  date: Date;
  // Set our default values
  localState = { value: '' };
  // TypeScript public modifiers
  constructor(public appState: AppState, public title: Title, public usersService: UsersService) {
    setInterval(() => this.date = new Date(), 1000);
    usersService.getUsers().subscribe(data => this.users = data);
  }

  ngOnInit() {
    console.log('hello `Home` component');
    // this.title.getData().subscribe(data => this.data = data);
  }

  submitState(value) {
    console.log('submitState', value);
    this.appState.set('value', value);
  }

}
