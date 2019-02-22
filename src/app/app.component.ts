import { Component } from '@angular/core';

@Component({
  selector: 'sb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sing-bus';
  year = new Date().getFullYear();
  logo = require('../assets/logo.png');
}
