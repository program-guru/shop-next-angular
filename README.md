# ShopNext — Modern Angular E-Commerce

A modern, high-performance e-commerce application built with Angular 18+, leveraging the latest framework features for speed, maintainability, and developer experience.

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── components/          # Reusable UI widgets (navbar, product-card, filter-sidebar, etc.)
│   ├── core/
│   │   ├── models/          # TypeScript interfaces (Product, CartItem, etc.)
│   │   └── services/        # Singleton services (cart, filter, product, theme)
│   ├── pages/               # Route views (home, products, product-details, cart, contact-us, etc.)
│   └── app.routes.ts        # Application routing configuration
├── public/
│   ├── data/                # Mock database (products.json)
│   ├── Products/            # Product images
│   └── Team/                # Team member images
└── styles.css               # Global styles & Tailwind directives
```

---

## 🧩 Component Hierarchy

```
AppComponent (Layout)
│
├── NavbarComponent
│   ├── Logo
│   ├── NavigationLinks
│   ├── ThemeToggleComponent
│   └── CartIcon (with badge)
│
├── RouterOutlet
│   ├── HomePage
│   │   ├── CarouselComponent
│   │   ├── FeaturesComponent
│   │   └── ProductFAQComponent
│   ├── ProductsPage
│   │   ├── FilterSidebarComponent
│   │   └── ProductCardComponent (repeated)
│   ├── ProductDetailsPage
│   │   └── Gallery, Info, RelatedItems
│   ├── CartPage
│   │   └── CartItemsList, Quantity, Totals
│   ├── ContactUsPage
│   │   └── ContactFormComponent
│   └── NotFoundPage
│
└── FooterComponent
    ├── SocialLinks
    └── InformationComponent
```

---

## ⚡ Angular Features Used

- **Signals**: For state management (cart, filters, theme, etc.), using writable and computed signals.
- **Standalone Components**: All components, directives, and pipes are standalone (no NgModules).
- **Control Flow Syntax**: Uses `@if`, `@else`, and `@for` for template logic instead of legacy `*ngIf`/`*ngFor`.
- **Component Input Binding**: Route parameters are injected directly as component inputs.
- **Modern Dependency Injection**: Uses the `inject()` function for cleaner DI.
- **NgOptimizedImage**: For image optimization (lazy loading, prioritization).
- **OnPush Change Detection**: For improved performance.

---

## 🛠️ Running Locally

### Prerequisites

- Node.js v18+
- npm v9+
- Angular CLI v16+

### Steps

1. **Clone the repository**
    ```bash
    git clone https://github.com/program-guru/shop-next-angular.git
    cd shopnext
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Run the development server**
    ```bash
    ng serve
    ```
    Open [http://localhost:4200](http://localhost:4200) in your browser.

4. **Build for production**
    ```bash
    ng build
    ```
    Output will be in `dist/shopnext`.

---