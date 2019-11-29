import { Component } from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username;
  isConnected;
  messages: string [] = [];
  private stompClient = null;

  constructor() {
    this.connect();
  }

  connect() {
      const socket = new SockJS('http://localhost:8080/ws');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, () => {
        this.onConnected();
      }, this.onError());
  }


  onConnected() {
    this.isConnected = true;
    this.stompClient.subscribe('/broker/toChat', data => this.onMessageReceived(data));
  }

  onMessageReceived(data) {
    const message = JSON.parse(data.body);
    const username = message.username;
    if (message.type === 'JOIN') {
      this.showMessage(username + ' Join to the Chat');
    } else if (message.type === 'LEAVE') {
      this.showMessage(username + 'Leave the Chat');
    } else {
      this.showMessage(username + ' ' + message.body);
    }
  }

  onError() {
    console.log('WebSocket connection error');
  }

  showMessage(msg) {
    this.messages.push(msg);
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.isConnected = false;
    console.log('User disconnected!');
  }

  sendName(data) {
    console.log(name);
    this.username = data.username;
    this.stompClient.send('/chat/toApp', {},
      JSON.stringify({ username: this.username, type: 'JOIN' })
    );
  }

  sendMessage(data) {
    const message = {
      username: this.username,
      body: data.message,
      type: 'CHAT'
    };
    this.stompClient.send('/chat/toApp', {}, JSON.stringify(message));
  }
}
