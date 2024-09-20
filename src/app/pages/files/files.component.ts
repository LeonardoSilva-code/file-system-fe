import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDirectoryModalComponent } from 'src/app/components/create-directory-modal/create-directory-modal.component';
import { CreateFileModalComponent } from 'src/app/components/create-file-modal/create-file-modal.component';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FileSystemService } from 'src/app/services/file-system.service';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  parentFolderId: any
  breadcrumbs: any[] = []

  constructor(private modalService: NgbModal, 
              protected fileSystemService: FileSystemService,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute,
              private router: Router,){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.parentFolderId = params.get("id");
      if(!this.parentFolderId){
        this.fileSystemService.getRootFiles()
      }else{
        this.fileSystemService.getById(this.parentFolderId)
      }
    })
    this.breadcrumbService.breadcrumbDataSource$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs
    })
    
  }

  openCreateFolderModal() {
    const modalRef = this.modalService.open(CreateDirectoryModalComponent, { windowClass: "modalContainerSizeClass" });
    modalRef.componentInstance.parentFolderId = this.parentFolderId;
    modalRef.result.then(
      () => {  this.refreshFolder() },
      () => {}
    );
  }

  openCreateFileModal() {
    const modalRef = this.modalService.open(CreateFileModalComponent, { windowClass: "modalContainerSizeClass" });
    modalRef.componentInstance.parentFolderId = this.parentFolderId;
    modalRef.result.then(
      () => {  this.refreshFolder() },
      () => {}
    );
  }

  refreshFolder(){
    if(this.parentFolderId){
      this.fileSystemService.getById(this.parentFolderId)
    }else{
      this.fileSystemService.getRootFiles()
    }
  }

  
  redirect(breadcrumb: any) {
      this.breadcrumbService.updatebreadcrumbBy(this.breadcrumbs, breadcrumb)
      this.router.navigate([breadcrumb.route])
    }
}
