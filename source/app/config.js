/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/30/15.
 */
module.exports = {
    // Connection Settings
    twitter: {
        consumerKey       : '__CONSUMER_KEY_HERE__',
        consumerSecret    : '__CONSUMER_SECRET_HERE__',
        accessToken       : '__ACCESS_TOKEN_HERE__',
        accessTokenSecret : '__ACCESS_TOKEN_SECRET_HERE__'
    },

    // Search Settings
    search: {
        query : '%20',
        lang  : 'fa',
        count : 100,
        type  : 'mixed'
    },

    // MongoDB Settings
    db: {
        connection: 'mongodb://localhost:27017/twitter',
        collection: 'tweets'
    },

    // Limitations
    minRetweetCount : 10,
    usersFile       : 'data/users.json',
    stringsFile     : 'data/strings.json',
    secondaryCheck  : true,

    // Others
    filterKeys : ['id', 'id_str', 'text', 'retweet_count'],
    interval   : 60000
};