
"use client";

import { Globe, Heart, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-10 w-full overflow-hidden border-t border-white/[0.08] bg-[#080810]"
    >
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute -top-20 left-1/2 h-32 w-72 -translate-x-1/2 rounded-full bg-purple-600/[0.10] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-7 sm:px-8 sm:py-8 lg:px-10">
        {/* Main footer content */}
        <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
          {/* Branding */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
              <Sparkles size={17} className="text-purple-200" />
            </div>

            <div>
              <p className="text-sm font-bold tracking-tight text-white">
                Vibely<span className="text-purple-400">.</span>
              </p>
              <p className="text-[11px] text-zinc-500">
                Meet. Connect. Repeat.
              </p>
            </div>
          </motion.div>

          {/* Tagline */}
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Globe size={14} className="text-purple-300" />
            <span>Anonymous conversations, worldwide.</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] text-zinc-500 sm:text-xs">
            © {new Date().getFullYear()} Vibely. All rights reserved.
          </p>

          <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 sm:text-xs">
            Made with
            <Heart
              size={12}
              className="fill-pink-500 text-pink-500"
            />
            for meaningful connections
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;