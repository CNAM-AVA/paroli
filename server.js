const express = require('express')
const next = require('next')
require('dotenv').config()
const routes = require('./routes')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = routes.getRequestHandler(app)
const port = dev ? 3000 : process.env.PORT;

app.prepare()
    .then(() => {
        const server = express()

        if (dev) server.use(require('express-naked-redirect')(true))
        server.use(handle);

        server.get('*', (req, res) => {

            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })