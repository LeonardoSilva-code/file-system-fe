import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateDirectoryModalComponent } from 'src/app/components/create-directory-modal/create-directory-modal.component';
import { CreateFileModalComponent } from 'src/app/components/create-file-modal/create-file-modal.component';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FileSystemService } from 'src/app/services/file-system.service';
import { FileDTO } from 'src/app/models/file.model';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  parentFolderId: any;
  breadcrumbs: any[] = [];
  filteredDirectories: FileDTO[] = [];
  filteredFiles: FileDTO[] = [];
  
  private allDirectories: FileDTO[] = [];
  private allFiles: FileDTO[] = [];

  constructor(private modalService: NgbModal, 
              protected fileSystemService: FileSystemService,
              private breadcrumbService: BreadcrumbService,
              private route: ActivatedRoute,
              private router: Router){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.parentFolderId = params.get("id");
      if(!this.parentFolderId){
        this.fileSystemService.getRootFiles();
      }else{
        this.breadcrumbService.refreshBreadcrumb(this.parentFolderId);
        this.fileSystemService.getById(this.parentFolderId);
      }
    });

    this.fileSystemService.directoryItems$.subscribe((directories) => {
      this.allDirectories = directories;
      this.filteredDirectories = directories;
    });

    this.fileSystemService.fileItems$.subscribe((files) => {
      this.allFiles = files;
      this.filteredFiles = files;
    });

    this.breadcrumbService.breadcrumbDataSource$.subscribe(breadcrumbs => {
      this.breadcrumbs = breadcrumbs;
    });
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.toLowerCase();;
    const lowerCaseSearchText = searchTerm.toLowerCase();
    
    this.filteredDirectories = this.allDirectories.filter(directory => 
      directory.name.toLowerCase().includes(lowerCaseSearchText)
    );
    this.filteredFiles = this.allFiles.filter(file => 
      file.name.toLowerCase().includes(lowerCaseSearchText)
    );
  }

  openCreateFolderModal() {
    const modalRef = this.modalService.open(CreateDirectoryModalComponent, { windowClass: "modalContainerSizeClass" });
    modalRef.componentInstance.parentFolderId = this.parentFolderId;
    modalRef.result.then(
      () => { this.refreshFolder() },
      () => {}
    );
  }

  openCreateFileModal() {
    const modalRef = this.modalService.open(CreateFileModalComponent, { windowClass: "modalContainerSizeClass" });
    modalRef.componentInstance.parentFolderId = this.parentFolderId;
    modalRef.result.then(
      () => { this.refreshFolder() },
      () => {}
    );
  }

  refreshFolder(){
    if(this.parentFolderId){
      this.fileSystemService.getById(this.parentFolderId);
    }else{
      this.fileSystemService.getRootFiles();
    }
  }

  redirect(breadcrumb: any) {
    this.breadcrumbService.updatebreadcrumbBy(this.breadcrumbs, breadcrumb);
    this.router.navigate([breadcrumb.route]);
  }
}
