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
      sasToken: 'sp=rcwd&st=2024-12-02T01:03:26Z&se=2024-12-31T09:03:26Z&sip=201.190.119.66&sv=2022-11-02&sr=c&sig=blJtoCFTBIJZk640ZqvCK3m2lAknad08puguUTGIrUc%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };