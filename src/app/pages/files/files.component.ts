import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { CreateFileModalComponent } from 'src/app/components/create-file-modal/create-file-modal.component';
import { FileDTO, FileSystemType } from 'src/app/models/file.model';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  protected files$ = new BehaviorSubject<FileDTO[]>([
    {
      id: "string",
      name: "pasta",
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      type: FileSystemType.FOLDER,
      extension: undefined,
      sizeInBytes: undefined
    },
    {
      id: "string",
      name: "pasta",
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      type: FileSystemType.FOLDER,
      extension: undefined,
      sizeInBytes: undefined
    },
    {
      id: "string",
      name: "Arquivo",
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      type: FileSystemType.FILE,
      extension: undefined,
      sizeInBytes: undefined
    },
    {
      id: "string",
      name: "Arquivo",
      createdDate: new Date(Date.now()),
      updatedDate: new Date(Date.now()),
      type: FileSystemType.FILE,
      extension: undefined,
      sizeInBytes: undefined
    },
    
  ])

  constructor(private modalService: NgbModal){

  }

  ngOnInit(): void {
  }

  openCreateFolderModal() {
    const modalRef = this.modalService.open(CreateFileModalComponent, { windowClass: "modalContainerSizeClass" });

    modalRef.result.then(
      () => {
      },
      () => {
      }
    );
  }

}
