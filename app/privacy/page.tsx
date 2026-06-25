export const metadata = {
  title: "Политика конфиденциальности — HAZOV VISUALS",
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 780, margin: "0 auto", padding: "7rem clamp(20px,4vw,48px) 5rem", color: "#C8C8D0", fontFamily: "system-ui, sans-serif", lineHeight: 1.8 }}>
      <h1 style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)", color: "#F5F5F5", marginBottom: "0.5rem" }}>
        Политика конфиденциальности
      </h1>
      <p style={{ fontSize: 13, color: "#6E7BFF", marginBottom: "3rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.05em" }}>
        Последнее обновление: 25.06.2025
      </p>

      <Section title="1. Общие положения">
        <p>Настоящая политика конфиденциальности регулирует порядок обработки персональных данных пользователей сайта <b>hazovvisuals.ru</b> (далее — Сайт).</p>
        <p>Оператор персональных данных: Хазов Егор Евгеньевич, самозанятый, ИНН 420215034451, г. Москва.</p>
        <p>Используя Сайт, вы соглашаетесь с условиями настоящей политики.</p>
      </Section>

      <Section title="2. Какие данные собираются">
        <p>При взаимодействии с Сайтом могут обрабатываться следующие данные:</p>
        <ul>
          <li>Имя и контактные данные, которые вы указываете при обращении через Telegram-бот</li>
          <li>Данные о браузере и устройстве (тип браузера, операционная система, IP-адрес) — в автоматическом режиме</li>
          <li>Информация о просматриваемых страницах и времени визита</li>
        </ul>
      </Section>

      <Section title="3. Цели обработки данных">
        <ul>
          <li>Обработка запросов и заявок на оказание услуг</li>
          <li>Связь с вами по вопросам сотрудничества</li>
          <li>Улучшение работы Сайта</li>
        </ul>
      </Section>

      <Section title="4. Основания обработки">
        <p>Обработка персональных данных осуществляется на основании вашего согласия (ст. 9 Федерального закона № 152-ФЗ «О персональных данных»).</p>
      </Section>

      <Section title="5. Передача данных третьим лицам">
        <p>Персональные данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством РФ. Переписка ведётся через платформу Telegram (политика конфиденциальности Telegram: <a href="https://telegram.org/privacy" style={{ color: "#6E7BFF" }} target="_blank" rel="noopener noreferrer">telegram.org/privacy</a>).</p>
      </Section>

      <Section title="6. Хранение данных">
        <p>Данные хранятся не дольше, чем это необходимо для целей обработки, либо в течение срока, установленного законодательством.</p>
      </Section>

      <Section title="7. Ваши права">
        <p>В соответствии с 152-ФЗ вы вправе:</p>
        <ul>
          <li>Получить информацию об обработке ваших данных</li>
          <li>Потребовать уточнения, блокирования или уничтожения данных</li>
          <li>Отозвать согласие на обработку данных</li>
        </ul>
        <p>Для реализации прав обратитесь через Telegram: <a href="https://t.me/hazov_visuals" style={{ color: "#6E7BFF" }}>@hazov_visuals</a></p>
      </Section>

      <Section title="8. Cookies">
        <p>Сайт использует файлы cookie для обеспечения корректной работы. Вы можете отключить cookie в настройках браузера, однако это может повлиять на работу Сайта.</p>
      </Section>

      <Section title="9. Изменения политики">
        <p>Оператор вправе вносить изменения в настоящую политику. Актуальная версия всегда доступна на этой странице.</p>
      </Section>

      <Section title="10. Контакты">
        <p>По вопросам обработки персональных данных:<br />
        Telegram: <a href="https://t.me/hazov_visuals" style={{ color: "#6E7BFF" }}>@hazov_visuals</a></p>
      </Section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: "2.5rem" }}>
      <h2 style={{ fontSize: "1rem", color: "#F5F5F5", marginBottom: "0.75rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.05em" }}>
        {title}
      </h2>
      <div style={{ fontSize: 14, display: "flex", flexDirection: "column", gap: 8 }}>
        {children}
      </div>
    </section>
  );
}
