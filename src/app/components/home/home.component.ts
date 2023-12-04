import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { EmployeeService } from 'src/app/services/employee.service';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  input: any ='';

  constructor(
    private router: Router,
    private _dialog: MatDialog,
    private _empService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const dialoRef = this._dialog.open(EmpAddEditComponent);
    dialoRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Handle any logic after the dialog is closed with a value
        }
      }
    });
  }

  getEmployeeList() {
    this._empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        
        // Check if MatSort and MatPaginator are available before assigning them
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee deleted!');
        this.getEmployeeList();
      },
      error: console.log
    });
  }

  openEditEmpForm(data: any) {
    const dialoRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialoRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // Handle any logic after the dialog is closed with a value
        }
      }
    });
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
