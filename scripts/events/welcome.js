const { getTime, drive } = global.utils;
if (!global.temp.welcomeEvent)
global.temp.welcomeEvent = {};

module.exports = {
config: {
name: "welcome",
version: "1.7",
author: "𝕿𝖍𝖊 𝖁𝖔𝖎𝖉 𝕶𝖚𝖓 クン",
category: "events"
},

langs: {
	en: {
		session1: "𝐦𝐚𝐭𝐢𝐧",
		session2: "𝐦𝐢𝐝𝐢",
		session3: "𝐚𝐩𝐫𝐞̀𝐬-𝐦𝐢𝐝𝐢",
		session4: "𝐬𝐨𝐢𝐫𝐞́𝐞",

		welcomeMessage: `╔════『 👁️ 𝐌𝐀𝐃𝐀𝐑𝐀 𝐎𝐓𝐒𝐔𝐓𝐒𝐔𝐊𝐈 👁️ 』════╗

𝐉𝐞 𝐬𝐮𝐢𝐬 𝐌𝐚𝐝𝐚𝐫𝐚 𝐎𝐭𝐬𝐮𝐭𝐬𝐮𝐤𝐢.

𝐌𝐞𝐫𝐜𝐢 𝐝'𝐚𝐯𝐨𝐢𝐫 𝐢𝐧𝐯𝐨𝐪𝐮𝐞́ 𝐦𝐨𝐧 𝐩𝐨𝐮𝐯𝐨𝐢𝐫 𝐝𝐚𝐧𝐬 𝐜𝐞 𝐠𝐫𝐨𝐮𝐩𝐞.

⚫ 𝐏𝐫𝐞́𝐟𝐢𝐱𝐞 : %1
⚫ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐞𝐬 : %1help

👁️ 𝐐𝐮𝐞 𝐥𝐞 𝐑𝐢𝐧𝐧𝐞𝐠𝐚𝐧 𝐠𝐮𝐢𝐝𝐞 𝐯𝐨𝐭𝐫𝐞 𝐝𝐞𝐬𝐭𝐢𝐧.

╚══════════════════════════════╝`,

		multiple1: "𝐭𝐨𝐢",
		multiple2: "𝐯𝐨𝐮𝐬",

		defaultWelcomeMessage: `╔════『 🌑 𝐍𝐎𝐔𝐕𝐄𝐋 𝐀𝐑𝐑𝐈𝐕𝐀𝐍𝐓 🌑 』════╗

👤 𝐍𝐢𝐧𝐣𝐚 : {userName}

🏯 𝐆𝐫𝐨𝐮𝐩𝐞 : {boxName}

⚔️ 𝐋𝐞 𝐜𝐥𝐚𝐧 𝐔𝐜𝐡𝐢𝐡𝐚 𝐭'𝐚𝐜𝐜𝐮𝐞𝐢𝐥𝐥𝐞.

🌙 𝐏𝐚𝐬𝐬𝐞 𝐮𝐧𝐞 𝐞𝐱𝐜𝐞𝐥𝐥𝐞𝐧𝐭𝐞 {session}.

👁️ 𝐌𝐀𝐃𝐀𝐑𝐀 𝐎𝐓𝐒𝐔𝐓𝐒𝐔𝐊𝐈

╚══════════════════════════════╝`
}
},

onStart: async ({ threadsData, message, event, api, getLang }) => {
	if (event.logMessageType == "log:subscribe")
		return async function () {
			const hours = getTime("HH");
			const { threadID } = event;
			const { nickNameBot } = global.GoatBot.config;
			const prefix = global.utils.getPrefix(threadID);
			const dataAddedParticipants = event.logMessageData.addedParticipants;

			if (dataAddedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) {
				if (nickNameBot)
					api.changeNickname(nickNameBot, threadID, api.getCurrentUserID());
				return message.send(getLang("welcomeMessage", prefix));
			}

			if (!global.temp.welcomeEvent[threadID])
				global.temp.welcomeEvent[threadID] = {
					joinTimeout: null,
					dataAddedParticipants: []
				};

			global.temp.welcomeEvent[threadID].dataAddedParticipants.push(...dataAddedParticipants);

			clearTimeout(global.temp.welcomeEvent[threadID].joinTimeout);

			global.temp.welcomeEvent[threadID].joinTimeout = setTimeout(async function () {
				const threadData = await threadsData.get(threadID);
				if (threadData.settings.sendWelcomeMessage == false)
					return;

				const dataAddedParticipants = global.temp.welcomeEvent[threadID].dataAddedParticipants;
				const dataBanned = threadData.data.banned_ban || [];
				const threadName = threadData.threadName;
				const userName = [],
					mentions = [];
				let multiple = false;

				if (dataAddedParticipants.length > 1)
					multiple = true;

				for (const user of dataAddedParticipants) {
					if (dataBanned.some((item) => item.id == user.userFbId))
						continue;

					userName.push(user.fullName);
					mentions.push({
						tag: user.fullName,
						id: user.userFbId
					});
				}

				if (userName.length == 0)
					return;

				let { welcomeMessage = getLang("defaultWelcomeMessage") } =
					threadData.data;

				const form = {
					mentions: welcomeMessage.match(/\{userNameTag\}/g) ? mentions : null
				};

				welcomeMessage = welcomeMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName.join(", "))
					.replace(/\{boxName\}|\{threadName\}/g, threadName)
					.replace(
						/\{multiple\}/g,
						multiple ? getLang("multiple2") : getLang("multiple1")
					)
					.replace(
						/\{session\}/g,
						hours <= 10
							? getLang("session1")
							: hours <= 12
							? getLang("session2")
							: hours <= 18
							? getLang("session3")
							: getLang("session4")
					);

				form.body = welcomeMessage;

				if (threadData.data.welcomeAttachment) {
					const files = threadData.data.welcomeAttachment;

					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);

					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}

				message.send(form);
				delete global.temp.welcomeEvent[threadID];
			}, 1500);
		};
}

};
