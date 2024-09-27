import { api } from '@env/api';

export const environment = {
  mocks: true,
  production: false,
  baseUrlAPI: '',
  api: {
    baseUrl: window.location.protocol,
    ...api,
  },
  version: '1.0.0',
  protocol: 'http',
  apiService: 'webresources/api/',
  estilosAlerta: 'alert alert-danger',
};