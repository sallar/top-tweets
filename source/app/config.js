/**
 * @author Sallar Kaboli <sallar.kaboli@gmail.com>
 * @date 8/30/15.
 */
module.exports = {
    // Twitter
    consumerKey:         '',
    consumerSecret:      '',
    accessToken:         '',
    accessTokenSecret:   '',

    // Limitations
    minRetweetCount: 10,
    timezonesFile: 'data/timezones.json',
    usersFile: 'data/users.json',
    stringsFile: 'data/strings.json',

    // Others
    filterKeys: ['id', 'id_str', 'text', 'retweet_count'],
    interval: 60000
};