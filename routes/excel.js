var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var xlsx = require('node-xlsx');
var fs = require('fs');


exports.open = function(req, res, next) {
// write
	var type = req.body.select;
	var data;
	//if (req.body.select == 'interactive')
	switch(type) {
		case "narra":
			data = [['Set', 'Random order?', 'Slide', 'Review?', 'Q=ti,A=v', 'Q=tv,A=i', 'Q=iv,A=t', 'Q=v,A=ti', 'Q=i,A=tv',
				'Q=t,A=iv', 'Q=t,A=i', 'Q=t,A=v', 'Q=v,A=t', 'Q=v,A=i',	'Q=i,A=t', 'Q=i,A=v', 'Image filename', 
				'Multiple choice?', 'Auto-play?', 'Disable audio prompt?', 'Enable emphasis?']];
			break;
		case "agbb":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II',
			 	'B alternative III', 'B_font',	'Language',	'Speaker']];
			break;
		case "agbc":
			data = [['Set',	'Comment', 'Question', 'A', 'A_font', 'Language', 'Speaker', 'B', 'B alternative I', 'B alternative II', 'B_font',
				'Language', 'Speaker']];
			break;
		case "acbg":
			data = [['Set',	'Comment', 'Question', 'A',	'A alternative I', 'A alternative II', 'A_font', 'Language', 'Speaker', 'B', 'B_font',
				'Language',	'Speaker']];
			break;
		case "unscr":
			data = [['Set',	'Comment', 'Question', 'TOP', 'BOTTOM',	'1_font', 'Language', 'Speaker', 'U1', 'U2', 'U3', 'U4', 'U5', 'U6',
				'U7', 'U8', 'U9', '2_font',	'Language', 'Speaker']];
			break;
		case "l_n_m":
			data = [['Set',	'Comment', 'Question', 'A',	'A_font', 'Language', 'Speaker', 'B', 'B_font',	'C', 'C_font', 'Language', 
				'Speaker']];
			break;
		case "multichoice":
			data = [['Set',	'Comment', 'Question', 'MAIN SENTENCE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'A_font', 'Language',
				'Speaker']];
			break;
		case "muc":
			data = [['Set', 'Comment', 'Question', 'GIVEN', '1_font', 'Language', 'Speaker', 'DESIRED', 'PIECE-01', 'PIECE-02',	'PIECE-03',
				'PIECE-04',	'PIECE-05',	'PIECE-06',	'PIECE-07', 'PIECE-08', '2_font', 'Language', 'Speaker']];
			break;
	}
	var buffer = xlsx.build([{name: "mySheetName", data: data}]);
	fs.writeFileSync('C:/Users/Sauce/Desktop/' + type + '.xlsx', buffer, 'binary');
	res.send('export successfully!');
};

/*exports.upload = function(req, res) {
	
	var	formidable = require('formidable'), 
		AVATAR_UPLOAD_FOLDER = '/avatar/';

	var form = new formidable.IncomingForm();   //创建上传表单
		form.encoding = 'utf-8';		//设置编辑
	    form.uploadDir = 'app/excel';	 //设置上传目录
	    form.keepExtensions = true;	 //保留后缀
	    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function(err, fields, files) {
	    var extName = '';  //后缀名

	    var avatarName = Math.random() + '.xlsx';
	    var newPath = form.uploadDir + avatarName;

	    console.log(newPath);
	    fs.renameSync(files.fulAvatar.path, newPath);  //重命名
    });

	//res.locals.success = '上传成功';
	res.send('上传成功！');	 
} */
