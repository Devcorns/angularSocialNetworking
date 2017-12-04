var Nexmo = require('nexmo');

var nexmo = new Nexmo({
	apiKey: "4bc64eba",
	apiSecret: "5313329e5b958425"
});

function smsController() {
	this.send = function(data, call = null) {
		if("function" == typeof call) {
			call(false, {});
		}
		nexmo.message.sendSms("NEXMO", data.to, data.text, function(err, info) {
			if (err && "function" == typeof call) return call(true, null);
			if("function" == typeof call) return call(false, info.response);
		});
	}
}

exports.default = smsController;