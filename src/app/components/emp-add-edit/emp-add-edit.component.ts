import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['BAC', 'BAC+2', 'BAC+3/4', 'MASTER', 'DOCTORAT'];
  constructor(
    private _fb: FormBuilder,
    private _userService: AuthService,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  
  ) {
    this.empForm = this._fb.group({  firstName: ['', Validators.required],
    lastName: ['', Validators.required],  email: ['', [Validators.required, Validators.email]],
    dob: ['', Validators.required],  gender: ['', Validators.required],
    education: ['', Validators.required],  company: ['', Validators.required],
    experience: ['', Validators.required],  package: ['', Validators.required],
  });
  }
  ngOnInit(): void {  if (this.data) {
    this.empForm.patchValue({      firstName: this.data.firstName,
      lastName: this.data.lastName,      email: this.data.email,
      dob: this.data.dob,      gender: this.data.gender,
      education: this.data.education,      company: this.data.company,
      experience: this.data.experience,      package: this.data.packagep,
    });  }
}
  onForSubmit() {
    
    if (this.empForm.valid) {
      if(this.data){
        this._empService.UpdateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert('Employee Updated !');
            this._dialogRef.close( true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      
    }
    else{
       this._empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added succefully');
          this._dialogRef.close( true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
     
    }
  }
}
