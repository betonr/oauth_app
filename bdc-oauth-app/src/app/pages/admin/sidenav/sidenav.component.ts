import { Component } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Sidenav component
 * simple static component
 */
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public pathActive = '';
  public links = [];

  constructor(
    private router: Router) {
    let grants = [];

    this.links = [
      {
        path: '/admin/users',
        icon: 'group',
        title: 'Users',
        group: 'users',
        enabled: grants.indexOf('admin') >= 0
      },
      {
        path: '/admin/apps',
        icon: 'apps',
        title: 'Applications',
        group: 'apps',
        enabled: true
      },
      // {
      //   path: '/admin/permissions',
      //   icon: 'perm_data_setting',
      //   title: 'Permissions',
      //   group: 'permissions',
      //   enabled: grants.indexOf('admin') >= 0
      // },
      {
        path: '/admin/my',
        icon: 'person',
        title: 'My Profile',
        group: 'my',
        enabled: true
      }
    ]

    this.changePage();
  }

  public changePage() {
    setTimeout( _ => {
      const path = this.router.url;
      this.pathActive = path.split('/')[2];
    })
  }
}
