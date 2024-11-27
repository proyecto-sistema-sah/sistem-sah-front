module.exports = {
    "/api/v1/usuario/*": {
        "target": "http://localhost:8001/api/v1/usuario/",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/usuario/": ""
        }
    },
    "/api/v1/tipo-usuario/*": {
        "target": "http://localhost:8001/api/v1/tipo-usuario/",
        "secure": false,
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/tipo-usuario/": ""
        }
    },
    "/api/v1/tipo-cuarto/*": {
      "target": "http://localhost:8002/api/v1/tipo-cuarto/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/tipo-cuarto/": ""
      }
    },
    "/api/v1/reserva/*": {
      "target": "http://localhost:8002/api/v1/reserva/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/reserva/": ""
      }
    },          
    "/api/v1/cuartos/*": {
      "target": "http://localhost:8005/api/v1/cuartos/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/cuartos/": ""
      }
    },         
    "/api/v1/servicios/*": {
      "target": "http://localhost:8005/api/v1/servicios/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/servicios/": ""
      }
    },         
    "/api/v1/alimentos/*": {
      "target": "http://localhost:8005/api/v1/alimentos/",
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/alimentos/": ""
      }
    }
}