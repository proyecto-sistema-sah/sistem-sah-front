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
      sasToken: 'sp=racwdli&st=2024-12-03T01:40:50Z&se=2024-12-18T09:40:50Z&sip=201.190.119.66&sv=2022-11-02&sr=c&sig=5kO89wlfItl6MMZ7It0al4fBYyJN7TMfobUyTsKZEKc%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };