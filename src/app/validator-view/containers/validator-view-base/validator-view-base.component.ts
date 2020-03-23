import { Component, OnInit } from '@angular/core';
import { navItems } from '../validator-view-sidemenu';
@Component({
  selector: 'app-dashboard',
  templateUrl: './validator-view-base.component.html',
  styleUrls: ['./validator-view-base.component.css']
})
export class ValidatorViewBaseComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  

}
