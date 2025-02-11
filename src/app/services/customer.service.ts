import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly STORAGE_KEY = 'customers';

  getCustomers(): Customer[] {
    const customers = localStorage.getItem(this.STORAGE_KEY);
    return customers ? JSON.parse(customers) : [];
  }

  addCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    customer.id = crypto.randomUUID();
    customers.push(customer);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customers));
  }

  updateCustomer(updatedCustomer: Customer): void {
    const customers = this.getCustomers();
    const index = customers.findIndex(c => c.id === updatedCustomer.id);
    if (index !== -1) {
      customers[index] = updatedCustomer;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(customers));
    }
  }

  deleteCustomer(id: string): void {
    const customers = this.getCustomers();
    const filteredCustomers = customers.filter(c => c.id !== id);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredCustomers));
  }
}