"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Услуги", href: "#services" },
  { label: "Прайс", href: "#pricing" },
  { label: "Процесс", href: "#process" },
  { label: "Контакт", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10,10,11,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(245,245,245,0.06)" : "none",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/assets/logo.png"
            alt="HAZOV VISUALS"
            width={140}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-mono tracking-widest uppercase text-[#8A8A90] hover:text-[#F5F5F5] transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://t.me/hazov_visuals_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-mono tracking-widest uppercase px-4 py-2 border border-[rgba(110,123,255,0.4)] text-[#6E7BFF] hover:bg-[rgba(110,123,255,0.08)] transition-all duration-200"
          >
            Написать
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#F5F5F5] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            style={{ background: "rgba(10,10,11,0.97)", borderTop: "1px solid rgba(245,245,245,0.06)" }}
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-mono tracking-widest uppercase text-[#8A8A90] hover:text-[#F5F5F5] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://t.me/hazov_visuals_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-mono tracking-widest uppercase text-[#6E7BFF]"
              >
                @hazov_visuals
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
