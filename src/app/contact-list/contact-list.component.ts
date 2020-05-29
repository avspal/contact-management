import { ContactService } from './../contact.service';
import { Contact } from './../contact.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactComponent } from '../contact/contact.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.less'],
})
export class ContactListComponent implements OnInit {
  public contacts: Contact[];
  private subscription:Subscription;
  constructor(
    private contactServie: ContactService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contacts = this.contactServie.getContacts();
    this.subscription = this.contactServie.contactsChanged.subscribe(changedContacts => {
      this.contacts = changedContacts;
    });
  }

  /**
   * Edit existing contact details
   * @param {number} index position of contact in list
   * @param {Contact} contact Contact details to be edited
   * @returns
   */
  editContact(index: number, contact: Contact) {
    const dialogRef = this.dialog.open(ContactComponent, {
      data: contact,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        if(!isNaN(index)) {
          result['isActive']  = contact.isActive;
          this.contactServie.updateContact(index, result);
        }
      }
    });
  }


  /**
   * Add new contact details
   * @returns
   */
  addContact() {
    const dialogRef = this.dialog.open(ContactComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        result['isActive']  = true;
        this.contactServie.addContacts(result);
      }
    });
  }
  
  /**
   * delete one contact from contact list
   * @param {number} index position of contact in list
   * @return
   */
  deleteContact(index: number) {
    this.contactServie.deleteContact(index);
  }

}
