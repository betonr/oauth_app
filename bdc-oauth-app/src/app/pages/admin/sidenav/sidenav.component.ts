import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../auth/auth.state';

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
    private router: Router,
    private store: Store<AuthState>) {
    let grants = [];
    this.store.pipe(select('auth')).subscribe(res => {
      grants = res.grants || [];
    });

    const path = this.router.url;
    this.pathActive = path.split('/')[2];
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
      {
        path: '/admin/permissions',
        icon: 'perm_data_setting',
        title: 'Permissions',
        group: 'permissions',
        enabled: grants.indexOf('admin') >= 0
      },
      {
        path: '/admin/users',
        icon: 'person',
        title: 'My Profile',
        group: 'my',
        enabled: true
      }
    ]
  }
}
