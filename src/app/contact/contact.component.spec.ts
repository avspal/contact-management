import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Contact } from './../contact.model';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let dialog: MatDialog;

  let contactStub : Contact = {
    firstName: 'ashish',
    lastName: 'pal',
    email: 'abc@cd.com',
    phone: '1212121212'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule],
      declarations: [ ContactComponent ],
      providers: [
        {provide: MatDialogRef, useValue:{} }, 
        {provide: MAT_DIALOG_DATA, useValue: {} }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit of component contactForm should be defined', () => {
    fixture.detectChanges();
    expect(component.contactForm).toBeDefined();
  });

  it('should create form group on formCreate', () => {
    component.createForm();
    expect(component.contactForm).toBeDefined();
  });

  it('should be empty string as value of firstName form control on createForm', () => {
    component.createForm();
    expect(component.contactForm.get('firstName').value).toEqual('');
  });


  it('should be valid after filling values to contactForm', () => {
    fixture.detectChanges();
    component.contactForm.patchValue(contactStub);
    expect(component.contactForm.valid).toBeTrue();
  });

  // it('should be in edit contact mode', () => {
  //   const config = {
  //     data: contactStub
  //   }
  //   dialog = TestBed.get(MatDialog);
  //   const dialogRef = dialog.open(ContactComponent, config);
  //   fixture.detectChanges();
  //   expect(component.isEditMode).toBeTrue();
  //   dialogRef.close();
  // });

  
  // it('should be in add contact mode', () => {
  //   const config = {
  //     data: {}
  //   }
  //   dialog = TestBed.get(MatDialog);
  //   const dialogRef = dialog.open(ContactComponent, config);
  //   fixture.detectChanges();
  //   expect(component.isEditMode).toBeFalse();
  //   dialogRef.close();
  // });


});
