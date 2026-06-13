const { config } = global.GoatBot;
const { writeFileSync } = require("fs-extra");
const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "clans",
		aliases: ["admin", "adm", "cln"],
		version: "1.6",
		credits: "The VOID KUN クン",
		countDown: 5,
		role: 2,
		description: {
			vi: "Thêm, xóa, sửa quyền admin",
			en: "Gérer l'élite et les dirigeants des clans du bot"
		},
		category: "box chat"
	},

	langs: {
		vi: {
			added: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝘵𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n✅ Autorisation suprême accordée à %1 dirigeant(s) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			alreadyAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n⚠️ Possède déjà le contrôle (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingIdAdd: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n❌ Désigne une âme pour diriger le clan.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			removed: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n✅ Pouvoirs destitués pour %1 ancien(s) chef(s) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			notAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n⚠️ Ne possède aucun pouvoir délibérant (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingIdRemove: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n❌ Désigne l'UID à destituer du trône.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			listAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n📜 Dirigeants de l'illusion globale :\n%1\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %2\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},
		en: {
			added: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n✅ Autorisation suprême accordée à %1 dirigeant(s) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			alreadyAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝚜𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n⚠️ Possède déjà le contrôle (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingIdAdd: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝚜𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n❌ Désigne une âme pour diriger le clan.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			removed: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n✅ Pouvoirs destitués pour %1 ancien(s) chef(s) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			notAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n⚠️ Ne possède aucun pouvoir délibérant (%1 utilisateur) :\n%2\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %3\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			missingIdRemove: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝚜𝘶𝘵𝚜𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n❌ Désigne l'UID à destituer du trône.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢",
			listAdmin: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👑 𝘓'𝘌́𝘭𝘪𝒕𝘦 𝘥'𝘖𝘵𝘴𝘶𝘵𝘴𝘶𝘬𝘪 👑\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐜𝐥𝐚𝐧𝐬\n └──────────────────┘\n  \n📜 Dirigeants de l'illusion globale :\n%1\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %2\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝒕𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async function ({ message, args, usersData, event, getLang }) {
		const timeKinshasa = moment().tz("Africa/Kinshasa").format("DD/MM/YYYY HH:mm:ss");
		switch (args[0]) {
			case "add":
			case "-a": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}

					config.adminBot.push(...notAdminIds);
					const getNames = await Promise.all(uids.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(notAdminIds.length > 0 ? getLang("added", notAdminIds.length, getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
						+ (adminIds.length > 0 ? getLang("alreadyAdmin", adminIds.length, adminIds.map(uid => `🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
					);
				}
				else
					return message.reply(getLang("missingIdAdd", timeKinshasa));
			}
			case "remove":
			case "-r": {
				if (args[1]) {
					let uids = [];
					if (Object.keys(event.mentions).length > 0)
						uids = Object.keys(event.mentions);
					else if (event.messageReply)
						uids.push(event.messageReply.senderID);
					else
						uids = args.filter(arg => !isNaN(arg));
					const notAdminIds = [];
					const adminIds = [];
					for (const uid of uids) {
						if (config.adminBot.includes(uid))
							adminIds.push(uid);
						else
							notAdminIds.push(uid);
					}
					for (const uid of adminIds)
						config.adminBot.splice(config.adminBot.indexOf(uid), 1);
					const getNames = await Promise.all(adminIds.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
					writeFileSync(global.client.dirConfig, JSON.stringify(config, null, 2));
					return message.reply(
						(adminIds.length > 0 ? getLang("removed", adminIds.length, getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
						+ (notAdminIds.length > 0 ? getLang("notAdmin", notAdminIds.length, notAdminIds.map(uid => `🆔 𝐮𝐢𝐝 : ${uid}`).join("\n"), timeKinshasa) : "")
					);
				}
				else
					return message.reply(getLang("missingIdRemove", timeKinshasa));
			}
			case "list":
			case "-l": {
				const getNames = await Promise.all(config.adminBot.map(uid => usersData.getName(uid).then(name => ({ uid, name }))));
				return message.reply(getLang("listAdmin", getNames.map(({ uid, name }) => `👤 𝐧𝐚𝐦𝐞 : ${name}\n🆔 𝐮𝐢𝐝 : ${uid}\n──────────────────`).join("\n"), timeKinshasa));
			}
			default:
				return message.SyntaxError();
		}
	}
};
