module.exports = {
    "/api/v1/usuario/*": {
        "target": "https://sistema-sah-usuarios-ms-fkb7azdhf7d7cag5.mexicocentral-01.azurewebsites.net/api/v1/usuario/",
        "secure": true,
        "changeOrigin": true, // Cambia el origen de la solicitud
        "logLevel": "debug",
        "pathRewrite": {
          "^/api/v1/usuario/": ""
        }
    }

}