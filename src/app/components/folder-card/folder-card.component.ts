import { Component, Input, OnInit } from '@angular/core';
import { FileDTO } from 'src/app/models/file.model';

@Component({
  selector: 'app-folder-card',
  templateUrl: './folder-card.component.html',
  styleUrls: ['./folder-card.component.scss']
})
export class FolderCardComponent implements OnInit{

  @Input() folder: FileDTO;

  constructor(){

  }

  
  ngOnInit(): void {
  }

}
