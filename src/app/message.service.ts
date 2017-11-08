import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class MessageService {
  private messages: string[];

  constructor() {
    this.messages = [];
  }

  getMessages = (): Observable<string[]> => of(this.messages);

  add = (message: string): number => this.messages.push(message);

  clear = () => this.messages.length = 0;
}
