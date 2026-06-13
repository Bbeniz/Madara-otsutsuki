const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "ytb",
		version: "1.13",
		credits: "The VOID KUN クン",
		countDown: 5,
		role: 0,
		shortDescription: "YouTube",
		longDescription: {
			vi: "Tải video, audio hoặc xem thông tin video trên YouTube",
			en: "Télécharger des vidéos, audios ou voir les détails YouTube"
		},
		category: "media",
		guide: {
			vi: "   {pn} [video|-v] [<tên video>|<link video>]",
			en: "   {pn} [video|-v] [<nom>|<lien>]"
		}
	},

	langs: {
		vi: {
			maintenance: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝘙𝘪𝘯𝘯𝘦𝘨𝘢𝘯 𝘚𝘦𝘢𝘳𝘤𝘩 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐲𝐭𝐛\n └──────────────────┘\n  \n🛠️ Le flux du Rinnegan est perturbé.\nCette commande est actuellement en maintenance technique.\n\n⏳ Réessaye plus tard.\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		},
		en: {
			maintenance: "◤━━━━━━━━━━━━━━━━━━━━◥\n 👁️‍🗨️ 𝘙𝘪𝘯𝘯𝘦𝘨𝘢𝘯 𝘚𝘦𝘢𝘳𝘤𝘩 👁️‍🗨️\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐲𝐭𝐛\n └──────────────────┘\n  \n🛠️ Le flux du Rinnegan est perturbé.\nCette commande est actuellement en maintenance technique.\n\n⏳ Réessaye plus tard.\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : %1\n\n◤━━━━━━━━━━━━━━━━━━━━◥\n 🔮 𝘛𝘴𝘶κ𝘶𝘺𝘰𝘮𝘪 𝘐𝘯𝘧𝘪𝘯𝘪 𝘢𝘤𝘵𝘪𝘧\n◣━━━━━━━━━━━━━━━━━━━━◢"
		}
	},

	onStart: async function ({ message, getLang }) {
		const timeKinshasa = moment().tz("Africa/Kinshasa").format("DD/MM/YYYY HH:mm:ss");
		return message.reply(getLang("maintenance", timeKinshasa));
	}
};
