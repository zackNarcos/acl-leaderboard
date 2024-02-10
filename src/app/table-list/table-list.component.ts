import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

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

  isShowPlayer = false;

  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);

  db = getFirestore(this.app);


  teams: any[] = [];
  constructor() {
  }

  ngOnInit() {
    this.getTeams();
  }

  async getTeams() {
    const querySnapshot = await getDocs(collection(this.db, "teams"));
    querySnapshot.forEach((doc) => {
        this.teams.push(doc.data());
    });
  }

  async deleteTeam(team: any) {
    this.teams = this.teams.filter((t) => t !== team);
    //get id of the team and delete it


  const querySnapshot = await getDocs(collection(this.db, "teams"));
    querySnapshot.forEach((doc) => {
        if(doc.data().name === team.name){
          deleteDoc(doc.ref);
        }
    });
  }
}
