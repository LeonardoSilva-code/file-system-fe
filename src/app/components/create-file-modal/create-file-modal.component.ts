import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-create-file-modal',
  templateUrl: './create-file-modal.component.html',
  styleUrls: ['./create-file-modal.component.scss']
})
export class CreateFileModalComponent implements OnInit {

  @Input() parentFolderId: string
  formGroup: UntypedFormGroup;
  
  constructor(private fb: UntypedFormBuilder,
              private fileSystemService: FileSystemService,
              public modal: NgbActiveModal,){
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.formGroup = this.fb.group({
      name: ["", Validators.required],
      sizeInBytes: ["", Validators.required],
      extension: ["", Validators.required],
    })
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
    this.fileSystemService.createFile(body).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e) => {},
    })
  }


}
