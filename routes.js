const routes = require('next-routes')
                                                    // Name   Page   Pattern
module.exports = routes()                           // ----   ----   -----
.add('sub', '/p/:slug', 'sub')                      // sub    sub    /p/:slug