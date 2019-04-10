import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { MenuItem } from '@shared/layout/menu-item';

@Component({
    templateUrl: './sidebar-nav.component.html',
    selector: 'sidebar-nav',
    encapsulation: ViewEncapsulation.None
})
export class SideBarNavComponent extends AppComponentBase {

    menuItems: MenuItem[] = [
        // new MenuItem(this.l('HomePage'), '', 'home', '/app/home'),

        // new MenuItem(this.l('Tenants'), 'Pages.Tenants', 'business', '/app/tenants'),
        // new MenuItem(this.l('Users'), 'Pages.Users', 'people', '/app/users'),
        // new MenuItem(this.l('Roles'), 'Pages.Roles', 'local_offer', '/app/roles'),
        new MenuItem("Admin Dashboard", 'Pages.Users', 'dashboard', '/app/home'),
        new MenuItem('Dashboard', '', 'list', '/gmis/dashboard'),
        new MenuItem('Information', '', 'info', '/gmis/information'),
        new MenuItem('Location', '', 'edit_location', '/gmis/location'),
        new MenuItem('Agriculture Information', '', 'local_offer', '/gmis/agriculture-info'),
        new MenuItem('Economic Information', '', 'local_offer', '/gmis/economic-info'),
        new MenuItem('Ground Water Information', '', 'local_offer', '/gmis/groundwater-info'),
        new MenuItem('Contract Management', '', 'local_offer', '/gmis/contract-mgmt'),
        new MenuItem('WUA Information', '', 'local_offer', '/gmis/wua-info'),
        
        // new MenuItem(this.l('Management'), 'Pages.Users', 'menu', '', [
        //     new MenuItem('Project', '', '', '', [
        //         new MenuItem('Create Project', '', '', '/app/project'),
        //     ]),
        //     new MenuItem('User', '', '', '/app/users')
        // ])
    ];

    constructor(
        injector: Injector
    ) {
        super(injector);
    }

    showMenuItem(menuItem): boolean {
        if (menuItem.permissionName) {
            return this.permission.isGranted(menuItem.permissionName);
        }

        return true;
    }
}
