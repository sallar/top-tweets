/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/27/15.
 */
(function(module) {
    "use strict";

    /* Dependencies */
    var path      = require('path'),
        _         = require('lodash'),
        APP_PATH  = path.resolve(__dirname, '../../'),
        config    = require('../config'),
        timezones = require(APP_PATH + '/' + config.timezonesFile),
        users     = require(APP_PATH + '/' + config.usersFile),
        strings   = require(APP_PATH + '/' + config.stringsFile);

    /* Private Methods */
    /**
     * Filter Statuses
     * @param statuses
     * @returns {Promise}
     */
    function filter(statuses) {
        // Return a new promise
        return new Promise(function(resolve) {
            // Filter Languages, Users & Strings
            statuses = filterRetweeted(statuses);
            statuses = filterLanguages(statuses);
            statuses = filterUsers(statuses);
            statuses = filterStrings(statuses);
            statuses = filterKeys(statuses);

            // Resolve
            (resolve)(statuses);
        });
    }

    /**
     * If a tweet is already retweeted, skip.
     * @param statuses
     * @returns {Array}
     */
    function filterRetweeted(statuses) {
        return statuses.filter(function(status) {
            return (status.retweeted === false && status.retweet_count >= config.minRetweetCount);
        });
    }

    /**
     * Filter statuses array based on language criteria
     * @param statuses
     * @returns {Array}
     */
    function filterLanguages(statuses) {
        return statuses.filter(function(status) {
            return status.user.time_zone in oc(timezones.allowed);
        });
    }

    /**
     * Filter statuses array based on banned users
     * @param statuses
     * @returns {Array}
     */
    function filterUsers(statuses) {
        return statuses.filter(function(status) {
            var len  = users.banned.length,
                id   = status.user.id_str.toLowerCase(),
                name = status.user.screen_name.toLowerCase(),
                reg, curr;

            // Check if id_str or name are banned
            for(var i = 0; i < len; i += 1) {
                curr = users.banned[i].toLowerCase(); // Current name
                reg  = new RegExp('@' + curr, 'i');   // Current name as RegExp

                // If matched, then filter it out.
                if(curr === id || curr === name || reg.test(status.text)) {
                    return false;
                }
            }

            // Add otherwise
            return true;
        });
    }

    /**
     * Filter statuses based on banned strings
     * @param statuses
     * @returns {Array}
     */
    function filterStrings(statuses) {
        return statuses.filter(function(status) {
            var len  = strings.banned.length,
                text = status.text.toLowerCase(),
                reg;

            // Check if id_str or name are banned
            for(var i = 0; i < len; i += 1) {
                reg  = new RegExp(strings.banned[i].toLowerCase(), 'i'); // Current string as RegExp

                // If matched, then filter it out.
                if(reg.test(text)) {
                    return false;
                }
            }

            return true;
        });
    }

    function filterKeys(statuses) {
        for(var i = 0; i < statuses.length; i += 1) {
            statuses[i] = _.pick(statuses[i], config.filterKeys);
            statuses[i].retweeted = false;
        }
        return statuses;
    }

    /**
     * Converts array to object
     * for easier searching
     * @param a {Array}
     * @returns {object}
     */
    function oc(a) {
        var o = {};
        for(var i=0; i<a.length; i+= 1)  {
            o[a[i]]='';
        }
        return o;
    }

    /* Public Methods */
    module.exports = filter;
})(module);