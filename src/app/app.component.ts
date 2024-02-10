import { Component} from '@angular/core';
import firebase from "firebase/compat";
import initializeApp = firebase.initializeApp;
import {getAnalytics} from "@angular/cli/src/analytics/analytics";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

}
