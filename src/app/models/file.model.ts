export interface FileDTO{
    id: string,
    name: string,
    createdDate: Date,
    updatedDate: Date,
    type: FileSystemType;
    extension?: string
    sizeInBytes?: number
}

export enum FileSystemType{
    FOLDER = "FOLDER",
    FILE = "FILE"
}