var gridfs = require('gridfs-stream');
var mongoose = require('mongoose');

function GirdFsStorageEngine(opts){
  this.gfs=opts.gfs;
};

GirdFsStorageEngine.prototype._handleFile = function _handleFile(req,file,cb){
  
}
