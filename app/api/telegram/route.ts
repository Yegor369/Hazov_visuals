import { NextRequest, NextResponse } from "next/server";

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;
const OWNER_CHAT_ID = process.env.TELEGRAM_OWNER_CHAT_ID!;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chat_id: number | string, text: string, extra?: object) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id, text, parse_mode: "HTML", ...extra }),
  });
}

async function answerCallbackQuery(callback_query_id: string) {
  await fetch(`${API}/answerCallbackQuery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ callback_query_id }),
  });
}

const SERVICE_LABELS: Record<string, string> = {
  service_site: "🌐 Сайт",
  service_video: "🎬 Видеопроизводство",
  service_bot: "🤖 Бот / Автоматизация",
};

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // — Команда /start
    if (update.message?.text === "/start") {
      const { chat, from } = update.message;
      const name = from.first_name || "друг";

      await sendMessage(
        chat.id,
        `Привет, <b>${name}</b>! 👋\n\nЯ помогу тебе оставить заявку на услуги <b>HAZOV VISUALS</b>.\n\nЧто тебя интересует?`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: "🌐 Сайт", callback_data: "service_site" }],
              [{ text: "🎬 Видеопроизводство", callback_data: "service_video" }],
              [{ text: "🤖 Бот / Автоматизация", callback_data: "service_bot" }],
            ],
          },
        }
      );
      return NextResponse.json({ ok: true });
    }

    // — Нажатие кнопки услуги
    if (update.callback_query) {
      const { id, data, message } = update.callback_query;
      await answerCallbackQuery(id);

      if (data && data.startsWith("service_")) {
        const label = SERVICE_LABELS[data] ?? data;
        await sendMessage(
          message.chat.id,
          `Отлично, ты выбрал <b>${label}</b>! ✅\n\nОтправь своё <b>имя и номер телефона</b> одним сообщением.\n\n<i>Пример: Иван, +79001234567</i>`,
          { reply_markup: { force_reply: true, selective: true } }
        );
      }
      return NextResponse.json({ ok: true });
    }

    // — Обычное сообщение (ответ с именем и телефоном)
    if (update.message?.text && update.message.text !== "/start") {
      const { chat, from, text, reply_to_message } = update.message;

      // Проверяем — это ответ на наш запрос контактов
      const isLeadReply =
        reply_to_message?.text?.includes("имя и номер телефона") ||
        reply_to_message?.text?.includes("Пример: Иван");

      if (isLeadReply) {
        const userName = from.first_name
          ? `${from.first_name}${from.last_name ? " " + from.last_name : ""}`
          : "Неизвестно";
        const tgUsername = from.username ? `@${from.username}` : "нет username";

        // Узнаём услугу из предыдущего сообщения (если есть)
        let service = "не указана";
        for (const [key, label] of Object.entries(SERVICE_LABELS)) {
          if (reply_to_message?.text?.includes(label)) {
            service = label;
            break;
          }
        }

        // Уведомление владельцу
        await sendMessage(
          OWNER_CHAT_ID,
          `🔥 <b>Новая заявка!</b>\n\n` +
            `👤 Имя в TG: ${userName} (${tgUsername})\n` +
            `💬 Написал: ${text}\n` +
            `📌 Услуга: ${service}\n` +
            `🆔 chat_id: ${chat.id}`
        );

        // Подтверждение клиенту
        await sendMessage(
          chat.id,
          `✅ Заявка принята! Свяжусь с тобой в ближайшее время.\n\nПока можешь посмотреть наши работы: <a href="https://t.me/hazov_visuals">@hazov_visuals</a>`
        );
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
