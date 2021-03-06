const Command = require('./command.js');

let regex = {
    command: new RegExp("^(" + Command.PREFIX + ") ([^ ]*) ?(.*?)"),
    args: new RegExp("^(" + Command.PREFIX + ") ([^ ]*) (.*)")
}

module.exports = {
    prefix: function(message) {
        return message.substr(0,Command.PREFIX.length);
    },
    command: function(message) {
        let match = regex.command.exec(message);
        return match ? match[2] : "";
    },
    args: function (message) {
        let match = regex.args.exec(message);
        return match ? match[3].split(' ') : [];
    }
}
