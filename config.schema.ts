export const schema = {
    http: {
        port: {
          doc: 'HTTP port to listen on',
          format: 'port',
          default: 8080,
          env: 'HTTP_PORT',
        },
    },
    dbApp: {
        clientUrl: {
          doc: 'Connection URL',
          format: String,
          default: "",
          env: 'DB_APP_URL',
        },
    },
}