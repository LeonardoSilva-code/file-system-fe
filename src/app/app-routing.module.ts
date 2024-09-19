import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/pages/_layout/layout/layout.component';
import { FilesComponent } from 'src/app/pages/files/files.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
      path: "files",
      component: FilesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
