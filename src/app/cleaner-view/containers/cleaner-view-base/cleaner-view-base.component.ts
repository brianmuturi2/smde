import { Component, OnInit } from '@angular/core';
import { navItems } from '../cleaner-sidemenu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './cleaner-view-base.component.html',
  styleUrls: ['./cleaner-view-base.component.scss']
})
export class CleanerViewBaseComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }


}

