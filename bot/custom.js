const { log } = global.utils;

module.exports = async function ({ api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData, getText }) {
	// 𝐋'𝐨𝐦𝐛𝐫𝐞 𝐝𝐮 𝐑𝐢𝐧𝐧𝐞𝐠𝐚𝐧 𝐬'é𝐭𝐞𝐧𝐝 𝐬𝐮𝐫 𝐥𝐞 𝐬𝐲𝐬𝐭è𝐦𝐞 𝐩𝐨𝐮𝐫 𝐦𝐚𝐢𝐧𝐭𝐞𝐧𝐢𝐫 𝐥'é𝐪𝐮𝐢𝐥𝐢𝐛𝐫𝐞.

	setInterval(async () => {
		api.refreshFb_dtsg()
			.then(() => {
				log.succes("𝐒𝐜𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐝𝐮 𝐅𝐥𝐮𝐱", getText("custom", "𝐫𝐞𝐟𝐫𝐞𝐬𝐡𝐞𝐝𝐅𝐛_𝐝𝐭𝐬𝐠"));
			})
			.catch((err) => {
				log.error("𝐄𝐫𝐫𝐞𝐮𝐫 𝐝𝐞 𝐥'𝐈𝐧𝐯𝐨𝐜𝐚𝐭𝐢𝐨𝐧", getText("custom", "𝐫𝐞𝐟𝐫𝐞𝐬𝐡𝐞𝐝𝐅𝐛_𝐝𝐭𝐬𝐠𝐄𝐫𝐫𝐨𝐫"), err);
			});
	}, 1000 * 60 * 60 * 48); // 𝐋𝐞 𝐜𝐲𝐜𝐥𝐞 𝐝𝐞 𝟒𝟖 𝐡𝐞𝐮𝐫𝐞𝐬 𝐞𝐬𝐭 𝐟𝐢𝐱é 𝐝𝐚𝐧𝐬 𝐥𝐞 𝐭𝐞𝐦𝐩𝐬.
};
