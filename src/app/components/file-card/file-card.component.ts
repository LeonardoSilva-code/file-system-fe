import { Component, Input, OnInit } from '@angular/core';
import { FileDTO } from 'src/app/models/file.model';

@Component({
  selector: 'app-file-card',
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent implements OnInit{

  @Input() file: FileDTO;

  constructor(){

  }

  ngOnInit(): void {
  }

}
