# Ice Cream Shop Frontend

Angular frontend for the Ice Cream Shop application.

## How to Run

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the dev server (http://localhost:4200)
npm start
```

The backend API is expected at `http://localhost:3000/api`. To change this, edit `src/environments/environment.ts`.

### Build for Production

```bash
npm run build
```

Output is written to `dist/ice-cream-fe/`.

## Architecture Overview

The app is built with Angular using standalone components. Component state is managed with Angular Signals (signal, computed) to ensure fine-grained reactivity without manual change detection.

For asynchronous data flows, the app leverages RxJS. All HTTP communication in AuthService, IceCreamService, and OrderService is handled via Angular’s HttpClient, which returns RxJS Observables.

Authentication is implemented using a functional HTTP interceptor that retrieves the JWT from AuthService and attaches it as a Bearer token only for API requests. Route protection is enforced with a functional guard that uses RxJS streams to determine authentication state and redirects unauthenticated users away from protected routes such as order history.
## Project Structure

```
src/app/
  components/
    login/            Login page
    register/         Registration page
    menu/             Ice cream menu + cart
    order-history/    Past orders list
    navbar/           Top navigation bar
  services/
    auth.service.ts         JWT auth (login, register, token storage)
    ice-cream.service.ts    Menu CRUD
    order.service.ts        Order creation & history
  guards/
    auth.guard.ts           Route protection
  interceptors/
    auth.interceptor.ts     Attaches Bearer token to API requests
  models/
    auth.model.ts           LoginRequest, RegisterRequest, AuthResponse
    ice-cream.model.ts      IceCream interface
    order.model.ts          Order, OrderItem, CreateOrderItem interfaces
  environments/
    environment.ts          API base URL config
```
