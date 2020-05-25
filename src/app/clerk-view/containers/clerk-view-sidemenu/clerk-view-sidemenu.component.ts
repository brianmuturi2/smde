
import {Component, HostBinding, Input} from '@angular/core';
import { navItems } from '../clerk-view-sidemenu';
import { AuthenticationService } from '../../../authentication/services/authentication.service';
@Component({
  selector: 'app-clerk-view-sidemenu',
  templateUrl: './clerk-view-sidemenu.component.html',
  styleUrls: ['./clerk-view-sidemenu.component.css']
})


export class ClerkViewSidemenuComponent {
    tenant_tag: string;
    @Input() navItems: Array<any>;
    @HostBinding('class.sidebar-nav') true;
    @HostBinding('attr.role') role;
    action_required_menu = true;
    defaultNavItems: Array<any>;
    public sidebarMinimized = true;
    constructor(public authService: AuthenticationService) {
     this.navItems = navItems;
     this.defaultNavItems = [
        {
            title: true,
            name: 'Action Required',
            permission: '',
          },

          {
            name: 'Change Password',
            url: '/profile',
            icon: 'fa fa-exclamation-triangle',
            permission: 'DATA_CLERK'
          },

     ];

     this.action_required_menu  = this.authService.requiresPasswordChange();

    }

    isDivider(navItem) {
        return !!navItem.divider;
    }

    isTitle(navItem) {
        return !!navItem.title;
    }

    isHasChild(navItem) {
        return navItem.hasOwnProperty('children') && navItem.children.length > 0;
    }

}
