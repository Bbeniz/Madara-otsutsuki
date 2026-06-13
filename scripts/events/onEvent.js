const allOnEvent = global.GoatBot.onEvent;

module.exports = {
	config: {
		name: "onEvent",
		version: "1.1",
		author: "𝕿𝖍𝖊 𝖁𝖔𝖎𝖉 𝕶𝖚𝖓 クン",
		description: "𝐒𝐲𝐬𝐭𝐞𝐦 𝐌𝐚𝐝𝐚𝐫𝐚 — boucle qui exécute tous les événements enregistrés dans global.GoatBot.onEvent lorsqu’un nouvel événement est détecté",
		category: "events"
	},

	onStart: async ({
		api,
		args,
		message,
		event,
		threadsData,
		usersData,
		dashBoardData,
		threadModel,
		userModel,
		dashBoardModel,
		role,
		commandName
	}) => {

		
		for (const item of allOnEvent) {

			if (typeof item === "string") continue;

			item.onStart({
				api,
				args,
				message,
				event,
				threadsData,
				usersData,
				threadModel,
				dashBoardData,
				userModel,
				dashBoardModel,
				role,
				commandName
			});
		}
	}
};
