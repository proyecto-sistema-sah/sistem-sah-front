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
      sasToken: 'sp=racwdl&st=2024-09-27T20:50:57Z&se=2025-12-12T04:50:57Z&sip=201.190.119.66&sv=2022-11-02&sr=c&sig=CzrRkCOCRU6G2ZLEz3Ev0kwUxx137H4MWOr1JX7K5zU%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };