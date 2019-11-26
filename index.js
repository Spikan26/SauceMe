const Discord = require("discord.js");
const Sagiri = require("sagiri");

const handler = new Sagiri(process.env.SAGIRI_TOKEN, {
numRes: 1});


const PREFIX = "sauce.me";

var bot = new Discord.Client();

bot.on("ready", function(){
	console.log("Pewpew")
	bot.user.setActivity("sauce.me");
})


bot.on("message", async message => {
	if (message.author.equals(bot.user)) return;

	if (!message.content.startsWith(PREFIX)) return;

	var args = message.content.substring(PREFIX.length).split(" ");

		//on a un fichier attaché
		if((message.attachments).array() != null){
					var Attachment = (message.attachments).array();
					message.channel.send("Searching...");
					let research = handler.getSauce(Attachment[0].url);
					research.then(function (value) {
						console.log(value[0]);
						message.channel.send({"embed": {
							"title": "[link]",
							"description": "**SITE :** `" + value[0].site + "`",
							"url": value[0].url,
							"color": 3376306,
							"image": {
								"url": value[0].thumbnail
							},
							"footer": {
								"text": "similarity : " + value[0].similarity + "%"
							}
						}})
					})
		//aucun fichier fourni, on test s'il y a un lien
	} else if(args[1] != null){

		message.channel.send("Searching...");
		let research = handler.getSauce(args[1]);
		research.then(function (value) {
			console.log(value[0]);
			message.channel.send({"embed": {
				"title": "[link]",
				"description": "**SITE :** `" + value[0].site + "`",
				"url": value[0].url,
				"color": 3376306,
				"image": {
					"url": value[0].thumbnail
				},
				"footer": {
					"text": "similarity : " + value[0].similarity + "%"
				}
			}})
		})
	} else {
		message.channel.send("No file provided")
	}
})

bot.login(process.env.BOT_TOKEN)
