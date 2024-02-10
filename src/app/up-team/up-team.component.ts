import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {collection, getFirestore, doc, setDoc,updateDoc, getDocs, deleteDoc} from "firebase/firestore";
import { ref, set } from "firebase/database";

@Component({
  selector: 'app-user-profile',
  templateUrl: './up-team.component.html',
  styleUrls: ['./up-team.component.css']
})
export class UpTeamComponent implements OnInit {

      teamForm = new FormGroup({
        teamPos: new FormControl(0, Validators.required),
        teamP1: new FormControl('', Validators.required),
        teamP2: new FormControl('', Validators.required),
        teamP3: new FormControl('', Validators.required),
        teamP4: new FormControl('', Validators.required),
        teamS1: new FormControl(''),
        teamS2: new FormControl(''),
      })
    teams: any[] = [];
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
      teamKills = 0

    ngOnInit() {
        this.getTeams();
    }

    async getTeams() {
        const querySnapshot = await getDocs(collection(this.db, "teams"));
        querySnapshot.forEach((doc) => {
            this.teams.push(doc.data());
        });
    }

    // async updateTeam(team: any) {
    //
    //     const querySnapshot = await getDocs(collection(this.db, "teams"));
    //     querySnapshot.forEach((doc) => {
    //         if(doc.data().name === team.name){
    //             const newPlayers = team.players.map((player: any) => {
    //
    //             updateDoc(doc.ref, {
    //                 wwcd: this.teamForm.value.teamPos === 1 ? team.wwcd + 1 : team.wwcd,
    //                 kills: this.teamForm.value.team
    //                 pp: team.pp,
    //                 total: team.total,
    //                 players: team.players
    //             });
    //             }
    //         }
    //     });
    // }

  // async onSubmit() {
  //   console.log(this.teamForm.value);
  //   const teamRef = collection(this.db, "teams");
  //   const addRef = await setDoc(doc(teamRef), {
  //       name: this.teamForm.value.teamName,
  //       logo: this.teamForm.value.teamLogo,
  //       tag: this.teamForm.value.teamTag,
  //       region: this.teamForm.value.teamRegion,
  //       wwcd: 0,
  //       kills: 0,
  //       pp: 0,
  //       total: 0,
  //       players: [
  //           {
  //               name: this.teamForm.value.teamP1,
  //               kill: 0,
  //               id: 1
  //           },
  //           {
  //               name: this.teamForm.value.teamP2,
  //               kill: 0,
  //               id: 2
  //           },
  //           {
  //               name: this.teamForm.value.teamP3,
  //               kill: 0,
  //               id: 3
  //           },
  //           {
  //               name: this.teamForm.value.teamP4,
  //               kill: 0,
  //               id: 4
  //           },
  //           {
  //               name: this.teamForm.value.teamS1,
  //               kill: 0,
  //               id: 5
  //           },
  //           {
  //               name: this.teamForm.value.teamS2,
  //               kill: 0,
  //               id: 6
  //           },
  //       ],
  //   });
  //   console.log("Document written with ID: ", addRef);
  //
  //   //reset form
  //   this.teamForm.reset();
  // }
}
