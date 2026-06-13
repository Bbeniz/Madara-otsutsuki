const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		credits: "The VOID KUN クン",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐨𝐠𝐬𝐛𝐨𝐭\n └──────────────────┘\n  \n🩸 𝐞́𝐯𝐞́𝐧𝐞𝐦𝐞𝐧𝐭 : le bot a été invoqué dans un nouveau groupe\n⚔️ 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐚𝐛𝐥𝐞 : %1",
			kicked: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐨𝐠𝐬𝐛𝐨𝐭\n └──────────────────┘\n  \n❌ 𝐞́𝐯𝐞́𝐧𝐞𝐦𝐞𝐧𝐭 : le bot a été expulsé du groupe\n⚔️ 𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐚𝐛𝐥𝐞 : %1",
			footer: "\n👤 𝐮𝐬𝐞𝐫 𝐢𝐝 : %1\n📛 𝐠𝐫𝐨𝐮𝐩𝐞 : %2\n🆔 𝐠𝐫𝐨𝐮𝐩𝐞 𝐢𝐝 : %3\n⏰ 𝐭𝐞𝐦𝐩𝐬 : %4\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},

		en: {
			title: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐨𝐠𝐬𝐛𝐨𝐭\n └──────────────────┘\n  \n🩸 𝐞𝐯𝐞𝐧𝐭 : bot has been added to a new group\n⚔️ 𝐚𝐝𝐝𝐞𝐝 𝐛𝐲 : %1",
			kicked: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐨𝐠𝐬𝐛𝐨𝐭\n └──────────────────┘\n  \n❌ 𝐞𝐯𝐞𝐧𝐭 : bot has been removed from group\n⚔️ 𝐫𝐞𝐦𝐨𝐯𝐞𝐝 𝐛𝐲 : %1",
			footer: "\n👤 𝐮𝐬𝐞𝐫 𝐢𝐝 : %1\n📛 𝐠𝐫𝐨𝐮𝐩 : %2\n🆔 𝐠𝐫𝐨𝐮𝐩 𝐢𝐝 : %3\n⏰ 𝐭𝐢𝐦𝐞 : %4\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {

		if (
			(event.logMessageType == "log:subscribe" &&
				event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" &&
				event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {

			const { author, threadID } = event;

			// ⚔️ ignorer si action faite par le bot lui-même
			if (author == api.getCurrentUserID())
				return;

			let threadName;
			let msg = "";
			const { config } = global.GoatBot;

			// 🩸 cas : ajout du bot
			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;

				threadName = (await api.getThreadInfo(threadID)).threadName;

				const authorName = await usersData.getName(author);
				msg += getLang("title", authorName);
			}

			// ❌ cas : expulsion du bot
			else if (event.logMessageType == "log:unsubscribe") {
				if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID())
					return;

				const authorName = await usersData.getName(author);
				const threadData = await threadsData.get(threadID);

				threadName = threadData.threadName;
				msg += getLang("kicked", authorName);
			}

			// ⏰ horloge du système
			const time = getTime("DD/MM/YYYY HH:mm:ss");
			msg += getLang("footer", author, threadName, threadID, time);

			// 🔮 envoi aux admins sous l'illusion de Madara
			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
