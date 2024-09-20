import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CreateDirectoryDTO, CreateFileDTO, FileDTO, FileSystemType } from "src/app/models/file.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  export class FileSystemService{

    API_URL = `${environment.apiUrl}/api/filesystem`;
    private http: HttpClient;
    private _directoryItems$ = new BehaviorSubject<FileDTO[]>([]);
    private _fileItems$ = new BehaviorSubject<FileDTO[]>([]);

    constructor(@Inject(HttpClient) http: HttpClient) {
      this.http = http
    }

    get directoryItems$() {
      return this._directoryItems$.asObservable();
    }

    get fileItems$() {
      return this._fileItems$.asObservable();
    }

    getBreadcrumb(directoryId: string){
      return this.http.get<any[]>(`${this.API_URL}/breadcrumb/${directoryId}`)
    }

    getRootFiles(){
      this.http.get<FileDTO[]>(`${this.API_URL}/root`).subscribe({
        next: (n) => {
          this._directoryItems$.next(n.filter(d => d.type == FileSystemType.FOLDER))
          this._fileItems$.next(n.filter(d => d.type == FileSystemType.FILE))
        },
        error: (e) => {}
      })
    }

    getById(id: string){
      this.http.get<FileDTO[]>(`${this.API_URL}/directory/${id}`).subscribe({
        next: (n) => {
          this._directoryItems$.next(n.filter(d => d.type == FileSystemType.FOLDER))
          this._fileItems$.next(n.filter(d => d.type == FileSystemType.FILE))
        },
        error: (e) => {}
      })
    }

    createDirectory(input: CreateDirectoryDTO){
      return this.http.post(`${this.API_URL}/directory`, input)
    }

    createFile(input: CreateFileDTO){
      return this.http.post(`${this.API_URL}/file`, input)
    }

    patchDirectory(input: CreateDirectoryDTO, directoryId: string){
      return this.http.patch(`${this.API_URL}/directory/${directoryId}`, input)
    }

    
    patchFile(input: CreateFileDTO, fileId: string){
      return this.http.patch(`${this.API_URL}/file/${fileId}`, input)
    }

    deleteDirectory(directoryId: string){
      return this.http.delete(`${this.API_URL}/directory/${directoryId}`)
    }

    deleteFile(fileId: string){
      return this.http.delete(`${this.API_URL}/file/${fileId}`)
    }
  

  }