
import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from '../business-analyst-sidemenu';
@Component({
  selector: 'app-business-analyst-sidemenu',
  templateUrl: './business-analyst-sidemenu.component.html',
  styleUrls: ['./business-analyst-sidemenu.component.css']
})


export class BusinessAnalystSidemenuComponent {
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