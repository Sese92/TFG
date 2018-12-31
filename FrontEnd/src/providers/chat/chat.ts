import { UserProvider } from './../user/user';
import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Events } from 'ionic-angular'

@Injectable()
export class ChatProvider {
  firechats = firebase.database().ref("/userschats")
  user: any;

  chatMessages = [];
  myChats;

  constructor(public events: Events, public userservice: UserProvider) {
    console.log('Hello ChatProvider Provider');
  }

  initializeChat(user) {
    this.user = user;
  }

  addNewMessage(msg) {
    if (this.user) {
      var promise = new Promise((resolve, reject) => {
        this.firechats.child(firebase.auth().currentUser.uid).child(this.user.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firechats.child(this.user.uid).child(firebase.auth().currentUser.uid).push().set({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
            })
          })
      })
      return promise;
    }
  }

  getUserMessages(){
    let temp;
    this.firechats.child(firebase.auth().currentUser.uid).child(this.user.uid).on('value', (snapshot) => {
      this.chatMessages = [];
      temp = snapshot.val()
      for(var tempkey in temp){
        this.chatMessages.push(temp[tempkey])
      }
      this.events.publish('newmessage');
    })
  }

  getChats() {
    var friendsUid = [];
    var promise = new Promise((resolve, reject) => {
      this.firechats.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
        let allFriends = snapshot.val();

        Object.keys(allFriends).forEach(key => {
          friendsUid.push(key);
      });

        this.myChats = [];
         
        this.userservice.getallusers().then((users) => {
          this.myChats = [];
          for (var j in friendsUid){
            for (var key in users) {
              if (friendsUid[j] === users[key].uid) {
                this.myChats.push(users[key]);
              }
            }
          }
          console.log("chats", this.myChats)
          resolve(this.myChats);
        }).catch((err) => {
          alert(err);
        });
      });
    })
    return promise;

  }
}
