import { Routes } from '@angular/router';
import { Layout } from './pages/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((m) => m.Home),
        title: 'ShopNext - Home',
      },
      // {
      //   path: 'products',
      //   loadComponent: () =>
      //     import('./pages/products/products.component').then((m) => m.ProductsComponent),
      //   title: 'ShopNext - Browse Products',
      // },
      // {
      //   // Route with Parameter (id)
      //   path: 'products/:id',
      //   loadComponent: () =>
      //     import('./pages/product-detail/product-detail.component').then(
      //       (m) => m.ProductDetailComponent,
      //     ),
      //   title: 'ShopNext - Product Details',
      // },
      // {
      //   path: 'contact',
      //   loadComponent: () =>
      //     import('./pages/contact/contact.component').then((m) => m.ContactComponent),
      //   title: 'ShopNext - Contact Us',
      // },
      {
        path: 'about',
        loadComponent: () => import('./pages/about-us/about-us.compoment').then((m) => m.AboutUs),
        title: 'ShopNext - About Us',
      },
    ],
  },
  // Catch-all 404 redirect
  {
    path: '**',
    redirectTo: '',
  },
];
