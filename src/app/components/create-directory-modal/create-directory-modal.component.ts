import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';
import { ErrorModalComponent } from 'src/app/components/error-modal/error-modal.component';
import { CreateDirectoryDTO, FileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-create-directory-modal',
  templateUrl: './create-directory-modal.component.html',
  styleUrls: ['./create-directory-modal.component.scss']
})
export class CreateDirectoryModalComponent implements OnInit {

  formGroup: UntypedFormGroup;
  @Input() parentFolderId: string
  @Input() isEditionMode: boolean
  @Input() folder: FileDTO
  
  constructor(private fb: UntypedFormBuilder,
              private fileSystemService: FileSystemService,
              public modal: NgbActiveModal,
              private modalService: NgbModal, ){
  }

  
  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    if(this.isEditionMode){
      this.formGroup = this.fb.group({
        name: [this.folder.name, [Validators.required, Validators.maxLength(50)]]
      })
    }
    else{
    this.formGroup = this.fb.group({
      name: ["", [Validators.required, Validators.maxLength(50)]]
    })
  }
  }

  save(){
    let body: CreateDirectoryDTO = {
        name: this.formGroup.get('name')?.value,
    }
    if(this.parentFolderId){
      body['parentId'] = this.parentFolderId
    }
    if(this.isEditionMode){
      this.update(body)
    }else{
      this.create(body)
    }
  }

  create(body: CreateDirectoryDTO){
    this.fileSystemService.createDirectory(body).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e: HttpErrorResponse) => {
       if(e.status == 409){
        this.openErrorModal("Já existe uma pasta com esse nome")
       }
      },
    })
  }
  
  update(body: CreateDirectoryDTO){
    this.fileSystemService.patchDirectory(body, this.folder.id).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e) => {
        if(e.status == 409){
          this.openErrorModal("Já existe uma pasta com esse nome")
         }
      },
    })
  }

  openErrorModal(message: string) {
    const modalRef = this.modalService.open(ErrorModalComponent);
    modalRef.componentInstance.errorMessage = message
    modalRef.result.then(
      () => { this.modal.close() },
      () => { this.modal.close() }
    );
  }

  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string | number): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
  
}
