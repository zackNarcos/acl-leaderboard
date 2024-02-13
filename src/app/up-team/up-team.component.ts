import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {collection, getFirestore, doc, setDoc,updateDoc, getDocs, deleteDoc} from "firebase/firestore";
import { ref, set } from "firebase/database";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './up-team.component.html',
  styleUrls: ['./up-team.component.css']
})
export class UpTeamComponent implements OnInit {

    teamP1 = "P1"
    teamP2 = "P2"
    teamP3 = "P3"
    teamP4 = "P4"
    teamS1 = "S1"
    teamS2 = "S2"

    points = {
        top1: 10,
        top2: 6,
        top3: 5,
        top4: 4,
        top5: 3,
        top6: 2,
        top7: 1,
        top8: 1,
    }

    teamForm = new FormGroup({
        teamPos: new FormControl(0, Validators.required),
        p1Kills: new FormControl(0, Validators.required),
        p2Kills: new FormControl(0, Validators.required),
        p3Kills: new FormControl(0, Validators.required),
        p4Kills: new FormControl(0, Validators.required),
        s1Kills: new FormControl(0, Validators.required),
        s2Kills: new FormControl(0, Validators.required),
    })
    teams: any[] = [];
    team: any = "";
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.route.params.subscribe((params) => {
            // console.log(params);
            this.team = params.team;
            // console.log('param',params)

            //find team (name) in teams array

        });
        // this.joinDay1AndDay2()
    }

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

    async ngOnInit() {
        await this.getTeams();
    }

    async getTeams() {
        const querySnapshot = await getDocs(collection(this.db, "teams"));
        querySnapshot.forEach((doc) => {
            this.teams.push(doc.data());
        });

        this.teams.forEach((t) => {
            // console.log('t',t.name)
            if(t.name === this.team){
                // console.log('team',t)
                this.team = t;
                this.teamP1 = t.players[0].name
                this.teamP2 = t.players[1].name
                this.teamP3 = t.players[2].name
                this.teamP4 = t.players[3].name
                this.teamS1 = t.players[4].name
                this.teamS2 = t.players[5].name

                // this.teamForm.value.p1Kills = t.players[0].kill
                // this.teamForm.value.p2Kills = t.players[1].kill
                // this.teamForm.value.p3Kills = t.players[2].kill
                // this.teamForm.value.p4Kills = t.players[3].kill
                // this.teamForm.value.s1Kills = t.players[4].kill
                // this.teamForm.value.s2Kills = t.players[5].kill
            }
        });
    }

    async joinDay1AndDay2() {
        let teams = []
        const querySnapshot = await getDocs(collection(this.db, "result"));
        querySnapshot.forEach((doc) => {
            const teams1 = doc.data().days.day1
            const teams2 = doc.data().days.day2
            teams = doc.data().days.day3
            this.updateTeams(teams)

            const day1AndDay2 = []
            teams1.forEach((t1) => {
                teams2.forEach((t2) => {
                    if(t1.name === t2.name){
                        let playersWithKills = []
                        t1.players.forEach((p1) => {
                            t2.players.forEach((p2) => {
                                if(p1.name === p2.name){
                                    playersWithKills.push({
                                        name: p1.name,
                                        kill: p1.kill + p2.kill
                                    })
                                }
                            })
                        })

                        const team = {
                            name: t1.name,
                            total: t1.total + t2.total,
                            wwcd: t1.wwcd + t2.wwcd,
                            kills: t1.kills + t2.kills,
                            pp: t1.pp + t2.pp,
                            players: playersWithKills,
                            tag: t1.tag,
                            logo: t1.logo,
                        }

                        day1AndDay2.push(team)
                    }
                })
            })

            console.log('day1AndDay2',day1AndDay2)
            updateDoc(doc.ref, {
                days: {
                    day1: doc.data().days.day1,
                    day2: doc.data().days.day2,
                    day3: doc.data().days.day3,
                    day4: doc.data().days.day4,
                    day5: doc.data().days.day5,
                    day6: doc.data().days.day6,
                    all: day1AndDay2,
                    finalDay1: doc.data().days.finalDay1,
                    finalDay2: doc.data().days.finalDay2,
                    finalDay3: doc.data().days.finalDay3,
                    finalDay: doc.data().days.finalDay
                }
            })



        });
    }

    async updateTeams(teams: any[]) {
        const querySnapshot = await getDocs(collection(this.db, "teams"));
        querySnapshot.forEach((doc) => {
            teams.forEach((team) => {
                if(doc.data().name === team.name){
                    updateDoc(doc.ref, {
                        total: team.total,
                        kills: team.kills,
                        pp: team.pp,
                        wwcd: team.wwcd,
                        players: team.players
                    });
                }
            })
        });
    }

    async updateTeam() {


        const querySnapshot = await getDocs(collection(this.db, "teams"));
        querySnapshot.forEach((doc) => {
            if(doc.data().name === this.team.name){
                const newPlayersWithKills = this.team.players.map((player: any) => {
                    if(player.name === this.teamP1){
                        player.kill = this.teamForm.value.p1Kills + player.kill
                    }
                    if(player.name === this.teamP2){
                        player.kill = this.teamForm.value.p2Kills + player.kill
                    }
                    if(player.name === this.teamP3){
                        player.kill = this.teamForm.value.p3Kills + player.kill
                    }
                    if(player.name === this.teamP4){
                        player.kill = this.teamForm.value.p4Kills + player.kill
                    }
                    if(player.name === this.teamS1){
                        player.kill = this.teamForm.value.s1Kills + player.kill
                    }
                    if(player.name === this.teamS2){
                        player.kill = this.teamForm.value.s2Kills + player.kill
                    }
                    return player
                })

                let teamPosPoints = 0;
                if(this.teamForm.value.teamPos === 1){
                    teamPosPoints = this.points.top1
                } else if(this.teamForm.value.teamPos === 2){
                    teamPosPoints = this.points.top2
                } else if(this.teamForm.value.teamPos === 3){
                    teamPosPoints = this.points.top3
                } else if(this.teamForm.value.teamPos === 4){
                    teamPosPoints = this.points.top4
                } else if(this.teamForm.value.teamPos === 5){
                    teamPosPoints = this.points.top5
                } else if(this.teamForm.value.teamPos === 6){
                    teamPosPoints = this.points.top6
                } else if(this.teamForm.value.teamPos === 7){
                    teamPosPoints = this.points.top7
                } else if(this.teamForm.value.teamPos === 8){
                    teamPosPoints = this.points.top8
                } else {
                    teamPosPoints = 0
                }

                this.team.kills = this.teamForm.value.p1Kills + this.teamForm.value.p2Kills + this.teamForm.value.p3Kills + this.teamForm.value.p4Kills + this.teamForm.value.s1Kills + this.teamForm.value.s2Kills + this.team.kills
                this.team.pp = this.team.pp + teamPosPoints
                this.team.wwcd = this.teamForm.value.teamPos === 1 ? (this.team.wwcd ? this.team.wwcd + 1 : 1) : this.team.wwcd

                updateDoc(doc.ref, {
                    wwcd: this.team.wwcd,
                    kills: this.team.kills,
                    pp: this.team.pp,
                    total: this.team.pp + this.team.kills,
                    players: newPlayersWithKills
                });

                this.router.navigate(['/table-list']);
            }
        });
    }

}
