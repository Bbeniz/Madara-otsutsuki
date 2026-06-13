const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { getTime } = global.utils;

module.exports = {
	config: {
		name: "leave",
		version: "1.5",
		credits: "The VOID KUN クン",
		category: "events"
	},

	langs: {
		vi: {
			leaveType1: "𝐚 𝐪𝐮𝐢𝐭𝐭𝐞́ 𝐯𝐨𝐥𝐨𝐧𝐭𝐚𝐢𝐫𝐞𝐦𝐞𝐧𝐭",
			leaveType2: "𝐚 𝐞́𝐭𝐞́ 𝐞𝐱𝐩𝐮𝐥𝐬𝐞́ 𝐝𝐞",
			leaveMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐞𝐚𝐯𝐞\n └──────────────────┘\n  \n  ☯ {userName} {type} ce monde de cendres.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},

		en: {
			leaveType1: "𝐡𝐚𝐬 𝐥𝐞𝐟𝐭",
			leaveType2: "𝐰𝐚𝐬 𝐤𝐢𝐜𝐤𝐞𝐝 𝐟𝐫𝐨𝐦",
			leaveMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐥𝐞𝐚𝐯𝐞\n └──────────────────┘\n  \n  ☯ {userName} {type} this world of ashes.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		// 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗟𝗘𝗔𝗩𝗘 𝗖𝗢𝗥𝗘
		if (event.logMessageType == "log:unsubscribe") return async function () {

			const { threadID } = event;
			const threadData = await threadsData.get(threadID);

			if (!threadData.settings.sendLeaveMessage)
				return;

			const { leftParticipantFbId } = event.logMessageData;

			// ⚔️ Ignorer si c’est le bot lui-même qui part
			if (leftParticipantFbId == api.getCurrentUserID())
				return;

			const memberCount = (await api.getThreadInfo(threadID)).participantIDs.length;
			const userName = await usersData.getName(leftParticipantFbId);

			// 🔮 Configuration du type de départ et message
			const typeLeave = leftParticipantFbId == event.author ? getLang("leaveType1") : getLang("leaveType2");
			let msgText = getLang("leaveMessage")
				.replace(/\{userName\}/g, userName)
				.replace(/\{type\}/g, typeLeave);

			// 🩸 Génération de l'image de départ (Option 1 : API Canvas Externe)
			const cachePath = path.join(__dirname, "cache", `leave_${leftParticipantFbId}.png`);
			fs.ensureDirSync(path.dirname(cachePath));

			const title = encodeURIComponent("GOOD BYE");
			const description = encodeURIComponent(`Members left: ${memberCount}`);
			const name = encodeURIComponent(userName);
			const avatar = `https://graph.facebook.com/${leftParticipantFbId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

			// URL de l'API avec un fond sombre style Madara (7gK5Yh4.jpg)
			const canvasUrl = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/7gK5Yh4.jpg&text1=${title}&text2=${name}&text3=${description}&avatar=${encodeURIComponent(avatar)}`;

			const form = { body: msgText };

			try {
				const response = await axios({
					method: "GET",
					url: canvasUrl,
					responseType: "stream"
				});

				const writer = fs.createWriteStream(cachePath);
				response.data.pipe(writer);

				await new Promise((resolve, reject) => {
					writer.on("finish", resolve);
					writer.on("error", reject);
				});

				form.attachment = fs.createReadStream(cachePath);
			} catch (error) {
				console.error("👁️‍🗨️ Erreur lors de la génération de la carte leave:", error);
			}

			// 👁️‍🗨️ Envoi final sous l'illusion du Tsukuyomi
			await api.sendMessage(form, threadID, () => {
				if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
			});
		};
	}
};
