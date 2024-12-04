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
      sasToken: 'sp=rcwd&st=2024-12-02T03:20:46Z&se=2024-12-31T11:20:46Z&sv=2022-11-02&sr=c&sig=TKBGsORpv5QwEGzEUUUXZyeGG9W9HweVVcbXs2%2FryOI%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };