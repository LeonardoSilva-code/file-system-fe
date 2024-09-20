import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDirectoryDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-create-file-modal',
  templateUrl: './create-file-modal.component.html',
  styleUrls: ['./create-file-modal.component.scss']
})
export class CreateFileModalComponent implements OnInit {

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
      name: ["", Validators.required]
    })
  }

  save(){
    const body: CreateDirectoryDTO = {
        name: this.formGroup.get('name').value,
    }
    this.fileSystemService.createDirectory(body).subscribe({
      next: (n) => {
        this.modal.close();
      },
      error: (e) => {},
    })
  }

}
