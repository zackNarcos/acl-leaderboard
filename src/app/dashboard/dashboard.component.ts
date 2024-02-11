import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import {collection, getDocs, getFirestore, updateDoc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    topFragger: any
    playerTopFragger: any

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

    formDays: any[] = [
        {value: '0', viewValue: 'Groupes Day 1'},
        {value: '1', viewValue: 'Groupes Day 2'},
        {value: '2', viewValue: 'Groupes Day 3'},
        {value: '3', viewValue: 'Groupes Day 4'},
        {value: '4', viewValue: 'Groupes Day 5'},
        {value: '5', viewValue: 'Groupes Day 6'},
        {value: '6', viewValue: 'All Groupes Days'},
        {value: '7', viewValue: 'Final Day 1'},
        {value: '8', viewValue: 'Final Day 2'},
        {value: '9', viewValue: 'Final Day 3'},
        {value: '10', viewValue: 'All Final Days'},
    ];

    teams: any[] = [];
    resultDay1: any;
    resultDay2: any;
    resultDay3: any;
    resultDay4: any;
    resultDay5: any;
    resultDay6: any;
    resultDays: any;
    resultFinalDay1: any;
    resultFinalDay2: any;
    resultFinalDay3: any;
    resultFinalDay: any;
    app = initializeApp(this.firebaseConfig);
    analytics = getAnalytics(this.app);

    db = getFirestore(this.app);
    isShowPlayerName: boolean = false;
    day = this.formDays[6].value;
    constructor() { }

    ngOnInit() {
     this.getTeams();
    }

    async getTeams() {
        const querySnapshot = await getDocs(collection(this.db, "result"));
        querySnapshot.forEach((doc) => {
            this.resultDay1 = doc.data().days.day1.sort((a: any, b: any) => b.total - a.total);
            this.resultDay2 = doc.data().days.day2.sort((a: any, b: any) => b.total - a.total);
            this.resultDay3 = doc.data().days.day3.sort((a: any, b: any) => b.total - a.total);
            this.resultDay4 = doc.data().days.day4.sort((a: any, b: any) => b.total - a.total);
            this.resultDay5 = doc.data().days.day5.sort((a: any, b: any) => b.total - a.total);
            this.resultDay6 = doc.data().days.day6.sort((a: any, b: any) => b.total - a.total);
            this.resultDays = doc.data().days.all.sort((a: any, b: any) => b.total - a.total);
            this.resultFinalDay1 = doc.data().days.finalDay1.sort((a: any, b: any) => b.total - a.total);
            this.resultFinalDay2 = doc.data().days.finalDay2.sort((a: any, b: any) => b.total - a.total);
            this.resultFinalDay3 = doc.data().days.finalDay3.sort((a: any, b: any) => b.total - a.total);
            this.resultFinalDay = doc.data().days.finalDay.sort((a: any, b: any) => b.total - a.total);
            this.teams = doc.data().days.all;
            // this.result.push(doc.data());
            // sort the teams by kills
            // this.result = this.teams.sort((a, b) => {
            //     return b.total - a.total;
            // });
            //
            // this.getResults();
        });

        this.topFragger = this.teams.reduce((prev, current) => (prev.kills > current.kills) ? prev : current);
        this.playerTopFragger = this.topFragger.players.reduce((prev, current) => (prev.kill > current.kill) ? prev : current);
    }

    // async getResults() {
    //     const querySnapshot = await getDocs(collection(this.db, "result"));
    //     querySnapshot.forEach((doc) => {
    //         this.result = doc.data();
    //         // this.result.days.day1 = this.teams;
    //
    //         //now update the result
    //         updateDoc(doc.ref, {
    //             days: {
    //                 all: this.teams,
    //                 day1: this.teams,
    //                 day2: [],
    //                 day3: [],
    //                 day4: [],
    //                 day5: [],
    //                 day6: [],
    //                 finalDay1: [],
    //                 finalDay2: [],
    //                 finalDay3: [],
    //                 finalDay: [],
    //             }
    //         });
    //     });
    // }

    getDayData($event: MatSelectChange) {
        this.day = $event.value;
        if (this.day === '0') {
            this.teams = this.resultDay1;
        }
        if (this.day === '1') {
            this.teams = this.resultDay2;
        }
        if (this.day === '2') {
            this.teams = this.resultDay3;
        }
        if (this.day === '3') {
            this.teams = this.resultDay4;
        }
        if (this.day === '4') {
            this.teams = this.resultDay5;
        }
        if (this.day === '5') {
            this.teams = this.resultDay6;
        }
        if (this.day === '6') {
            this.teams = this.resultDays;
        }
        if (this.day === '7') {
            this.teams = this.resultFinalDay1;
        }
        if (this.day === '8') {
            this.teams = this.resultFinalDay2;
        }
        if (this.day === '9') {
            this.teams = this.resultFinalDay3;
        }
        if (this.day === '10') {
            this.teams = this.resultFinalDay;
        }
    }
}
