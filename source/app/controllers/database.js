/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/27/15.
 */
(function(module) {
    "use strict";

    /* Dependencies */
    var MongoClient = require('mongodb').MongoClient,
        _           = require('lodash'),
        config      = require('../config'),
        _db         = null;

    /* Private Methods */
    /**
     * Connect to Database
     */
    function connect() {
        // Connect
        MongoClient.connect(config.db.connection, function(err, db) {
            if(err) {
                throw new Error("Database connection failed");
            }
            _db = db;
        });
    }

    /**
     * Check Database to see if there is any duplicates
     * @param statuses
     * @returns {Promise}
     */
    function check(statuses) {
        return new Promise(function(resolve, reject) {
            var promises = [],
                filtered = [];

            // Check Database
            statuses.forEach(function(status) {
                promises.push(new Promise(function(r) {
                    _db.collection(config.db.collection).count({id_str: status.id_str}, function(err, count) {
                        (r)({
                            count: count,
                            status: status
                        });
                    });
                }));
            });

            // Filter All
            if(promises.length > 0) {
                Promise.all(promises).then(function (data) {
                    data.forEach(function (item) {
                        if (item.count === 0) {
                            filtered.push(item.status);
                        }
                    });

                    (resolve)(filtered);
                });
            } else {
                (reject)('No New Tweets.');
            }
        });
    }

    /**
     * Insert item in DB
     * @param status
     * @returns {Promise}
     */
    function insert(status) {
        return new Promise(function(resolve) {
            _db.collection(config.db.collection).insert(status, function() {
                (resolve)();
            });
        });
    }

    /* Public Methods */
    module.exports = {
        connect: connect,
        check: check,
        insert: insert
    };
})(module);