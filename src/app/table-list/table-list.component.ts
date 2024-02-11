import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
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
  formDays: any[] = [
    {value: '0', viewValue: 'Groupes Day 1'},
    {value: '1', viewValue: 'Groupes Day 2'},
    {value: '2', viewValue: 'Groupes Day 3'},
    {value: '3', viewValue: 'Groupes Day 4'},
    {value: '4', viewValue: 'Groupes Day 5'},
    {value: '5', viewValue: 'Groupes Day 6'},
    {value: '7', viewValue: 'Final Day 1'},
    {value: '8', viewValue: 'Final Day 2'},
    {value: '9', viewValue: 'Final Day 3'},
  ];

  day = this.formDays[1].value;
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

  async setDayData() {
    const day = this.formDays.find((d) => d.value === this.day);
    const querySnapshot = await getDocs(collection(this.db, "result"));
    querySnapshot.forEach((doc) => {
      const newResultDay = this.teams.sort((a: any, b: any) => b.total - a.total);
      //new days.all = join newResultDay and doc.all
      let newAll = [];

      doc.data().days.all.forEach((team: any) => {
        newResultDay.forEach((newTeam: any) => {
          if(newTeam.name === team.name) {
            team.total = newTeam.total + team.total;
            team.kills = newTeam.kills + team.kills;
            team.pp = newTeam.pp + team.pp;
            team.wwcd = newTeam.wwcd + team.wwcd;
            team.players.forEach((player: any) => {
              newTeam.players.forEach((newPlayer: any) => {
                if(newPlayer.name === player.name) {
                  player.kills = newPlayer.kills + player.kills;
                }
              });
            })
          }
        })
        newAll.push(team);
        // console.log('team', team)
      })

      if (newAll.length === 0) {
        newAll = newResultDay;
      }

      if(day.viewValue.includes('Groupes')) {

        // console.log('newAllGroupe', newAll)
        updateDoc(doc.ref, {
          days: {
            all: newAll,
            day1: day.value === '0' ? newResultDay : doc.data().days.day1,
            day2: day.value === '1' ? newResultDay : doc.data().days.day2,
            day3: day.value === '2' ? newResultDay : doc.data().days.day3,
            day4: day.value === '3' ? newResultDay : doc.data().days.day4,
            day5: day.value === '4' ? newResultDay : doc.data().days.day5,
            day6: day.value === '5' ? newResultDay : doc.data().days.day6,
            finalDay1: day.value === '7' ? newResultDay : doc.data().days.finalDay1,
            finalDay2: day.value === '8' ? newResultDay : doc.data().days.finalDay2,
            finalDay3: day.value === '9' ? newResultDay : doc.data().days.finalDay3,
            finalDay: doc.data().days.finalDay
          }
        })
      } else {

        updateDoc(doc.ref, {
          days: {
            all: doc.data().days.all,
            day1: day.value === '0' ? newResultDay : doc.data().days.day1,
            day2: day.value === '1' ? newResultDay : doc.data().days.day2,
            day3: day.value === '2' ? newResultDay : doc.data().days.day3,
            day4: day.value === '3' ? newResultDay : doc.data().days.day4,
            day5: day.value === '4' ? newResultDay : doc.data().days.day5,
            day6: day.value === '5' ? newResultDay : doc.data().days.day6,
            finalDay1: day.value === '7' ? newResultDay : doc.data().days.finalDay1,
            finalDay2: day.value === '8' ? newResultDay : doc.data().days.finalDay2,
            finalDay3: day.value === '9' ? newResultDay : doc.data().days.finalDay3,
            finalDay: newAll
          }
        })
      }
      this.clearTeams()

    });

    //reset teams to empty in firebase
  }

  async clearTeams() {
    console.log('clearTeams')
    const querySnapshott = await getDocs(collection(this.db, "teams"));

    querySnapshott.forEach((doc) => {
      console.log('team', doc.data())
      updateDoc(doc.ref, {
        total: 0,
        kills: 0,
        pp: 0,
        wwcd: 0,
        players: doc.data().players.map((team: any) => {
          return {
            name: team.name,
            kill: 0,
            id: team.id
          }
        }),
        tag: doc.data().tag,
        logo: doc.data().logo,
        name: doc.data().name,
        region: doc.data().region
      });
      // console.log('team', doc.data())
    });
  }
}
