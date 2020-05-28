import { Contact } from './contact.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contactsChanged = new Subject<Contact[]>();

  private contacts: Contact[] = [
    {
      firstName: 'Ashish', lastName: 'Pal', email: 'abc@gmai.com', phone: '1212121212', isActive: true
    },
    {
      firstName: 'Sandeep', lastName: 'Singh', email: 'abc@gmai.com', phone: '1212121212', isActive: true
    },
    {
      firstName: 'Vikas', lastName: 'Singh', email: 'abc@gmai.com', phone: '1212121212', isActive: false
    }
  ]

  constructor() { }

  getContacts():Contact[] {
    return this.contacts.slice();
  }

  addContacts(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChanged.next(this.contacts.slice());
  }

  updateContact(index: number, contact: Contact) {
    this.contacts[index] = contact;
    this.contactsChanged.next(this.contacts.slice());
  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactsChanged.next(this.contacts.slice());
  }
}
