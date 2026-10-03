
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VideoRoomPage from "@/components/VideoRoom";
import {
  ArrowRight,
  Globe,
  Loader2,
  MessageCircle,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Video,
  Users,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
  transports: ["websocket"],
});

type ChatStatus = "idle" | "waiting" | "chatting";

export default function Home() {
  const [status, setStatus] = useState<ChatStatus>("idle");
  const [roomId, setRoomId] = useState("");

  const startChat = useCallback(() => {
    if (status !== "idle") return;

    setStatus("waiting");

    if (socket.connected) {
      socket.emit("start");
    } else {
      socket.connect();
    }
  }, [status]);

  const next = useCallback(() => {
    setRoomId("");
    setStatus("waiting");
    socket.emit("next");
  }, []);

  useEffect(() => {
    const handleConnect = () => {
      // Start matching after reconnection if the user is waiting.
      if (status === "waiting") {
        socket.emit("start");
      }
    };

    const handleMatched = ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      setStatus("chatting");
    };

    const handleWaiting = () => {
      setRoomId("");
      setStatus("waiting");
    };

    const handlePartnerLeft = () => {
      setRoomId("");
      setStatus("waiting");
    };

    socket.on("connect", handleConnect);
    socket.on("matched", handleMatched);
    socket.on("waiting", handleWaiting);
    socket.on("partner_left", handlePartnerLeft);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("matched", handleMatched);
      socket.off("waiting", handleWaiting);
      socket.off("partner_left", handlePartnerLeft);
    };
  }, [status]);

  return (
    <>
      <Navbar show={status !== "chatting"} />

      <main className="relative min-h-screen overflow-hidden bg-[#080810] text-white">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-purple-600/20 blur-[130px]" />
          <div className="absolute -right-40 top-[20%] h-[450px] w-[450px] rounded-full bg-blue-600/20 blur-[130px]" />
          <div className="absolute bottom-[-200px] left-1/3 h-[400px] w-[400px] rounded-full bg-fuchsia-600/10 blur-[120px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />
        </div>

        <AnimatePresence mode="wait">
          {/* HOME SCREEN */}
          {status === "idle" && (
            <motion.section
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-5 py-16 text-center sm:px-8"
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-zinc-300 shadow-lg shadow-purple-950/20 backdrop-blur-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Meet someone new today
                <Sparkles size={14} className="text-purple-300" />
              </motion.div>

              {/* Logo icon */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-[26px] border border-white/15 bg-gradient-to-br from-purple-500/30 via-indigo-500/20 to-blue-500/20 shadow-2xl shadow-purple-500/20 backdrop-blur-xl"
              >
                <Sparkles
                  size={34}
                  strokeWidth={1.7}
                  className="text-white"
                />
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold tracking-[-0.06em] sm:text-7xl lg:text-8xl"
              >
                Random people.
                <br />
                <span className="bg-gradient-to-r from-purple-300 via-fuchsia-300 to-blue-300 bg-clip-text text-transparent">
                  Real connections.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8"
              >
                Welcome to Vibely. Discover new perspectives and have
                spontaneous video conversations with people around the world.
              </motion.p>

              {/* Start button */}
              <motion.button
                type="button"
                onClick={startChat}
                whileHover={{ scale: 1.035, y: -2 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="group relative mt-9 inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-violet-500 to-blue-500 px-7 py-[18px] text-base font-semibold text-white shadow-xl shadow-purple-900/40 transition-shadow hover:shadow-purple-500/30 sm:px-9 sm:text-lg"
              >
                <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
                <Video size={22} />
                <span className="relative">Start Anonymous Chat</span>
                <ArrowRight
                  size={19}
                  className="relative transition-transform group-hover:translate-x-1"
                />
              </motion.button>

              <p className="mt-4 text-xs text-zinc-500 sm:text-sm">
                Free to start <span className="mx-2">•</span> No account required
              </p>

              {/* Feature cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
              >
                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-left backdrop-blur-xl sm:flex-col sm:items-start sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <ShieldCheck size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Stay anonymous
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Start chatting without a profile.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-left backdrop-blur-xl sm:flex-col sm:items-start sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                    <Globe size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Meet worldwide
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Connect with someone new.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 text-left backdrop-blur-xl sm:flex-col sm:items-start sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                    <Zap size={21} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">
                      Instant matching
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                      Jump into conversations quickly.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 flex items-center gap-2 text-xs text-zinc-600">
                <Users size={14} />
                Be respectful. Keep your conversations friendly.
              </div>
            </motion.section>
          )}

          {/* MATCHING SCREEN */}
          {status === "waiting" && (
            <motion.section
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-5 text-center"
            >
              <div className="relative mb-8 flex h-32 w-32 items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-purple-400/20 border-t-purple-400"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-3 rounded-full bg-purple-500/10 blur-md"
                />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Loader2 size={30} className="animate-spin text-purple-300" />
                </div>
              </div>

              <h2 className="text-2xl font-bold sm:text-4xl">
                Finding your next connection
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
                We&apos;re looking for someone new to talk to. Hang tight for a
                moment.
              </p>

              <div className="mt-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Searching for a match
              </div>

              <button
                type="button"
                onClick={() => {
                  socket.emit("cancel");
                  setStatus("idle");
                  setRoomId("");
                }}
                className="mt-8 rounded-xl border border-white/10 px-5 py-2.5 text-sm text-zinc-400 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
              >
                Cancel search
              </button>
            </motion.section>
          )}

          {/* VIDEO CHAT SCREEN */}
          {status === "chatting" && roomId && (
            <motion.section
              key="chatting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-20 flex flex-col bg-[#080810]"
            >
              <header className="flex shrink-0 items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300">
                    <Sparkles size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Vibely
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Connected
                    </div>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-950/30 transition hover:brightness-110"
                >
                  <Shuffle size={16} />
                  <span>Next</span>
                </motion.button>
              </header>

              <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden p-2 sm:p-4">
                <div className="h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-[#171725] sm:rounded-3xl">
                  <VideoRoomPage roomId={roomId} />
                </div>
              </div>

              <div className="flex shrink-0 items-center justify-center gap-2 border-t border-white/5 px-4 py-3 text-xs text-zinc-500">
                <MessageCircle size={14} />
                Keep it friendly. Respect everyone you meet.
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {status !== "chatting" && <Footer />}
    </>
  );
}
