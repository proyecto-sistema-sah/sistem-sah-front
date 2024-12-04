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
      sasToken: 'sp=rcwd&st=2024-12-02T02:29:59Z&se=2024-12-31T10:29:59Z&sip=201.190.119.66-158.23.40.150&sv=2022-11-02&sr=c&sig=HVCBkIqA4R6A1O61fGKdfl5oQtpExNnVam7Wf1Pn8MQ%3D'
    },
    file:{
      charactersValidation: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
      extension: '.png'
    },
  };