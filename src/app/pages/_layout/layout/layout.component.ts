import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{

  constructor(private breadcrumbService: BreadcrumbService,){

  }

  ngOnInit(): void {
    this.breadcrumbService.initbreadcrumb();
  }

}
