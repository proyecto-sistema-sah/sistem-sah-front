import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BlobStorageService {
  private containerName = environment.repoImg.name;
  private sasToken = environment.repoImg.sasToken;
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(
      `${environment.repoImg.urlBase}${this.sasToken}`
    );
  }

  async uploadFile(file: File): Promise<string> {
    console.log("Se va a subir");
    console.log(file)
    const nombre = this.generateRandomCode(10)
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(nombre);
    await blockBlobClient.uploadData(file);
    console.log("Se subio");
    return nombre;
  }

  async listBlobs(): Promise<string[]> {
    const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
    const blobList = [];
    for await (const blob of containerClient.listBlobsFlat()) {
      blobList.push(this.getBlobUrl(blob.name));
    }
    return blobList;
  }

    // Obtener la URL de un archivo por su nombre
    getBlobUrl(fileName: string): string {
      const containerClient = this.blobServiceClient.getContainerClient(this.containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(fileName);
      return blockBlobClient.url;
    }
  

  generateRandomCode(length: number): string {
    const characters = environment.file.charactersValidation;
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result + environment.file.extension;
  }

}
