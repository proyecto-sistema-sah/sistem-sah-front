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
      sasToken: 'sp=rcwd&st=2024-12-03T04:36:19Z&se=2024-12-03T12:36:19Z&sip=201.190.119.66-158.23.105.0&sv=2022-11-02&sr=c&sig=p0uhVBc3S1qijZAS4WNwwthsclZ8FDsC65vkmDm07%2B8%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };