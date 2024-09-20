export interface FileDTO{
    id: string,
    parentId: string,
    name: string,
    createdDate: Date,
    updatedDate: Date,
    type: FileSystemType;
    extension?: string
    sizeInBytes?: number
}

export interface CreateDirectoryDTO{
    name: string,
    parentId?: string
}

export interface CreateFileDTO{
    name: string,
    parentId?: string
    sizeInBytes: number
    extension: string
}

export class BreadcrumbItemModel {
    title: string;
    linkText: string;
    linkPath: string;
  }

export enum FileSystemType{
    FOLDER = "FOLDER",
    FILE = "FILE"
}