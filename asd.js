const fetch = require("node-fetch");

let url = "https://api.telegram.org/bot5603085243:AAFAyrax39qiK_yQkG3_S0q2EagrcFeywYg/";
let started = [];

async function getUpdates() {
	try {
		let response = await fetch(url + "getUpdates");
		let json = await response.json();
	
		if (json.result.length == 0) {
			return null;
		};
	
		await fetch(url + "getUpdates?offset=" + ( json.result[json.result.length - 1].update_id + 1 ));
		
		return json.result;
	} catch (err) {
		console.log(err);
	}

}

async function sendMessage(id, text) {
	let response = await fetch(url + "sendMessage" + `?chat_id=${id}&text=${text}`);
	let json = await response.json();

	console.dir(json);
}

function sherzod() {
	getUpdates().then(res => {
		if (!res) return;

		for (let update of res) {
			if (update.message.text == '/start') {
				sendMessage(update.message.chat.id, 'Шерзод?');
				started.push(update.message.chat.id);
				continue;
			}
			
			if (started.find(element => element == update.message.chat.id)) {
				
				if (update.message.text == 'Да') {
					for (let i = 0; i <= 90; i++) {
						sendMessage(update.message.chat.id, 'Чучок');
					}
				}
			}
		}
	});
}

setInterval(sherzod, 3500);
