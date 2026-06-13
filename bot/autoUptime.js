const axios = require('axios');
const { config } = global.GoatBot;
const { log, getText } = global.utils;

if (global.timeOutUptime != undefined)
	clearTimeout(global.timeOutUptime);
if (!config.autoUptime.enable)
	return;

const PORT = config.dashBoard?.port || (!isNaN(config.serverUptime.port) && config.serverUptime.port) || 3001;

let myUrl = config.autoUptime.url || `https://${process.env.REPL_OWNER
	? `${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
	: process.env.API_SERVER_EXTERNAL == "https://api.glitch.com"
		? `${process.env.PROJECT_DOMAIN}.glitch.me`
		: `localhost:${PORT}`}`;
myUrl.includes('localhost') && (myUrl = myUrl.replace('https', 'http'));
myUrl += '/uptime';

let status = '𝐨𝐤';
setTimeout(async function autoUptime() {
	try {
		await axios.get(myUrl);
		if (status != '𝐨𝐤') {
			status = '𝐨𝐤';
			log.info("𝐔𝐏𝐓𝐈𝐌𝐄", "𝐋𝐞 𝐁𝐨𝐭 𝐞𝐬𝐭 𝐝é𝐬𝐨𝐫𝐦𝐚𝐢𝐬 𝐞𝐧 𝐥𝐢𝐠𝐧𝐞, 𝐩𝐫ê𝐭 𝐚̀ 𝐜𝐨𝐦𝐛𝐚𝐭𝐭𝐫𝐞.");
		}
	}
	catch (e) {
		const err = e.response?.data || e;
		if (status != '𝐨𝐤')
			return;
		status = '𝐟𝐚𝐢𝐥𝐞𝐝';

		if (err.statusAccountBot == "𝐜𝐚𝐧'𝐭 𝐥𝐨𝐠𝐢𝐧") {
			log.err("𝐔𝐏𝐓𝐈𝐌𝐄", "𝐋'𝐚𝐜𝐜è𝐬 𝐚𝐮 𝐜𝐨𝐦𝐩𝐭𝐞 𝐞𝐬𝐭 𝐢𝐦𝐩𝐨𝐬𝐬𝐢𝐛𝐥𝐞. 𝐋𝐞 𝐬𝐜𝐞𝐥𝐥𝐞𝐦𝐞𝐧𝐭 𝐚 éch𝐨𝐮é.");
		}
		else if (err.statusAccountBot == "𝐛𝐥𝐨𝐜𝐤 𝐬𝐩𝐚𝐦") {
			log.err("𝐔𝐏𝐓𝐈𝐌𝐄", "𝐕𝐨𝐭𝐫𝐞 𝐜𝐨𝐦𝐩𝐭𝐞 𝐞𝐬𝐭 𝐛𝐥𝐨𝐪𝐮é 𝐩𝐚𝐫 𝐥'𝐞𝐧𝐧𝐞𝐦𝐢. 𝐒𝐮𝐫𝐯𝐞𝐢𝐥𝐥𝐞𝐳 𝐥𝐞𝐬 𝐫𝐞𝐬𝐭𝐫𝐢𝐜𝐭𝐢𝐨𝐧𝐬.");
		}
	}
	global.timeOutUptime = setInterval(autoUptime, config.autoUptime.timeInterval);
}, (config.autoUptime.timeInterval || 180) * 1000);

log.info("𝐀𝐔𝐓𝐎 𝐔𝐏𝐓𝐈𝐌𝐄", getText("𝐚𝐮𝐭𝐨𝐔𝐩𝐭𝐢𝐦𝐞", "𝐚𝐮𝐭𝐨𝐔𝐩𝐭𝐢𝐦𝐞𝐓𝐮𝐫𝐧𝐞𝐝𝐎𝐧", myUrl));
