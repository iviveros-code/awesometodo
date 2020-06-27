import React, { useCallback } from "react";
import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWDCQwgyM4kpLRs5bdVXnuCQD_I55asYI",
  authDomain: "crud-firebase-rn-9b4dd.firebaseapp.com",
  databaseURL: "https://crud-firebase-rn-9b4dd.firebaseio.com",
  projectId: "crud-firebase-rn-9b4dd",
  storageBucket: "crud-firebase-rn-9b4dd.appspot.com",
  messagingSenderId: "871960185308",
  appId: "1:871960185308:web:4fed2a5e2063ec9cd06719",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }
  addList(list) {
    let ref = this.ref;

    ref.add(list);
  }

  updateList(list) {
    let ref = this.ref;

    ref.doc(list.id).update(list);
  }
  deleteList(list) {
    let ref = this.ref;
    ref.doc(list.id).delete();
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }
  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }
  detach() {
    this.unsubscribe();
  }
}

export default Fire;
