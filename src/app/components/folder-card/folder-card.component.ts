import { Component, Input, OnInit } from '@angular/core';
import { FileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss']
})
export class FolderCardComponent implements OnInit{

  @Input() folder: FileDTO;

  constructor( private fileSystemService: FileSystemService,){

  }

  
  ngOnInit(): void {
  }

  delete(){
    this.fileSystemService.deleteDirectory(this.folder.id).subscribe({
      next: (n) => {
        if(!this.folder.parentId)
        this.fileSystemService.getRootFiles()
      },
      error: (e) => {}
    })
  }

}
