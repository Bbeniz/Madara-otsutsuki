const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		credits: "The VOID KUN クン",
		category: "events"
	},

	langs: {
		vi: {
			session1: "matin",
			session2: "midi",
			session3: "après-midi",
			session4: "soir",
			leaveType1: "𝐚 𝐪𝐮𝐢𝐭𝐭𝐞́ 𝐯𝐨𝐥𝐨𝐧𝐭𝐚𝐢𝐫𝐞𝐦𝐞𝐧𝐭",
			leaveType2: "𝐚 𝐞́𝐭𝐞́ 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐞",
			defaultLeaveMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐞𝐚𝐯𝐞\n └──────────────────┘\n  \n  ☯ {userName} {type} le groupe {threadName}.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},

		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "𝐡𝐚𝐬 𝐥𝐞𝐟𝐭",
			leaveType2: "𝐰𝐚𝐬 𝐤𝐢𝐜𝐤𝐞𝐝 𝐟𝐫𝐨𝐦",
			defaultLeaveMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐞𝐚𝐯𝐞\n └──────────────────┘\n  \n  ☯ {userName} {type} the group {threadName}.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {

		// 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗟𝗘𝗔𝗩𝗘 𝗖𝗢𝗥𝗘
		if (event.logMessageType == "log:unsubscribe")
			return async function () {

				const { threadID } = event;
				const threadData = await threadsData.get(threadID);

				if (!threadData.settings.sendLeaveMessage)
					return;

				const { leftParticipantFbId } = event.logMessageData;

				// ⚔️ Ignorer si c’est le bot
				if (leftParticipantFbId == api.getCurrentUserID())
					return;

				const hours = getTime("HH");
				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// 🔮 Variables système
				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;

				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				// 🩸 Transformation Madara du message
				leaveMessage = leaveMessage
					.replace(/\{userName\}|\{userNameTag\}/g, userName)
					.replace(/\{type\}/g,
						leftParticipantFbId == event.author
							? getLang("leaveType1")
							: getLang("leaveType2")
					)
					.replace(/\{threadName\}|\{boxName\}/g, threadName)
					.replace(/\{time\}/g, hours)
					.replace(/\{session\}/g,
						hours <= 10
							? getLang("session1")
							: hours <= 12
								? getLang("session2")
								: hours <= 18
									? getLang("session3")
									: getLang("session4")
					);

				form.body = leaveMessage;

				// ⚔️ Mention utilisateur
				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				// 🔮 Pièces jointes (drive system)
				if (threadData.data.leaveAttachment) {
					const files = threadData.data.leaveAttachment;

					const attachments = files.reduce((acc, file) => {
						acc.push(drive.getFile(file, "stream"));
						return acc;
					}, []);

					form.attachment = (await Promise.allSettled(attachments))
						.filter(({ status }) => status == "fulfilled")
						.map(({ value }) => value);
				}

				// 👁️‍🗨️ Envoi final sous l'illusion du Tsukuyomi
				message.send(form);
			};
	}
};
