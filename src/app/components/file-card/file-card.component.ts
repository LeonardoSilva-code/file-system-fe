import { Component, Input, OnInit } from '@angular/core';
import { FileDTO } from 'src/app/models/file.model';
import { FileSystemService } from 'src/app/services/file-system.service';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit{

  @Input() file: FileDTO;

  constructor(private fileSystemService: FileSystemService){

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

}
