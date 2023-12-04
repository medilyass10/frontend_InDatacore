import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/interfaces/auth';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from 'src/app/shared/password-match.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  registerForm = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required,Validators.minLength(6)],
  }, {
    validators: passwordMatchValidator
  })


  constructor(
    private formBuilder: FormBuilder, 
    private userService: AuthService,  
    private router: Router,    
    private msgService: MessageService

    ) {
 }
  
  get fullName() {
    return this.registerForm.get('fullName');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  submitDetails() {
    if (this.registerForm.valid) {
      const newUser : User = {
        fullName: this.registerForm.value.fullName!,
        email: this.registerForm.value.email!,
        password: this.registerForm.value.password!,
    
      };

      // Call the UserService to register the new user
      this.userService.registerUser(newUser).subscribe(
        (response) => {
          console.log('User registered successfully:', response);

                   this.router.navigate(['/login']);

        },
        (error) => {
          console.error('Error registering user:', error);
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
    }
  }
}




