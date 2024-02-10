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
        logo: this.teamForm.value.teamLogo,
        tag: this.teamForm.value.teamTag,
        region: this.teamForm.value.teamRegion,
        wwcd: 0,
        kills: 0,
        pp: 0,
        total: 0,
        players: [
            {
                name: this.teamForm.value.teamP1,
                kill: 0,
                id: 1
            },
            {
                name: this.teamForm.value.teamP2,
                kill: 0,
                id: 2
            },
            {
                name: this.teamForm.value.teamP3,
                kill: 0,
                id: 3
            },
            {
                name: this.teamForm.value.teamP4,
                kill: 0,
                id: 4
            },
            {
                name: this.teamForm.value.teamS1,
                kill: 0,
                id: 5
            },
            {
                name: this.teamForm.value.teamS2,
                kill: 0,
                id: 6
            },
        ],
    });
    console.log("Document written with ID: ", addRef);

    //reset form
    this.teamForm.reset();
  }
}
