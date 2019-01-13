import { ChatProvider } from './../../providers/chat/chat';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, Events } from 'ionic-angular';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-conversation',
  templateUrl: 'conversation.html',
})
export class ConversationPage {
  public user;
  newmessage: any;
  allmessages = [];
  photoURL;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChatProvider, public events: Events) {
    this.user = this.chatservice.user;
    this.photoURL = firebase.auth().currentUser.photoURL
    this.newmessage = '';
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.allmessages = this.chatservice.chatMessages;
      this.scrollToBottom();
    })
  }

  ionViewDidEnter() {
    this.chatservice.getUserMessages();
  }

  addmessage() {
    if(this.newmessage != "" && this.newmessage != undefined){
      this.chatservice.addNewMessage(this.newmessage).then(() => {
        this.content.scrollToBottom();
        this.newmessage = '';
      });
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

}
