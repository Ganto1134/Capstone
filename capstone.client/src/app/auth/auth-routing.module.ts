import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent,
  },
  { path: 'login', component: LoginComponent}
];

export const AuthRoutingRoutes = RouterModule.forChild(routes);
