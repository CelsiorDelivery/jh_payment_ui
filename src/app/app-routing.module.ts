// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
      },
      {
        path: 'analytics',
        loadComponent: () =>
          import('./jhmain/dashboard/dash-analytics.component').then((c) => c.DashAnalyticsComponent)
      },
      {
        path: 'transfer',
        loadComponent: () =>
          import('./jhmain/payment-initiation/payment-initiation.component').then((c) => c.PaymentInitiation)
      },
      {
        path: 'refund',
        loadComponent: () =>
          import('./components/refund/refund.component').then(m => m.RefundComponent)
      },

      // 🔹 Add your new transactions route here
      {
        path: 'transactions',
        loadComponent: () =>
          import('./transactions/transactions.component').then(m => m.TransactionsComponent)
      },

      {
        path: 'component',
        loadChildren: () =>
          import('./jhmain/ui-element/ui-basic.module').then((m) => m.UiBasicModule)
      },
      {
        path: 'chart',
        loadComponent: () =>
          import('./jhmain/chart-maps/core-apex.component').then((c) => c.CoreApexComponent)
      },
      {
        path: 'forms',
        loadComponent: () =>
          import('./jhmain/forms/form-elements/form-elements.component').then((c) => c.FormElementsComponent)
      },
      {
        path: 'tables',
        loadComponent: () =>
          import('./jhmain/tables/tbl-bootstrap/tbl-bootstrap.component').then((c) => c.TblBootstrapComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () =>
          import('./jhmain/other/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./jhmain/pages/authentication/sign-up/sign-up.component').then((c) => c.SignUpComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./jhmain/pages/authentication/sign-in/sign-in.component').then((c) => c.SignInComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
