import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of } from 'rxjs';
import { ErrorModalComponent } from 'src/app/components/error-modal/error-modal.component';
import { CreateFileDTO, FileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-create-file-modal',
  templateUrl: './create-file-modal.component.html',
  styleUrls: ['./create-file-modal.component.scss']
})
export class CreateFileModalComponent implements OnInit {

  @Input() parentFolderId: string
  @Input() isEditionMode: boolean
  @Input() file: FileDTO
  formGroup: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder,
              private fileSystemService: FileSystemService,
              public modal: NgbActiveModal,
              private modalService: NgbModal){
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    if(this.isEditionMode){
      this.formGroup = this.fb.group({
        name: [this.file.name,  [Validators.required, Validators.maxLength(50)]],
        sizeInBytes: [this.file.sizeInBytes, Validators.required],
        extension: [this.file.extension,  [Validators.required, Validators.maxLength(10)]],
      })
    }else{
      this.formGroup = this.fb.group({
        name: ["", [Validators.required, Validators.maxLength(50)]],
        sizeInBytes: ["", Validators.required],
        extension: ["", [Validators.required, Validators.maxLength(10)]],
      })
    }

  }

  save(){
    let body: CreateFileDTO = {
      name: this.formGroup.get('name')?.value,
      sizeInBytes: this.formGroup.get('sizeInBytes')?.value,
      extension: this.formGroup.get('extension')?.value
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

  create(body: CreateFileDTO){
    this.fileSystemService.createFile(body).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e: HttpErrorResponse) => {
        if(e.status == 409){
         this.openErrorModal("Já existe um arquivo com esse nome")
        }
       },
    })
  }

  update(body: CreateFileDTO){
    this.fileSystemService.patchFile(body, this.file.id).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e: HttpErrorResponse) => {
        if(e.status == 409){
         this.openErrorModal("Já existe uma arquivo com esse nome")
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
