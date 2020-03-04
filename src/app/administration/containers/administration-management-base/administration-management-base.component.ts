import { Component, OnInit } from '@angular/core';
import { navItems } from '../administration-management-sidemenu';
@Component({
  selector: 'app-administration-dashboard',
  templateUrl: './administration-management-base.component.html',
  styleUrls: ['./administration-management-base.component.css']
})
export class AdministrationManagementBaseComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  

}
