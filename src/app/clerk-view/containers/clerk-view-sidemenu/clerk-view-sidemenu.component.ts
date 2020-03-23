
import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from '../clerk-view-sidemenu';
@Component({
  selector: 'app-clerk-view-sidemenu',
  templateUrl: './clerk-view-sidemenu.component.html',
  styleUrls: ['./clerk-view-sidemenu.component.css']
})


export class ClerkViewSidemenuComponent {
    tenant_tag:string
    @Input() navItems: Array<any>;
    @HostBinding('class.sidebar-nav') true;
    @HostBinding('attr.role') role;
    public sidebarMinimized = true;
    constructor() {
     this.navItems = navItems;
     
    }

    isDivider(navItem) {
        return !!navItem.divider
    }

    isTitle(navItem) {
        return !!navItem.title
    }

    isHasChild(navItem) {
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
    }

}