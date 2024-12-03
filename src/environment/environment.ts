import { api } from "./api";

export const environment = {
    mocks: true,
    production: false,
    api: {
      baseUrlAPI: '/api/v1',
      baseUrl: window.location.protocol,
      ...api,
    },
    repoImg: {
      urlBase: 'https://imagenesmf.blob.core.windows.net?',
      name: 'imagenes',
      sasToken: 'sp=racwdli&st=2024-12-02T03:46:16Z&se=2024-12-23T11:46:16Z&sip=168.63.129.16-201.190.119.66&sv=2022-11-02&sr=c&sig=jmmNv9V7bBM15wiQLDMEeu6%2BJeSS5ZDmoest4%2F%2FCjj4%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };