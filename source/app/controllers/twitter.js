/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/27/15.
 */
(function(module) {
    "use strict";

    /* Dependencies */
    var Twit     = require('twit'),
        config   = require('../config'),
        database = require('./database'),
        _        = require('lodash');

    /* Instances */
    var twitter = new Twit({
        consumer_key:         config.consumerKey,
        consumer_secret:      config.consumerSecret,
        access_token:         config.accessToken,
        access_token_secret:  config.accessTokenSecret
    });

    /* Private Methods */
    /**
     * Searches twitter and returns the result
     * @param query
     * @returns {Promise}
     */
    function search(query) {
        // Return a promise
        return new Promise(function(resolve, reject) {
            // Search twitter
            twitter.get('search/tweets', query, function(err, data) {
                if(err) {
                    (reject)(err);
                } else {
                    (resolve)(data.statuses);
                }
            });
        });
    }

    /**
     * Retweet some tweets on twitter
     * @param statuses
     * @returns {Promise}
     */
    function retweet(statuses) {
        return new Promise(function(resolve, reject) {
            var promises = [];

            // Check Database
            statuses.forEach(function(status) {
                promises.push(new Promise(function(r) {
                    twitter.post('statuses/retweet/:id', {id: status.id_str}, function(err) {
                        database.insert(status).then(function() {
                            (r)(err ? 0 : 1);
                        });
                    });
                }));
            });

            // Filter All
            if(promises.length > 0) {
                Promise.all(promises).then(function(data) {
                    (resolve)(_.sum(data));
                });
            } else {
                (reject)('Error in retweeting tweets.');
            }
        });
    }

    /* Public Methods */
    module.exports = {
        search: search,
        retweet: retweet
    };
})(module);