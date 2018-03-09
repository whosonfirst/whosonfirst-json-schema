/* jshint esversion: 6 */

var fs = require('fs');
var path = require('path');

function DirectoryWalker() {
    this._win32 = (process.platform === 'win32');
}

DirectoryWalker.prototype._unixifyPath = function(file_path) {
    if (this._win32) {
        return file_path.replace(/\\/g, '/');
    }
    return file_path;
};

DirectoryWalker.prototype.walk = function(root_dir, callback, sub_dir) {
    var abs_path = sub_dir ? path.join(root_dir, sub_dir) :  root_dir;
    var self = this;
    fs.readdirSync(abs_path).forEach(function(file_name) {
        var file_path = path.join(abs_path, file_name);
        if (fs.statSync(file_path).isDirectory()) {
            self.walk(root_dir, callback, self._unixifyPath(path.join(sub_dir  || '', file_name || '')));
        }
        else {
            callback(self._unixifyPath(file_path), root_dir, sub_dir, file_name);
        }
    });
};

module.exports = DirectoryWalker;
