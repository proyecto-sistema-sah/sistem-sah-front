import { Injectable } from '@angular/core';
import { BlobServiceClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root',
})
export class BlobStorageService {
  private containerName = 'imagenes';
  private sasToken = 'sp=racwdl&st=2024-09-27T20:50:57Z&se=2025-12-12T04:50:57Z&sip=201.190.119.66&sv=2022-11-02&sr=c&sig=CzrRkCOCRU6G2ZLEz3Ev0kwUxx137H4MWOr1JX7K5zU%3D';
  private blobServiceClient: BlobServiceClient;

  constructor() {
    this.blobServiceClient = new BlobServiceClient(
      `https://imagenesmf.blob.core.windows.net?${this.sasToken}`
    );
  }

  async uploadFile(file: File): Promise<string> {
    console.log("Se va a subir");
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
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result + '.png';
  }

}
