module.exports = {
  "/api/v1/usuario/*": {
      "target": "http://sistema-sah-usuarios-e2efdyb8c6fva2ax.mexicocentral-01.azurewebsites.net/api/v1/usuario/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/usuario/": ""
      }
  },
  "/api/v1/tipo-usuario/*": {
      "target": "http://sistema-sah-usuarios-e2efdyb8c6fva2ax.mexicocentral-01.azurewebsites.net/api/v1/tipo-usuario/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/tipo-usuario/": ""
      }
  },
  "/api/v1/tipo-cuarto/*": {
    "target": "http://sistema-sah-reservas-ms-cngzf4d0aacsbehr.mexicocentral-01.azurewebsites.net/api/v1/tipo-cuarto/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/tipo-cuarto/": ""
    }
  },
  "/api/v1/reserva/*": {
    "target": "http://sistema-sah-reservas-ms-cngzf4d0aacsbehr.mexicocentral-01.azurewebsites.net/api/v1/reserva/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/reserva/": ""
    }
  },
  "/api/v1/facturacion/*": {
    "target": "http://sistema-sah-reservas-ms-cngzf4d0aacsbehr.mexicocentral-01.azurewebsites.net/api/v1/facturacion/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/facturacion/": ""
    }
  },          
  "/api/v1/cuartos/*": {
    "target": "http://sistema-sah-servicios-g7hxe3dwbzhkdnfp.mexicocentral-01.azurewebsites.net/api/v1/cuartos/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/cuartos/": ""
    }
  },         
  "/api/v1/servicios/*": {
    "target": "http://sistema-sah-servicios-g7hxe3dwbzhkdnfp.mexicocentral-01.azurewebsites.net/api/v1/servicios/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/servicios/": ""
    }
  },         
  "/api/v1/alimentos/*": {
    "target": "http://sistema-sah-servicios-g7hxe3dwbzhkdnfp.mexicocentral-01.azurewebsites.net/api/v1/alimentos/",
    "secure": false,
    "logLevel": "debug",
    "pathRewrite": {
      "^/api/v1/alimentos/": ""
    }
  }
}