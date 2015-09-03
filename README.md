Twitter Top Tweets
===
A simple Node.js/Express/MongoDB app to retweet best tweets written in a specific language.  
This app makes use of `cld` for language detection since Twitter’s language detection is not
trustable and is based on “Best Effort”.  
[Working Example](https://twitter.com/farsi_favorites) (in Persian).  

## Dependencies
* NodeJS 
* MongoDB
* PM2 (from npm)
* Twitter Dev Credentials

## Install
### Install dependecies:
```bash
$ sudo npm install -g pm2
$ npm install
```

### Modify Config
Modify config file in `source/app/config.js` and add your Twitter credentials. 

### Add Data Files
Add to files to data directory: `strings.json` and `users.json` both based on this structure:
```json
{
    "banned": [
        "someUser",
        "someOtherEvilUser",
        "..."
    ]
}
```
Items in `strings.json` file are only matched in tweet text, but items in `users.json` file are 
matched both in tweet text and user’s screen name. (Dont include `@` in screen names).

### Run
```bash
$ cd source/
$ pm2 start search
```

## Tests
To be added.

## License
This software is released under the [MIT License](http://sallar.mit-license.org/).  

    Copyright © 2015 Sallar Kaboli <sallar.kaboli@gmail.com>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the “Software”), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
    