import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
              public modal: NgbActiveModal,){
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
      error: (e) => {},
    })
  }

  update(body: CreateFileDTO){
    this.fileSystemService.patchFile(body, this.file.id).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e) => {},
    })
  }


}
