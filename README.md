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

The app is built with Angular using standalone components and the new `@if`/`@for` control-flow syntax. State within components uses Angular signals (`signal`, `computed`) to guarantee fine-grained reactivity without manual change-detection calls. Three services (`AuthService`, `IceCreamService`, `OrderService`) encapsulate all HTTP communication and are provided at root. Authentication is handled by a functional HTTP interceptor that reads the JWT from `AuthService` and attaches it as a `Bearer` token only to requests targeting the API base URL, plus a functional route guard that redirects unauthenticated users away from protected pages like order history. The project intentionally avoids a global state library; cart state lives locally in the `MenuComponent` because it is ephemeral, while persistent data (orders, menu) is always fetched fresh from the server.

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
