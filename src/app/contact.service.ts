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

  /**
   * Returns list of Contacts
   * @returns {Contact[]}
   */
  getContacts():Contact[] {
    return this.contacts.slice();
  }


  /**
   * Add new contact details
   * @param {Contact} contact
   * @returns
   */
  addContacts(contact: Contact) {
    this.contacts.push(contact);
    this.contactsChanged.next(this.contacts.slice());
  }

  /**
   * Update existing contact details
   * @param {number} index position of contact in list
   * @param {Contact} contact updated Contact details 
   * @returns
   */
  updateContact(index: number, contact: Contact) {
    this.contacts[index] = contact;
    this.contactsChanged.next(this.contacts.slice());
  }

  /**
   * delete one contact from contact list
   * @param {number} index position of contact in list
   * @return
   */
  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactsChanged.next(this.contacts.slice());
  }
}
