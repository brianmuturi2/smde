import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from '../cleaner-sidemenu';
@Component({
  selector: 'app-cleaner-view-sidemenu',
  templateUrl: './cleaner-view-sidemenu.component.html',
  styleUrls: ['./cleaner-view-sidemenu.component.scss']
})


export class CleanerViewSidemenuComponent {
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