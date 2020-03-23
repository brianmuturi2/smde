import { Component, OnInit } from '@angular/core';
import { navItems } from '../clerk-view-sidemenu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './clerk-view-base.component.html',
  styleUrls: ['./clerk-view-base.component.css']
})
export class ClerkViewBaseComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  

}
