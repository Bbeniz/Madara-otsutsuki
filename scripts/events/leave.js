const { getTime, drive } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.4",
		author: "𝕿𝖍𝖊 𝖁𝖔𝖎𝖉 𝕶𝖚𝖓 クン",
		category: "events"
	},

	langs: {
		vi: {
			session1: "matin",
			session2: "midi",
			session3: "après-midi",
			session4: "soir",
			leaveType1: "a quitté volontairement",
			leaveType2: "a été expulsé de",
			defaultLeaveMessage: "☯ {userName} {type} le groupe"
		},

		en: {
			session1: "morning",
			session2: "noon",
			session3: "afternoon",
			session4: "evening",
			leaveType1: "has left",
			leaveType2: "was kicked from",
			defaultLeaveMessage: "☯ {userName} {type} the group"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {

		// 🩸 𝐌𝐀𝐃𝐀𝐑𝐀 𝐋𝐄𝐀𝐕𝐄 𝐂𝐎𝐑𝐄
		if (event.logMessageType == "log:unsubscribe")
			return async function () {

				const { threadID } = event;
				const threadData = await threadsData.get(threadID);

				if (!threadData.settings.sendLeaveMessage)
					return;

				const { leftParticipantFbId } = event.logMessageData;

				// ⚔️ ignorer si c’est le bot
				if (leftParticipantFbId == api.getCurrentUserID())
					return;

				const hours = getTime("HH");
				const threadName = threadData.threadName;
				const userName = await usersData.getName(leftParticipantFbId);

				// ☯ variables système
				let { leaveMessage = getLang("defaultLeaveMessage") } = threadData.data;

				const form = {
					mentions: leaveMessage.match(/\{userNameTag\}/g) ? [{
						tag: userName,
						id: leftParticipantFbId
					}] : null
				};

				// 🩸 transformation Madara du message
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

				// ⚔️ mention utilisateur
				if (leaveMessage.includes("{userNameTag}")) {
					form.mentions = [{
						id: leftParticipantFbId,
						tag: userName
					}];
				}

				// 🩸 pièces jointes (drive system)
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

				// ☯ envoi final
				message.send(form);
			};
	}
};
