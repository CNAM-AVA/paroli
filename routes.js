const routes = require('next-routes')

                                                    // Name   Page      Pattern
module.exports = routes()                           // ----   ----      -----
.add('sub', 'sub', '/p/:slug')                      // blog   blog      /blog/:slug