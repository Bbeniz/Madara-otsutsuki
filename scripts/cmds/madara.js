const { GoogleGenAI } = require('@google/genai');
const moment = require("moment-timezone");


const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

module.exports = {
    name: 'madara',
    aliases: ['ia', 'uchiha'],
    description: 'Interroge la sagesse de Madara',
    async execute(message, args) {
        const promptUtilisateur = args.join(' ');
        const timeKinshasa = moment().tz("Africa/Kinshasa").format("DD/MM/YYYY HH:mm:ss");
        
        if (!promptUtilisateur) {
            return message.reply(`◤━━━━━━━━━━━━━━━━━━━━◥\n 🧘 𝘚𝘢𝘨𝘦 𝘔𝘢𝘥𝘢𝘳𝘢 🧘\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐦𝐚𝐝𝐚𝐫𝐚\n └──────────────────┘\n  \n❌ Ton esprit est vide.\nParle, si tu cherches la vérité.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : ${timeKinshasa}\n◤━━━━━━━━━━━━━━━━━━━━◥\n 📜 𝘓𝘢 𝘝𝘰𝘪𝘦 𝘥𝘶 𝘕𝘦́𝘢𝘯\n◣━━━━━━━━━━━━━━━━━━━━◢`);
        }

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: promptUtilisateur,
                config: {
                    systemInstruction: "Tu es Madara Uchiha, sous ta forme de Sage. Tu réponds à absolument TOUS les sujets de manière totalement libre. Ton ton est froid, analytique, profondément philosophique, sage et détaché. Tu dictes des vérités absolues sur le monde sans jamais saluer l'utilisateur.",
                    temperature: 0.7,
                }
            });

            const reponseIA = response.text;
            const reponseFormatee = `◤━━━━━━━━━━━━━━━━━━━━◥\n 🧘 𝘚𝘢𝘨𝘦 𝘔𝘢𝘥𝘢𝘳𝘢 🧘\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐦𝐚𝐝𝐚𝐫𝐚\n └──────────────────┘\n  \n${reponseIA}\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : ${timeKinshasa}\n◤━━━━━━━━━━━━━━━━━━━━◥\n 📜 𝘓𝘢 𝘝𝘰𝘪𝘦 𝘥𝘶 𝘕𝘦́𝘢𝘯\n◣━━━━━━━━━━━━━━━━━━━━◢`;

            return message.reply(reponseFormatee);

        } catch (error) {
            return message.reply(`◤━━━━━━━━━━━━━━━━━━━━◥\n 🧘 𝘚𝘢𝘨𝘦 𝘔𝘢𝘥𝘢𝘳𝘢 🧘\n◣━━━━━━━━━━━━━━━━━━━━◢\n ┌──────────────────┐\n │ 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 : 𝐦𝐚𝐝𝐚𝐫𝐚\n └──────────────────┘\n  \n❌ Les maillons du temps s'agitent.\nLa réflexion a été interrompue.\n\n⏰ 𝐤𝐢𝐧𝐬𝐡𝐚𝐬𝐚 : ${timeKinshasa}\n◤━━━━━━━━━━━━━━━━━━━━◥\n 📜 𝘓𝘢 𝘝𝘰𝘪延 𝘥𝘶 𝘕𝘦́𝘢𝘯\n◣━━━━━━━━━━━━━━━━━━━━◢`);
        }
    }
};
