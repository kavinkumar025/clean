import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  public isAdmin: boolean = false;
  public isLoggedIn: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.isAdmin = user.role === 'admin' || user.role === 'super admin';
    this.isLoggedIn = !!user.role;
    this.onResize();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.isMobile) {
        this.sidebarExpanded = false; // Close sidebar on navigation for mobile
      }
    });
  }

  sidebarExpanded: boolean = true;
  isMobile: boolean = false;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
    if (this.isMobile) {
      this.sidebarExpanded = false; // Collapse sidebar by default on mobile
    }
  }


  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }
}
