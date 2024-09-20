import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FileSystemService } from 'src/app/services/file-system.service';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  private readonly initialBreadcrumb: any[] = [
    {
      id: null,
      name: "Files",
      route: `/files`,
      active: true
    }
  ]

  private readonly breadcrumbId = 'breadcrumb';
  private _breadcrumbDataSource$ = new BehaviorSubject<any>({})

  get breadcrumbDataSource$ (){
    return this._breadcrumbDataSource$.asObservable();
  }

  constructor(private fileSystemService: FileSystemService) {
  }

  refreshBreadcrumb(directoryId: string){
    const breadcrumbUnparsed = sessionStorage.getItem(this.breadcrumbId);
    if (breadcrumbUnparsed) {
      const breadcrumb = JSON.parse(breadcrumbUnparsed)
      if(breadcrumb.length < 2){
          this.fileSystemService.getBreadcrumb(directoryId).subscribe({
            next: (n) => {
              for(const item of n){
                breadcrumb.push({
                  id: item.id,
                  name: item.name,
                  route: `/files/${item.id}`
                })
              }
              this.removeBreadcrumbsAfter(breadcrumb, breadcrumb.id)
              this.updateActiveStatus(breadcrumb)
              sessionStorage.setItem(this.breadcrumbId, JSON.stringify(breadcrumb));
              this._breadcrumbDataSource$.next(breadcrumb)
            }
          })
      }
    }
  }

  initbreadcrumb() {
    this.cleanbreadcrumb()
    const breadcrumb = sessionStorage.getItem(this.breadcrumbId);
    if (!breadcrumb) {
      sessionStorage.setItem(this.breadcrumbId, JSON.stringify(this.initialBreadcrumb));
      this._breadcrumbDataSource$.next(this.initialBreadcrumb)
    }
  }

  addDocumentBreadcrumbItem(breadcrumbInput: any) {
    const breadcrumbUnparsed = sessionStorage.getItem(this.breadcrumbId);
    if (breadcrumbUnparsed) {
      const breadcrumb = JSON.parse(breadcrumbUnparsed)
      breadcrumb.push({
        id: breadcrumbInput.id,
        name: breadcrumbInput.name,
        route: breadcrumbInput.route
      })
      this.removeBreadcrumbsAfter(breadcrumb, breadcrumb.id)
      this.updateActiveStatus(breadcrumb)
      sessionStorage.setItem(this.breadcrumbId, JSON.stringify(breadcrumb));
      this._breadcrumbDataSource$.next(breadcrumb)
    }
  }

  updatebreadcrumbBy(breadcrumbs: any, breadcrumb: any) {
    this.removeBreadcrumbsAfter(breadcrumbs, breadcrumb.id)
    this.updateActiveStatus(breadcrumbs)
    sessionStorage.setItem(this.breadcrumbId, JSON.stringify(breadcrumbs));
    this._breadcrumbDataSource$.next(breadcrumbs)
  }

  private updateActiveStatus(breadcrumbs: any) {
    breadcrumbs.forEach((item: any, index: any) => {
      item.active = false;
    });

    if (breadcrumbs.length > 0) {
      breadcrumbs[breadcrumbs.length - 1].active = true;
    }
  }

  private removeBreadcrumbsAfter(breadcrumbs: any, id: any) {
    const index = breadcrumbs.findIndex((item: { id: any; }) => item.id === id);

    if (index !== -1) {
      breadcrumbs.splice(index + 1);
      return breadcrumbs
    }

    return breadcrumbs;
  }

  private cleanbreadcrumb() {
    sessionStorage.removeItem(this.breadcrumbId)
  }

}
