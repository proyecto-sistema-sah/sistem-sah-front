module.exports = {
    "/api/v1/usuario/*": {
        "target": "https://sistema-sah-usuarios-e2efdyb8c6fva2ax.mexicocentral-01.azurewebsites.net/api/v1/usuario/",
        "secure": true,
        "changeOrigin": true, // Cambia el origen de la solicitud
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/usuario/": ""
        }
    },
    "/api/v1/tipo-usuario/*": {
        "target": "https://sistema-sah-usuarios-e2efdyb8c6fva2ax.mexicocentral-01.azurewebsites.net/api/v1/tipo-usuario/",
        "secure": true,
        "changeOrigin": true, // Cambia el origen de la solicitud
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/tipo-usuario/": ""
        }
    },
    "/api/v1/tipo-cuarto/*": {
      "target": "https://sistema-sah-reserva-ajhre0aeayephnhe.mexicocentral-01.azurewebsites.net/api/v1/tipo-cuarto/",
      "secure": true,
      "changeOrigin": true, // Cambia el origen de la solicitud
      "logLevel": "debug",
      "pathRewrite": {
        "^/api/v1/tipo-cuarto/": ""
      }
  }        

}