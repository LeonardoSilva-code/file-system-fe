import { Inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CreateDirectoryDTO, FileDTO } from "src/app/models/file.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  export class FileSystemService{

    API_URL = `${environment.apiUrl}/api/filesystem`;
    private http: HttpClient;
    private _items$ = new BehaviorSubject<FileDTO[]>([]);

    constructor(@Inject(HttpClient) http: HttpClient) {
      this.http = http
    }

    get items$() {
      return this._items$.asObservable();
    }

    getRootFiles(){
      this.http.get<FileDTO[]>(`${this.API_URL}/root`).subscribe({
        next: (n) => this._items$.next(n),
        error: (e) => {}
      })
    }

    createDirectory(input: CreateDirectoryDTO){
      return this.http.post(`${this.API_URL}/directory`, input)
    }

    deleteDirectory(directoryId: string){
      return this.http.delete(`${this.API_URL}/directory/${directoryId}`)
    }
  

  }