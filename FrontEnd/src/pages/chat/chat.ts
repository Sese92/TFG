import { ChatProvider } from './../../providers/chat/chat';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConversationPage } from '../conversation/conversation';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  chats;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.chatservice.getChats().then((chats) => {
      this.chats = chats;
    });

  }

  viewMessages(chat) {
    this.chatservice.initializeChat(chat)
    this.navCtrl.push(ConversationPage)
  }

}
