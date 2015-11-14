var fs = require('fs');

module.exports = function() {
    var settings = JSON.parse(fs.readFileSync('src/conf/settings.json', 'utf8'));

    return settings;
};
