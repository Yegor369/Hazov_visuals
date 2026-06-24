# HAZOV VISUALS — сайт-витрина

## Как запустить

```bash
npm install
npm run dev
```

Открой http://localhost:3000

## Что сделано

- Hero с голографической 3D-планетой из 15 фото + founder.jpg
- Локальные грозы на поверхности планеты (дождь + молнии по таймеру)
- Летящий поток фотографий вокруг планеты (founder.jpg — крупнее, дольше)
- Секции: Услуги → Прайс → Как работаем → Контакт → Футер
- Мобильная версия: меньше частиц, упрощённая сцена, capped pixel ratio
- prefers-reduced-motion: статичный градиентный шар вместо анимации
- Lazy-load 3D (dynamic import, ssr:false) с fallback-заставкой

## Что подставить позже

1. Telegram deep-link параметры — в components/ServicesSection.tsx ищи комментарии
   "DECISION: позже ?start=..." и замени на ?start=sites / ?start=video / ?start=bots
2. Имя основателя — в ContactSection.tsx при желании

## Структура

```
app/
  layout.tsx         — root layout, метаданные
  page.tsx           — главная, собирает все секции
  globals.css        — переменные цветов, шрифты

components/
  Navbar.tsx         — фиксированный навбар + мобильное меню
  HeroSection.tsx    — hero с lazy-load 3D
  PlanetScene.tsx    — 3D-сцена (планета, грозы, летящие фото)
  ServicesSection.tsx
  PricingSection.tsx
  ProcessSection.tsx
  ContactSection.tsx
  Footer.tsx

public/assets/
  logo.png           — логотип (навбар, футер)
  logo-mark.png      — квадратный знак HY (favicon)
  photos/            — 01.jpg-15.jpg + founder.jpg
```
