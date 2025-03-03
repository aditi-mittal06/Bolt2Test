import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Customer } from '../models/customer.model';

@Component({
  selector: 'app-customer-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-backdrop" (click)="close.emit()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2>{{ customer.id ? 'Edit' : 'Add' }} Customer</h2>
        <form (ngSubmit)="onSubmit()" #customerForm="ngForm">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              [(ngModel)]="customer.firstName"
              required
              maxlength="100"
              class="form-control"
              #firstName="ngModel"
            />
            <div *ngIf="firstName.invalid && (firstName.dirty || firstName.touched)" class="error">
              First Name is required and must be less than 100 characters
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              [(ngModel)]="customer.lastName"
              required
              maxlength="100"
              class="form-control"
              #lastName="ngModel"
            />
            <div *ngIf="lastName.invalid && (lastName.dirty || lastName.touched)" class="error">
              Last Name is required and must be less than 100 characters
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="customer.email"
              required
              maxlength="100"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              class="form-control"
              #email="ngModel"
            />
            <div *ngIf="email.invalid && (email.dirty || email.touched)" class="error">
              Please enter a valid email address
            </div>
          </div>

          <div class="form-group">
            <label for="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              [(ngModel)]="customer.phoneNumber"
              required
              pattern="[0-9]{10}"
              class="form-control"
              #phone="ngModel"
            />
            <div *ngIf="phone.invalid && (phone.dirty || phone.touched)" class="error">
              Please enter a valid 10-digit phone number
            </div>
          </div>

          <div class="form-group">
            <label>Gender</label>
            <div class="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  [(ngModel)]="customer.gender"
                  required
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  [(ngModel)]="customer.gender"
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div class="button-group">
            <button type="button" class="btn btn-secondary" (click)="close.emit()">Cancel</button>
            <button
              type="submit"
              class="btn btn-primary"
              [disabled]="customerForm.invalid"
            >
              {{ customer.id ? 'Update' : 'Submit' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 90%;
      max-width: 500px;
    }

    .radio-group {
      display: flex;
      gap: 20px;
    }

    .radio-group label {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .button-group {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 20px;
    }

    .error {
      color: red;
      font-size: 0.8em;
      margin-top: 5px;
    }

    .btn-secondary {
      background-color: #6c757d;
    }
  `]
})
export class CustomerModalComponent {
  @Input() customer: Customer = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    gender: 'Male'
  };

  @Output() save = new EventEmitter<Customer>();
  @Output() close = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.customer);
  }
}