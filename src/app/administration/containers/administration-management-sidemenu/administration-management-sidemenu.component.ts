
import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from '../administration-management-sidemenu';
@Component({
  selector: 'app-administration-management-sidemenu',
  templateUrl: './administration-management-sidemenu.component.html',
  styleUrls: ['./administration-management-sidemenu.component.css']
})


export class AdministrationManagementSidemenuComponent {
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