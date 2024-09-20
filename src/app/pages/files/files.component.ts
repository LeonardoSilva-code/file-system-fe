import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { CreateFileModalComponent } from 'src/app/components/create-file-modal/create-file-modal.component';
import { FileDTO, FileSystemType } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  constructor(private modalService: NgbModal, protected fileSystemService: FileSystemService,){

  }

  ngOnInit(): void {
    this.fileSystemService.getRootFiles()
  }

  openCreateFolderModal() {
    const modalRef = this.modalService.open(CreateFileModalComponent, { windowClass: "modalContainerSizeClass" });

    modalRef.result.then(
      () => {  this.fileSystemService.getRootFiles() },
      () => {}
    );
  }

}
