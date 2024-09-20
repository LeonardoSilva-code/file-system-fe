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

export enum FileSystemType{
    FOLDER = "FOLDER",
    FILE = "FILE"
}