import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const user = { email: this.email, password: this.password };
    this.authService.login(user).subscribe(
      (response: any) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = 'Login failed. Please check your credentials.';
        console.log('Login error', error);
      }
    );
  }
}
