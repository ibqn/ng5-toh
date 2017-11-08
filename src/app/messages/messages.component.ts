import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.sass'],
})
export class MessagesComponent implements OnInit {
  private _messages: string[];

  get messages(): string[] { return this._messages; }

  clear = () => this.messageService.clear();

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.getMessages()
      .subscribe(messages => this._messages = messages);
  }
}
