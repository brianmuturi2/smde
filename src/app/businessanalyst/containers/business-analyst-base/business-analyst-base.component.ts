import { Component, OnInit } from '@angular/core';
import { navItems } from '../business-analyst-sidemenu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './business-analyst-base.component.html',
  styleUrls: ['./business-analyst-base.component.css']
})
export class BusinessAnalystBaseComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  

}
