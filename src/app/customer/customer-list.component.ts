import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../services/customer.service';
import { CustomerModalComponent } from './customer-modal.component';
import { Customer } from '../models/customer.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CUSTOMER_CONSTANTS, ERROR_MESSAGES } from '../constants/app.constants';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, CustomerModalComponent],
  template: `
    <div class="container">
      <div class="header">
        <h2>Customer List</h2>
        <div>
          <button class="btn btn-primary" (click)="showAddModal()">Add Customer</button>
          <button class="btn btn-danger" (click)="logout()">Logout</button>
        </div>
      </div>

      <table class="customer-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
            <td>{{ customer.firstName }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phoneNumber }}</td>
            <td>{{ customer.gender }}</td>
            <td>
              <button class="btn btn-sm btn-primary" (click)="editCustomer(customer)">Edit</button>
              <button class="btn btn-sm btn-danger" (click)="deleteCustomer(customer.id)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="customers.length === 0">
            <td colspan="5" class="text-center">No customers found</td>
          </tr>
        </tbody>
      </table>
    </div>

    <app-customer-modal
      *ngIf="showModal"
      [customer]="selectedCustomer"
      (save)="saveCustomer($event)"
      (close)="closeModal()"
    ></app-customer-modal>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .header button {
      margin-left: 10px;
    }

    .customer-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    .customer-table th,
    .customer-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .customer-table th {
      background-color: #f8f9fa;
      font-weight: bold;
    }

    .btn-sm {
      padding: 5px 10px;
      margin-right: 5px;
    }

    .text-center {
      text-align: center;
    }

    .btn-danger {
      background-color: #dc3545;
    }

    .btn-danger:hover {
      background-color: #c82333;
    }
  `]
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  showModal = false;
  selectedCustomer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: CUSTOMER_CONSTANTS.GENDER.MALE
  };

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customers = this.customerService.getCustomers();
  }

  showAddModal() {
    this.selectedCustomer = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      gender: CUSTOMER_CONSTANTS.GENDER.MALE
    };
    this.showModal = true;
  }

  editCustomer(customer: Customer) {
    this.selectedCustomer = { ...customer };
    this.showModal = true;
  }

  deleteCustomer(id: string) {
    if (confirm(ERROR_MESSAGES.DELETE_CONFIRMATION)) {
      this.customerService.deleteCustomer(id);
      this.loadCustomers();
    }
  }

  saveCustomer(customer: Customer) {
    if (customer.id) {
      this.customerService.updateCustomer(customer);
    } else {
      this.customerService.addCustomer(customer);
    }
    this.loadCustomers();
    this.closeModal();
  }

  closeModal() {
    this.showModal = false;
  }

  logout() {
    this.authService.logout();
  }
}