import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userName = 'Team';
  public greetingMessage = '';
  public timeOfDay = '';

  ngOnInit(): void {
    this.setGreetingMessage();
  }

  public setGreetingMessage(): void {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      this.greetingMessage = 'Good Morning';
      this.timeOfDay = 'day';
    } else if (currentHour < 18) {
      this.greetingMessage = 'Good Afternoon';
      this.timeOfDay = 'afternoon';
    } else {
      this.greetingMessage = 'Good Evening';
      this.timeOfDay = 'evening';
    }
  }
}