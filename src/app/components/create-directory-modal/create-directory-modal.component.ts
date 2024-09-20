import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDirectoryDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-create-directory-modal',
  templateUrl: './create-directory-modal.component.html',
  styleUrls: ['./create-directory-modal.component.scss']
})
export class CreateDirectoryModalComponent implements OnInit {

  formGroup: UntypedFormGroup;
  @Input() parentFolderId: string
  
  constructor(private fb: UntypedFormBuilder,
              private fileSystemService: FileSystemService,
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
    let body: CreateDirectoryDTO = {
        name: this.formGroup.get('name')?.value,
    }
    if(this.parentFolderId){
      body['parentId'] = this.parentFolderId
    }
    this.fileSystemService.createDirectory(body).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e) => {},
    })
  }

}
