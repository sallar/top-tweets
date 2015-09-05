/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/27/15.
 */
(function() {
    "use strict";

    /* Dependencies */
    var promise   = require('es6-promise'),
        twitter   = require('./app/controllers/twitter'),
        filter    = require('./app/controllers/validator'),
        database  = require('./app/controllers/database'),
        config    = require('./app/config');

    /* Instances */
    promise.polyfill();
    database.connect();

    (function search() {
        /* Search Twitter */
        twitter.search({
            q                : config.search.query,
            lang             : config.search.lang,
            count            : config.search.count,
            result_type      : config.search.type,
            include_entities : true
        })
            /* Filter Tweets Array */
            .then(filter)
            /* Check Database for Duplicates */
            .then(database.check)
            /* Retweet on Twitter */
            .then(twitter.retweet)
            /* Log & Repeat */
            .then(function(count) {
                console.log(count + ' new tweets have been retweeted.');
                setTimeout(search, config.interval);
            })
            /* Error! */
            .catch(function(err) {
                console.log(err);
                setTimeout(search, config.interval);
            });
    })();
})();