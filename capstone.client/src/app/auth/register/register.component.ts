import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Le password non coincidono!";
      return;
    }

    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(user).subscribe(
      (response) => {
        console.log('Registrazione avvenuta con successo', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Errore nella registrazione', error);
        this.errorMessage = 'Registrazione fallita. Riprova.';
      }
    );
  }
}
