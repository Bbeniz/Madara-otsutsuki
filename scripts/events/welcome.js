const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { getTime } = global.utils;

module.exports = {
	config: {
		name: "welcome",
		version: "1.5",
		credits: "The VOID KUN クン",
		category: "events"
	},

	langs: {
		vi: {
			welcomeMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐞𝐥𝐜𝐨𝐦𝐞\n └──────────────────┘\n  \n☯ Bienvenue %1 dans le groupe: %2\n⚔️ Tu es le %3e membre de ce monde de cendres.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},
		en: {
			welcomeMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐞𝐥𝐜𝐨𝐦𝐞\n └──────────────────┘\n  \n☯ Welcome %1 to the group: %2\n⚔️ You are the %3th member of this world of ashes.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		// 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗖𝗢𝗥𝗘
		if (event.logMessageType == "log:subscribe") return async function () {
			
			const { threadID } = event;
			const threadData = await threadsData.get(threadID);

			if (!threadData.settings.sendWelcomeMessage) 
				return;

			const { addedParticipants } = event.logMessageData;

			// ⚔️ Ignorer si c'est le bot lui-même qui rejoint
			if (addedParticipants.some(item => item.userFbId == api.getCurrentUserID())) 
				return;

			const threadName = threadData.threadName;
			const memberCount = (await api.getThreadInfo(threadID)).participantIDs.length;

			for (const participant of addedParticipants) {
				const userID = participant.userFbId;
				const userName = await usersData.getName(userID);

				// 🔮 Configuration du message texte Madara
				const msgText = getLang("welcomeMessage", userName, threadName, memberCount);

				// 🩸 Génération de l'image (Option 1 : API Canvas Externe)
				const cachePath = path.join(__dirname, "cache", `welcome_${userID}.png`);
				fs.ensureDirSync(path.dirname(cachePath));

				// Paramètres de la carte (Thème sombre adapté à Madara)
				const title = encodeURIComponent("WELCOME");
				const description = encodeURIComponent(`Member #${memberCount}`);
				const name = encodeURIComponent(userName);
				const avatar = `https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

				// const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const { getTime } = global.utils;

module.exports = {
	config: {
		name: "welcome",
		version: "1.5",
		credits: "The VOID KUN クン",
		category: "events"
	},

	langs: {
		vi: {
			welcomeMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐞𝐥𝐜𝐨𝐦𝐞\n └──────────────────┘\n  \n☯ Bienvenue %1 dans le groupe: %2\n⚔️ Tu es le %3e membre de ce monde de cendres.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},
		en: {
			welcomeMessage: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗢𝗧𝗦𝗨𝗧𝗦𝗨𝗞𝗜 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐰𝐞𝐥𝐜𝐨𝐦𝐞\n └──────────────────┘\n  \n☯ Welcome %1 to the group: %2\n⚔️ You are the %3th member of this world of ashes.\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶𝘬𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async ({ threadsData, message, event, api, usersData, getLang }) => {
		// 👁️‍🗨️ 𝗠𝗔𝗗𝗔𝗥𝗔 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗖𝗢𝗥𝗘
		if (event.logMessageType == "log:subscribe") return async function () {
			
			const { threadID } = event;
			const threadData = await threadsData.get(threadID);

			if (!threadData.settings.sendWelcomeMessage) 
				return;

			const { addedParticipants } = event.logMessageData;

			// ⚔️ Ignorer si c'est le bot lui-même qui rejoint
			if (addedParticipants.some(item => item.userFbId == api.getCurrentUserID())) 
				return;

			const threadName = threadData.threadName;
			const memberCount = (await api.getThreadInfo(threadID)).participantIDs.length;

			for (const participant of addedParticipants) {
				const userID = participant.userFbId;
				const userName = await usersData.getName(userID);

				// 🔮 Configuration du message texte Madara
				const msgText = getLang("welcomeMessage", userName, threadName, memberCount);

				// 🩸 Génération de l'image (Option 1 : API Canvas Externe)
				const cachePath = path.join(__dirname, "cache", `welcome_${userID}.png`);
				fs.ensureDirSync(path.dirname(cachePath));

				// Paramètres de la carte (Thème sombre adapté à Madara)
				const title = encodeURIComponent("WELCOME");
				const description = encodeURIComponent(`Member #${memberCount}`);
				const name = encodeURIComponent(userName);
				const avatar = `https://graph.facebook.com/${userID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

				// URL de l'API de génération automatique de cartes graphiques
				const canvasUrl = `https://api.popcat.xyz/welcomecard?background=https://i.imgur.com/7gK5Yh4.jpg&text1=${title}&text2=${name}&text3=${description}&avatar=${encodeURIComponent(avatar)}`;

				const form = { body: msgText };

				try {
					const response = await axios({
						method: "GET",
						url: canvasUrl,
						responseType: "stream"
					});

					// Sauvegarde temporaire de l'image générée
					const writer = fs.createWriteStream(cachePath);
					response.data.pipe(writer);

					await new Promise((resolve, reject) => {
						writer.on("finish", resolve);
						writer.on("error", reject);
					});

					// Ajout de la photo au formulaire final
					form.attachment = fs.createReadStream(cachePath);
				} catch (error) {
					console.error("👁️‍🗨️ Erreur lors de la génération de la carte bienvenue:", error);
					// Si l'API échoue, le bot enverra quand même le texte pour ne pas bugger
				}

				// 👁️‍🗨️ Envoi final sous l'illusion du Tsukuyomi
				await api.sendMessage(form, threadID, () => {
					if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
				});
			}
		};
	}
}; de l'API de génération automatique de cartes graphiques
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
					console.error("👁️‍🗨️ Erreur lors de la génération de la carte bienvenue:", error);
					
				}

				
				await api.sendMessage(form, threadID, () => {
					if (fs.existsSync(cachePath)) fs.unlinkSync(cachePath);
				});
			}
		};
	}
};
