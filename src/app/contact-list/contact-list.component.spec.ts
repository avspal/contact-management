import { Contact } from './../contact.model';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

import { ContactListComponent } from './contact-list.component';
import { ContactService } from './../contact.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { platform } from 'os';

export class MatDialogMock {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of({ action: true })
    };
  }
}

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let debugElement: DebugElement;
  let element: HTMLElement;

  let cotactServiceMock: ContactService;
  let dialog: MatDialogMock; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatCardModule,
      ],
      declarations: [ ContactListComponent ],
      providers: [ {provide: MatDialog, useClass: MatDialogMock }, ContactService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    dialog = TestBed.get(MatDialog);
    cotactServiceMock = TestBed.get(ContactService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial value on init of ContactListComponent', () => {
    fixture.detectChanges();
    expect(component.contacts.length).toBeGreaterThan(0);
  });

  it('should call cotactServiceMock.addContacts when addContact function is called', fakeAsync(() => {
    spyOn(cotactServiceMock, 'addContacts').and.callThrough();
    component.addContact()
    expect(cotactServiceMock.addContacts).toHaveBeenCalledWith(jasmine.any(Object));
    }
  ));

  it('should call cotactServiceMock.deleteContact when deleteContact function is called', fakeAsync(() => {
    spyOn(cotactServiceMock, 'deleteContact').and.callThrough();
    component.deleteContact(0);
    expect(cotactServiceMock.deleteContact).toHaveBeenCalledWith(0);
  }));


});
