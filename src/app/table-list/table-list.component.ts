import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {collection, getDocs, doc, updateDoc, deleteDoc, setDoc} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {Router} from "@angular/router";

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
  isDisabled = false;
  constructor(
      private router: Router
  ) {
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
    //disabled for 10 seconds
    this.isDisabled = true;
    setTimeout(() => {
      this.isDisabled = false;
    }, 30000);

    //show to notify alert after click for 10 seconds
    alert('Data updated, please wait 30 seconds to update again');



    const day = this.formDays.find((d) => d.value === this.day);
    const querySnapshot = await getDocs(collection(this.db, "result"));
    querySnapshot.forEach((doc) => {
      const newResultDay = this.teams.sort((a: any, b: any) => b.total - a.total);
      //new days.all = join newResultDay and doc.all
      // let newAll = [];

      // doc.data().days.all.forEach((team: any) => {
      //   newResultDay.forEach((newTeam: any) => {
      //     if(newTeam.name === team.name) {
      //       team.total = newTeam.total + team.total;
      //       team.kills = newTeam.kills + team.kills;
      //       team.pp = newTeam.pp + team.pp;
      //       team.wwcd = newTeam.wwcd + team.wwcd;
      //       // let playersWithKills = [];
      //       team.players.forEach((player: any) => {
      //         newTeam.players.forEach((newPlayer: any) => {
      //           if(newPlayer.name === player.name) {
      //             player.kill = newPlayer.kill + player.kill;
      //               // playersWithKills.push({
      //               //     name: player.name,
      //               //     kill: player.kill + newPlayer.kill
      //               // });
      //           }
      //         });
      //       })
      //     }
      //   })
      //   newAll.push(team);
      //   // console.log('team', team)
      // })

      // if (newAll.length === 0) {
      //   newAll = newResultDay;
      // }

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
          finalDay: doc.data().days.finalDay
        }
      })

      if(day.viewValue.includes('Groupes')) {

        // console.log('newAllGroupe', newAll)
        // updateDoc(doc.ref, {
        //   days: {
        //     all: doc.data().days.all,
        //     day1: day.value === '0' ? newResultDay : doc.data().days.day1,
        //     day2: day.value === '1' ? newResultDay : doc.data().days.day2,
        //     day3: day.value === '2' ? newResultDay : doc.data().days.day3,
        //     day4: day.value === '3' ? newResultDay : doc.data().days.day4,
        //     day5: day.value === '4' ? newResultDay : doc.data().days.day5,
        //     day6: day.value === '5' ? newResultDay : doc.data().days.day6,
        //     finalDay1: day.value === '7' ? newResultDay : doc.data().days.finalDay1,
        //     finalDay2: day.value === '8' ? newResultDay : doc.data().days.finalDay2,
        //     finalDay3: day.value === '9' ? newResultDay : doc.data().days.finalDay3,
        //     finalDay: doc.data().days.finalDay
        //   }
        // })
      } else {

        // updateDoc(doc.ref, {
        //   days: {
        //     all: doc.data().days.all,
        //     day1: day.value === '0' ? newResultDay : doc.data().days.day1,
        //     day2: day.value === '1' ? newResultDay : doc.data().days.day2,
        //     day3: day.value === '2' ? newResultDay : doc.data().days.day3,
        //     day4: day.value === '3' ? newResultDay : doc.data().days.day4,
        //     day5: day.value === '4' ? newResultDay : doc.data().days.day5,
        //     day6: day.value === '5' ? newResultDay : doc.data().days.day6,
        //     finalDay1: day.value === '7' ? newResultDay : doc.data().days.finalDay1,
        //     finalDay2: day.value === '8' ? newResultDay : doc.data().days.finalDay2,
        //     finalDay3: day.value === '9' ? newResultDay : doc.data().days.finalDay3,
        //     finalDay: doc.data().days.finalDay
        //   }
        // })
      }
      this.clearTeams()

    });

    //reset teams to empty in firebase
    await this.router.navigate(['/dashboard']);
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


  async joinResultDaysGroupeInAll() {
    //join day1, day2, day3, day4, day5, day6 in all
    const querySnapshot = await getDocs(collection(this.db, "result"));
    querySnapshot.forEach((doc) => {
        const day1 = doc.data().days.day1;
        const day2 = doc.data().days.day2;
        const day3 = doc.data().days.day3;
        const day4 = doc.data().days.day4;
        const day5 = doc.data().days.day5;
        const day6 = doc.data().days.day6;
        const all = doc.data().days.all;
        let newAll = [];
        if (day1.length !== 0) {
            newAll = day1;
        }

        if (day2.length !== 0) {
          let newAllDay2 = [];
          day1.forEach((teamDay1: any) => {
            day2.forEach((teamDay2: any) => {
              if(teamDay1.name === teamDay2.name) {
                let playersWithKills = [];
                teamDay1.players.forEach((playerDay1: any) => {
                  teamDay2.players.forEach((playerDay2: any) => {
                    if(playerDay1.name === playerDay2.name) {
                      playersWithKills.push({
                        name: playerDay1.name,
                        kill: playerDay1.kill + playerDay2.kill
                      });
                    }
                  });
                });

                const newTeam = {
                  name: teamDay1.name,
                  total: teamDay1.total + teamDay2.total,
                  kills: teamDay1.kills + teamDay2.kills,
                  pp: teamDay1.pp + teamDay2.pp,
                  wwcd: teamDay1.wwcd + teamDay2.wwcd,
                  players: playersWithKills,
                  tag: teamDay1.tag,
                  logo: teamDay1.logo,
                }

                newAllDay2.push(newTeam);
              }
            })

            const team = newAllDay2.find((t: any) => t.name === teamDay1.name);
            if (!team) {
              newAllDay2.push(teamDay1);
            }
          });

          newAll = newAllDay2;
        }

        if (day3.length !== 0) {
          let newAllDay3 = [];
          newAll.forEach((teamDay1: any) => {
            day3.forEach((teamDay3: any) => {
              if(teamDay1.name === teamDay3.name) {
                let playersWithKills = [];
                teamDay1.players.forEach((playerDay1: any) => {
                  teamDay3.players.forEach((playerDay3: any) => {
                    if(playerDay1.name === playerDay3.name) {
                      playersWithKills.push({
                        name: playerDay1.name,
                        kill: playerDay1.kill + playerDay3.kill
                      });
                    }
                  });
                });

                const newTeam = {
                  name: teamDay1.name,
                  total: teamDay1.total + teamDay3.total,
                  kills: teamDay1.kills + teamDay3.kills,
                  pp: teamDay1.pp + teamDay3.pp,
                  wwcd: teamDay1.wwcd + teamDay3.wwcd,
                  players: playersWithKills,
                  tag: teamDay1.tag,
                  logo: teamDay1.logo,
                }

                newAllDay3.push(newTeam);
              }
            })

            const team = newAllDay3.find((t: any) => t.name === teamDay1.name);
            if (!team) {
              newAllDay3.push(teamDay1);
            }

          });

          newAll = newAllDay3;
        }

        if (day4.length !== 0) {
          let newAllDay4 = [];
          newAll.forEach((teamDay1: any) => {
            day4.forEach((teamDay4: any) => {
              if(teamDay1.name === teamDay4.name) {
                let playersWithKills = [];
                teamDay1.players.forEach((playerDay1: any) => {
                  teamDay4.players.forEach((playerDay4: any) => {
                    if(playerDay1.name === playerDay4.name) {
                      playersWithKills.push({
                        name: playerDay1.name,
                        kill: playerDay1.kill + playerDay4.kill
                      });
                    }
                  });
                });

                const newTeam = {
                  name: teamDay1.name,
                  total: teamDay1.total + teamDay4.total,
                  kills: teamDay1.kills + teamDay4.kills,
                  pp: teamDay1.pp + teamDay4.pp,
                  wwcd: teamDay1.wwcd + teamDay4.wwcd,
                  players: playersWithKills,
                  tag: teamDay1.tag,
                  logo: teamDay1.logo,
                }

                newAllDay4.push(newTeam);
              }
            })

            const team = newAllDay4.find((t: any) => t.name === teamDay1.name);
            if (!team) {
              newAllDay4.push(teamDay1);
            }
          });

          newAll = newAllDay4;
        }

        if (day5.length !== 0) {
          let newAllDay5 = [];
          newAll.forEach((teamDay1: any) => {
            day5.forEach((teamDay5: any) => {
              if(teamDay1.name === teamDay5.name) {
                let playersWithKills = [];
                teamDay1.players.forEach((playerDay1: any) => {
                  teamDay5.players.forEach((playerDay5: any) => {
                    if(playerDay1.name === playerDay5.name) {
                      playersWithKills.push({
                        name: playerDay1.name,
                        kill: playerDay1.kill + playerDay5.kill
                      });
                    }
                  });
                });

                const newTeam = {
                  name: teamDay1.name,
                  total: teamDay1.total + teamDay5.total,
                  kills: teamDay1.kills + teamDay5.kills,
                  pp: teamDay1.pp + teamDay5.pp,
                  wwcd: teamDay1.wwcd + teamDay5.wwcd,
                  players: playersWithKills,
                  tag: teamDay1.tag,
                  logo: teamDay1.logo,
                }

                newAllDay5.push(newTeam);
              }
            })

            const team = newAllDay5.find((t: any) => t.name === teamDay1.name);
            if (!team) {
              newAllDay5.push(teamDay1);
            }
          });

          newAll = newAllDay5;
        }

        if (day6.length !== 0) {
          let newAllDay6 = [];
          newAll.forEach((teamDay1: any) => {
            day6.forEach((teamDay6: any) => {
              if(teamDay1.name === teamDay6.name) {
                let playersWithKills = [];
                teamDay1.players.forEach((playerDay1: any) => {
                  teamDay6.players.forEach((playerDay6: any) => {
                    if(playerDay1.name === playerDay6.name) {
                      playersWithKills.push({
                        name: playerDay1.name,
                        kill: playerDay1.kill + playerDay6.kill
                      });
                    }
                  });
                });

                const newTeam = {
                  name: teamDay1.name,
                  total: teamDay1.total + teamDay6.total,
                  kills: teamDay1.kills + teamDay6.kills,
                  pp: teamDay1.pp + teamDay6.pp,
                  wwcd: teamDay1.wwcd + teamDay6.wwcd,
                  players: playersWithKills,
                  tag: teamDay1.tag,
                  logo: teamDay1.logo,
                }

                newAllDay6.push(newTeam);
              }
            })

            const team = newAllDay6.find((t: any) => t.name === teamDay1.name);
            if (!team) {
              newAllDay6.push(teamDay1);
            }
          });

          newAll = newAllDay6;
        }

        //Add to newAll all teams that are not in newAll from day1
        if(day1.length !== 0)
        day1.forEach((teamDay1: any) => {
          const team = newAll.find((t: any) => t.name === teamDay1.name);
          if (!team) {
            newAll.push(teamDay1);
          }
        });
        //Add to newAll all teams that are not in newAll from day2
        if(day2.length !== 0)
        day2.forEach((teamDay2: any) => {
          const team = newAll.find((t: any) => t.name === teamDay2.name);
          if (!team) {
            newAll.push(teamDay2);
          }
        });
        //Add to newAll all teams that are not in newAll from day3
        if(day3.length !== 0)
        day3.forEach((teamDay3: any) => {
          const team = newAll.find((t: any) => t.name === teamDay3.name);
          if (!team) {
            newAll.push(teamDay3);
          }
        });
        //Add to newAll all teams that are not in newAll from day4
        if(day4.length !== 0)
        day4.forEach((teamDay4: any) => {
          const team = newAll.find((t: any) => t.name === teamDay4.name);
          if (!team) {
            newAll.push(teamDay4);
          }
        });
        //Add to newAll all teams that are not in newAll from day5
        if(day5.length !== 0)
        day5.forEach((teamDay5: any) => {
          const team = newAll.find((t: any) => t.name === teamDay5.name);
          if (!team) {
            newAll.push(teamDay5);
          }
        });
        //Add to newAll all teams that are not in newAll from day6
        if(day6.length !== 0)
        day6.forEach((teamDay6: any) => {
          const team = newAll.find((t: any) => t.name === teamDay6.name);
          if (!team) {
            newAll.push(teamDay6);
          }
        });

        updateDoc(doc.ref, {
          days: {
            all: newAll,
            day1: doc.data().days.day1,
            day2: doc.data().days.day2,
            day3: doc.data().days.day3,
            day4: doc.data().days.day4,
            day5: doc.data().days.day5,
            day6: doc.data().days.day6,
            finalDay1: doc.data().days.finalDay1,
            finalDay2: doc.data().days.finalDay2,
            finalDay3: doc.data().days.finalDay3,
            finalDay: doc.data().days.finalDay
          }
        });
    });

  }


  async calculGroupeDay() {
    await this.joinResultDaysGroupeInAll();
    await this.router.navigate(['/dashboard']);
  }
}
