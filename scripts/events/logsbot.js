const { getTime } = global.utils;

module.exports = {
	config: {
		name: "logsbot",
		isBot: true,
		version: "1.4",
		author: "𝕿𝖍𝖊 𝖁𝖔𝖎𝖉 𝕶𝖚𝖓 クン",
		envConfig: {
			allow: true
		},
		category: "events"
	},

	langs: {
		vi: {
			title: "☯ 𝐋𝐎𝐆 𝐒𝐘𝐒𝐓𝐄𝐌 𝐌𝐀𝐃𝐀𝐑𝐀 ☯",
			added: "\n🩸 Événement : le bot a été invoqué dans un nouveau groupe\n⚔️ Responsable : %1",
			kicked: "\n❌ Événement : le bot a été expulsé du groupe\n⚔️ Responsable : %1",
			footer: "\n━━━━━━━━━━━━━━\n👤 ID utilisateur : %1\n📛 Groupe : %2\n🆔 ID groupe : %3\n⏰ Temps : %4"
		},

		en: {
			title: "☯ MADARA LOG SYSTEM ☯",
			added: "\n🩸 Event: bot has been added to a new group\n⚔️ Added by: %1",
			kicked: "\n❌ Event: bot has been removed from group\n⚔️ Removed by: %1",
			footer: "\n━━━━━━━━━━━━━━\n👤 User ID: %1\n📛 Group: %2\n🆔 Group ID: %3\n⏰ Time: %4"
		}
	},

	onStart: async ({ usersData, threadsData, event, api, getLang }) => {

		
		if (
			(event.logMessageType == "log:subscribe" &&
				event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
			|| (event.logMessageType == "log:unsubscribe" &&
				event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
		) return async function () {

			let msg = getLang("title");
			const { author, threadID } = event;

			// ⚔️ ignorer si action faite par le bot lui-même
			if (author == api.getCurrentUserID())
				return;

			let threadName;
			const { config } = global.GoatBot;

			// 🩸 cas : ajout du bot
			if (event.logMessageType == "log:subscribe") {
				if (!event.logMessageData.addedParticipants.some(item => item.userFbId == api.getCurrentUserID()))
					return;

				threadName = (await api.getThreadInfo(threadID)).threadName;

				const authorName = await usersData.getName(author);
				msg += getLang("added", authorName);
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

			// ☯ envoi aux admins
			for (const adminID of config.adminBot)
				api.sendMessage(msg, adminID);
		};
	}
};
