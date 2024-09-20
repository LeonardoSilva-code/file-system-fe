import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateFileModalComponent } from 'src/app/components/create-file-modal/create-file-modal.component';
import { FileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit{

  @Input() file: FileDTO;

  constructor(private fileSystemService: FileSystemService,
              private modalService: NgbModal,
  ){

  }

  ngOnInit(): void {
  }

  delete(){
    this.fileSystemService.deleteFile(this.file.id).subscribe({
      next: (n) => {
        if(!this.file.parentId)
          this.fileSystemService.getRootFiles()
        else
          this.fileSystemService.getById(this.file.parentId)
      },
      error: (e) => {}
    })
  }

  rename(){
    const modalRef = this.modalService.open(CreateFileModalComponent, { windowClass: "modalContainerSizeClass" });
    modalRef.componentInstance.parentFolderId = this.file.parentId;
    modalRef.componentInstance.isEditionMode = true
    modalRef.componentInstance.file = this.file
    modalRef.result.then(
      () => {  this.refreshFolder() },
      () => {}
    );
  }

  refreshFolder(){
    if(this.file.parentId){
      this.fileSystemService.getById(this.file.parentId)
    }else{
      this.fileSystemService.getRootFiles()
    }
  }

}
