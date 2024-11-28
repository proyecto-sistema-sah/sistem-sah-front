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
      sasToken: 'sp=racwdl&st=2024-11-27T23:52:52Z&se=2024-12-27T07:52:52Z&sip=190.165.119.246&sv=2022-11-02&sr=c&sig=74Bkwf9Mnq4RiVsO%2BfiuUzBfUxItB%2BOxcr8rlwmfrmQ%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };