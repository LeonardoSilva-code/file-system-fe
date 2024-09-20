import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileDTO } from 'src/app/models/file.model';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss']
})
export class FolderCardComponent implements OnInit{

  @Input() folder: FileDTO;

  constructor(private fileSystemService: FileSystemService,
              private breadCrumbService: BreadcrumbService,
              private router: Router){
  }

  ngOnInit(): void {
  }

  delete(){
    this.fileSystemService.deleteDirectory(this.folder.id).subscribe({
      next: (n) => {
        if(!this.folder.parentId)
          this.fileSystemService.getRootFiles()
        else
          this.fileSystemService.getById(this.folder.parentId)
      },
      error: (e) => {}
    })
  }

  openFolder(){
    console.log(this.folder)
    this.breadCrumbService
    .addDocumentBreadcrumbItem({
      id: this.folder.id,
      name: this.folder.name,
      route: `/files/${this.folder.id}`
    })
    this.router.navigate([`/files/${this.folder.id}`]);
  }

}
