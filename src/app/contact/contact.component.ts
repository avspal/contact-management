import { Contact } from './../contact.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  constructor(
    private dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Contact
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (Object.keys(this.data).length > 0) {
      this.isEditMode = true;
      this.contactForm.patchValue(this.data);
    }
  }

  createForm() {
    this.contactForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[
        Validators.required,
        Validators.email,
      ]),
      phone: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{10}$/), Validators.maxLength(10)])
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
