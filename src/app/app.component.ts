import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'cleanEnvirons';
  public isLoginPage: boolean = false;
  public sidebarWidthLogin: string = '0vw';
  public sidebarWidth: string = '10vw'; // Default sidebar width
  public isSidebarCollapsed: boolean = false; // Sidebar collapse state

  constructor(private router: Router) {
    // Detect if the user is on the login page
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  setSidebarWidth(newWidth: string) {
    this.sidebarWidth = newWidth;
  }
}