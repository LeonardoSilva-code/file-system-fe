import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-file-modal',
  templateUrl: './create-file-modal.component.html',
  styleUrls: ['./create-file-modal.component.scss']
})
export class CreateFileModalComponent implements OnInit {

  formGroup: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder,
              public modal: NgbActiveModal,){
    
  }

  
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ["", Validators.required]
    })
  }

  save(){

  }

}
