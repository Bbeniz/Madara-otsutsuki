const { writeFileSync } = require("fs-extra");
const { config } = global.GoatBot;
const { client } = global;
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "whitelist",
		aliases: ["wlonly", "onlywlst", "onlywhitelist", "wl"],
		version: "1.5",
		credits: "The VOID KUN クン",
		countDown: 5,
		role: 0,
		description: {
			en: "Gérer la liste blanche du bot"
		},
		category: "owner",
		guide: {
			en: '   {pn} [add | -a] <uid | @tag>'
		}
	},

	langs: {
		en: {
			added: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n✅ %1 âme(s) ajoutée(s) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			alreadyAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n⚠️ Déjà présent (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingAdd: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n❌ Spécifie un UID pour l'accès.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			removed: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n✅ %1 âme(s) bannie(s) de la liste :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			notAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n⚠️ Absent de la liste (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingIdRemove: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n❌ Spécifie un UID à destituer.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			listAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n📜 Membres approuvés :\n%1\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %2\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			turnedOn: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n🔒 Liste blanche activée.\nSeuls les élus peuvent m'invoquer.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			turnedOff: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n🔓 Liste blanche désactivée.\nTous les mortels ont accès au bot.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			turnedOnNoti: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝘩𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n🔔 Notifications activées pour les intrus hors liste blanche.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			turnedOffNoti: "◤━━━━━━━━━━━━━━━━━━━━◥\n 🛡️ 𝘓'𝘖𝘳𝘥𝘳𝘦 𝘥'𝘜𝘤𝚑𝘪𝘩𝘢 🛡️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐡𝐢𝐭𝐞𝐥𝐢𝐬𝐭\n └──────────────────┘\n  \n🔕 Notifications désactivées pour les intrus hors liste blanche.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang, api }) {
		const permission = global.GoatBot.config.adminBot;
		const timeKinshasa = moment().tz("Africa/Kinshasa").format("DD/MM/YYYY HH:mm:ss");
		
		if (!permission.includes(event.senderID)) {
			api.sendMessage(args.join(" "), event.threadID, event.messageID);
			return;
		}
		
		switch (args[0]) {
			case "add":
			case "-a":
			case "+": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const authorIds = [];
					for (const uid of uids) {
						if (config.whiteListMode.whiteListIds.includes(uid))
							authorIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.whiteListMode.whiteListIds.push(...notAdminIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
						+ (authorIds.length > 0 ? getLang("alreadyAdmin", authorIds.length, authorIds.map(uid => `🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
					);
				}
				else
					return message.reply(getLang("missingAdd", timeKinshasa));
			}
			case "remove":
			case "rm":
			case "-r":
			case "-": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const authorIds = [];
					for (const uid of uids) {
						if (config.whiteListMode.whiteListIds.includes(uid))
							authorIds.push(uid);
						else
							notAdminIds.push(uid);
					}
					for (const uid of authorIds)
						config.whiteListMode.whiteListIds.splice(config.whiteListMode.whiteListIds.indexOf(uid), 1);
					const getNames = await Promise.all(authorIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(authorIds.length > 0 ? getLang("removed", authorIds.length, getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
						+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove", timeKinshasa));
			}
			case "list":
			case "-l": {
				const getNames = await Promise.all(config.whiteListMode.whiteListIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}\n──────────────────`).join("\n"), timeKinshasa));
			}
			case "m":
			case "mode":
			case "-m": {
					let isSetNoti = false;
					let value;
					let indexGetVal = 1;

					if (args[1] == "noti") {
						isSetNoti = true;
						indexGetVal = 2;
					}

					if (args[indexGetVal] == "on")
						value = true;
					else if (args[indexGetVal] == "off")
						value = false;
					if (isSetNoti) {
						config.hideNotiMessage.whiteListMode = !value;
						message.reply(getLang(value ? "turnedOnNoti" : "turnedOffNoti", timeKinshasa));
					}
					else {
						config.whiteListMode.enable = value;
						message.reply(getLang(value ? "turnedOn" : "turnedOff", timeKinshasa));
					}

					writeFileSync(client.dirConfig, JSON.stringify(config, null, 2));
			}
			default:
		}
	}
};
