import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { BackendLayoutComponent } from './layouts/backend-layout/backend-layout.component';
import { LoginComponent } from './layouts/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '', component: DefaultLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./cms/cms.module').then(m => m.CmsModule)
            },
            {
                path: 'auth',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            }
        ]
    },
    {
        path: 'admin', component: LoginComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
            }
        ]
    },
    {
        path: 'backend',
        component: BackendLayoutComponent,
        children: [
            {
                path: '', loadChildren: () => import('./backend/backend.module').then(m => m.BackendModule)
            }
            // {
            //     path: 'dashboard',
            //     loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
            //     canLoad: [AuthGuard]
            // },
            // {
            //     path: 'product',
            //     loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
            //     canLoad: [AuthGuard]
            // }
        ]
    },
    { path: '**', redirectTo: '404' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
