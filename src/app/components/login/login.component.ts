// login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Assuming you have a UserService for user-related operations
    private userService: AuthService,  // Your UserService for login functionality
    private router: Router,
    private msgService: MessageService
  ) { }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() { return this.loginForm.controls['password']; }
  loginUser() {
    const { email, password } = this.loginForm.value;
    this.userService.getUserByEmail(email!).subscribe(
      (response) => {
        console.log('Backend response:', response);
  
        if (response) {
          const user = response;
          console.log('User from backend:', user);
  
          // Assuming password is plain text (not hashed) on the backend
          if (user.password === password) {
            console.log('Password match!');
            sessionStorage.setItem('email', email as string);
            this.router.navigate(['/home']);
          } else {
            console.log('Password incorrect!');
            this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Password is incorrect' });
          }
        } else {
          console.log('User not found!');
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'User not found' });
        }
      },
      (error) => {
        console.error('Error getting user by email:', error);
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      }
    );
  }
  
  
  
}
