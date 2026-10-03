
"use client";

import { Globe, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const Navbar = ({ show }: { show: boolean }) => {
  if (!show) return null;

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -30, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-30 w-full border-b border-white/[0.08] bg-[#080810]/75 backdrop-blur-2xl"
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-purple-500/30 via-violet-500/20 to-blue-500/30 shadow-lg shadow-purple-950/30">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <Sparkles
              size={20}
              strokeWidth={1.8}
              className="relative text-white transition-transform duration-300 group-hover:rotate-12"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-white sm:text-xl">
              Vibely
              <span className="text-purple-300">.</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-[0.18em] text-zinc-500 sm:block">
              MEET. CONNECT. REPEAT.
            </span>
          </div>
        </motion.a>

        {/* Center badge */}
        <div className="hidden items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 md:flex">
          <Globe size={14} className="text-purple-300" />
          <span className="text-xs font-medium text-zinc-400">
            Anonymous conversations
          </span>
        </div>

        {/* Right side status */}
        <div className="flex items-center gap-2 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-3 py-2 sm:px-4">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-emerald-300 sm:text-sm">
            Ready to connect
          </span>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;