module.exports = function(router){
    var routeUrl = '/deliveries';

    router.get(routeUrl, require('./list'));
    router.get(routeUrl +'/:id', require('./view'));
    router.post(routeUrl, require('./add'));
    router.get(routeUrl+'a', require('./add'));
    router.post(routeUrl +'/:id', require('./update'));
    router.put(routeUrl +'/:id', require('./update'));
};