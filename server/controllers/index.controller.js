var fs = require('fs');
var formidable = require('formidable');

function indexController(){
	this.home = function(req, res){
		res.json({type:false});
	}
	this.imageUpload = function(req, res) {
		var filePath = 'files/'+req.body.path+Date.now()+'.png';
		fs.writeFile('dist/'+filePath, req.body.image, 'base64', function(err){
			if(err) res.status(400).send('File can not be write.');
			res.json({path:filePath});
		});
	}

	this.fileUpload = function(req, res) {
		var form = new formidable.IncomingForm();
		form.parse(req, function (err, fields, files) {			
			let fileName = Date.now()+files.file.name.replace(/[^A-Z0-9.]/ig, "").toLowerCase();
			let path = 'files/'+ ((fields.path) ? fields.path : "") + fileName;
			 fs.readFile(files.file.path, function (err, data) {
				if (err) return res.status(400).json({type:false, msg:err});
				console.log('File read!');
				fs.writeFile('dist/'+path, data, function (err) {
					if (err) res.status(400).json({type:false, msg:err});
					res.json({type:true, msg:"File has been uploaded", data:{path:path, fileName:fileName}});
					console.log('File written!');
				});
				fs.unlink(files.file.path);
			});
		});
	}
}

exports.default = indexController;