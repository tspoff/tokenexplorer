const routes = require('next-routes')();

routes
    .add('/blocks/', '/blocks/index')
    .add('/blocks/:hash', '/blocks/show')
    .add('/tokens/', '/tokens/index')
    .add('/tokens/:address', '/tokens/show');
module.exports = routes;