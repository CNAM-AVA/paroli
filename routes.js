const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('sub', 'sub', '/p/:slug')                      // blog   blog      /blog/:slug
.add('user', '/user/:id', 'profile')                // user   profile   /user/:id
.add('/:noname/:lang(en|es)/:wow+', 'complex')      // (none) complex   /:noname/:lang(en|es)/:wow+
.add({name: 'beta', pattern: '/v3', page: 'v3'})    // beta   v3        /v3