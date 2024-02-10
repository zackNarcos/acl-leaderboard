import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {collection, getFirestore, doc, setDoc} from "firebase/firestore";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  teamForm = new FormGroup({
    teamName: new FormControl('', Validators.required),
    teamP1: new FormControl('', Validators.required),
    teamP2: new FormControl('', Validators.required),
    teamP3: new FormControl('', Validators.required),
    teamP4: new FormControl('', Validators.required),
    teamS1: new FormControl(''),
    teamS2: new FormControl(''),
    teamLogo: new FormControl('', Validators.required),
    teamTag: new FormControl('', Validators.required),
    teamRegion: new FormControl('', Validators.required),
  })
  constructor() { }

  firebaseConfig = {
    apiKey: "AIzaSyC32zytXvLL-38BJ53fwEyh-n6h8zdP77Q",
    authDomain: "pubg-acl.firebaseapp.com",
    databaseURL: "https://pubg-acl-default-rtdb.firebaseio.com",
    projectId: "pubg-acl",
    storageBucket: "pubg-acl.appspot.com",
    messagingSenderId: "249962926368",
    appId: "1:249962926368:web:fe57f9e720bfbc5eff8745",
    measurementId: "G-EYXND0RTVC"
  };

  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);

  ngOnInit() {
  }

  async onSubmit() {
    console.log(this.teamForm.value);
    const teamRef = collection(this.db, "teams");
    const addRef = await setDoc(doc(teamRef), {
        name: this.teamForm.value.teamName,
        p1: this.teamForm.value.teamP1,
        p2: this.teamForm.value.teamP2,
        p3: this.teamForm.value.teamP3,
        p4: this.teamForm.value.teamP4,
        s1: this.teamForm.value.teamS1,
        s2: this.teamForm.value.teamS2,
        logo: this.teamForm.value.teamLogo,
        tag: this.teamForm.value.teamTag,
        region: this.teamForm.value.teamRegion
    });
    console.log("Document written with ID: ", addRef);

    //reset form
    this.teamForm.reset();
  }
}
