var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose.connect("mongodb://localhost/learningUser");
var db = mongoose.connection;
db.on('error', function(error) {
    console.log(error);
});
var schema = new Schema({
	_id: Number,
    _set: Number,
    comment: String,
    question: String,
    sound_a: String,
    language_a: String,
    part_a: String,
    font_a: String,
    sound_b: String,
    language_b: String,
    part_b: String,
    font_b: String,
    part_c: String,
    font_c: String
});

var leModel = mongoose.model('letter_number_match', schema);
var xlsx = require("node-xlsx");
var name = path.dirname(__dirname);
var obj = xlsx.parse(name + "/app/excel/LETTER_NUMBER_MATCH.xlsx");
//var audio_path = name + "/app/audio/F1_0000.mp3";
var data = obj[0].data;
var i = 1;


exports.init = function(req, res) {
	var set_tmp = 0;
	var comment_tmp = "dsa";
	while (i < data.length) {
		if (data[i][2] == 0) {
			set_tmp = data[i][0];
			comment_tmp = data[i][1];
		}
		var _set_tmp = set_tmp;
		var comment_tmp = comment_tmp;
		var list = new leModel({
			_id: i,
		    _set: _set_tmp,
		    comment: comment_tmp,
		    question: data[i][2],
		    sound_a: data[i][3],
		    language_a: data[i][4],
		    part_a: data[i][5],
		    font_a: data[i][6],
		    sound_b: data[i][7],
		    language_b: data[i][8],
		    part_b: data[i][9],
		    font_b: data[i][10],
		    part_c: data[i][11],
		    font_c: data[i][12]
		});
		list.save();
		i++;
	}
	res.redirect("/");
	
};

exports.del = function(req, res) {
	var i = 1;
	while (i < data.length) {
		var cond = {language_a: data[i][4]};
		leModel.remove(cond, function(err, res) {
			if (err) {
				console.log(err);
			}
		});
		i++;
	}
	res.redirect("/");
};

exports.open = function(req, res) {
	leModel.find().sort({'_id': 1}).exec(function(err, list) {
		/*if (req.session.user)
			res.render("letter_number_match.jade", {title: "LETTER_NUMBER_MATCH", lists: list});
		else
			res.redirect('/login');*/
		res.json(list);
	});
};