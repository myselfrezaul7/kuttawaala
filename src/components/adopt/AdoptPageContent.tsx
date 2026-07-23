"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Printer, PawPrint, MessageCircle } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/721498465956239/";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const infoCards = [
  {
    emoji: "🐾",
    title: "Real-Time Updates",
    description:
      "See new rescues the moment they're posted. Every dog has a story, and you'll find it on our community page.",
  },
  {
    emoji: "💬",
    title: "Direct Communication",
    description:
      "Chat directly with our rescue volunteers. Ask questions, schedule visits, and get to know your future companion.",
  },
  {
    emoji: "❤️",
    title: "Hundreds of Lives",
    description:
      "Over 500 dogs rescued and counting. From tiny puppies to wise seniors, there's a perfect match waiting for you.",
  },
];

export function AdoptPageContent() {
  return (
    <div className="min-h-screen bg-background pb-24 border-t-0">
      {/* ───────────── HERO BANNER ───────────── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 text-white py-24 md:py-32 text-center px-4">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none opacity-15">
          <div className="absolute -top-24 -right-16 w-[28rem] h-[28rem] rounded-full bg-teal-300 blur-[120px]" />
          <div className="absolute -bottom-24 -left-16 w-[28rem] h-[28rem] rounded-full bg-amber-200 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-5 font-heading tracking-tight drop-shadow-lg">
            Find Your Canine Soulmate
          </h1>
          <p className="text-white/85 max-w-xl mx-auto mb-8 text-lg md:text-xl font-medium leading-relaxed">
            Every dog deserves a loving home. Browse, connect, and adopt — all
            through our vibrant Facebook community.
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <span className="text-sm font-bold bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/25 shadow-lg select-none">
              🐕 Adopt Don&apos;t Shop
            </span>

            <a
              href="https://www.catwaala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/25 shadow-lg hover:bg-white/25 transition-colors"
            >
              🐱 Looking for cats? Visit Catwaala →
            </a>
          </div>

          {/* Print Adoption Form */}
          <a href="/adoption-form" target="_blank">
            <motion.div whileTap={{ scale: 0.96 }}>
              <Button
                variant="outline"
                className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-xl shadow-lg px-6 h-12 text-sm font-bold backdrop-blur-sm"
              >
                <Printer className="w-4 h-4" />
                Print Adoption Form
              </Button>
            </motion.div>
          </a>
        </motion.div>
      </div>

      {/* ───────────── MAIN CONTENT ───────────── */}
      <div className="container mx-auto px-4 -mt-14 relative z-20">
        {/* Facebook Community CTA Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0}
          className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-xl rounded-[2.5rem] p-8 md:p-14 text-center glass-card"
        >
          {/* Facebook icon area */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-teal-400 to-amber-400 rounded-[1.75rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-amber-500/20"
          >
            <span className="text-5xl md:text-6xl select-none">📘</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mb-4">
            Adopt Through Our Facebook Community
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            We have hundreds of rescued dogs waiting for their forever homes.
            Our Facebook community is where all adoptions happen — you can see
            real-time posts, photos, and connect directly with our rescue team.
          </p>

          {/* CTA Button */}
          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <motion.div
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-block"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-teal-500 hover:from-amber-600 hover:to-teal-600 text-white rounded-2xl shadow-xl shadow-amber-500/25 px-10 h-16 text-lg font-bold gap-3 transition-shadow hover:shadow-2xl hover:shadow-amber-500/30"
              >
                <ExternalLink className="w-5 h-5" />
                Visit Our Facebook Group
              </Button>
            </motion.div>
          </a>
        </motion.div>

        {/* ───────────── THREE INFO CARDS ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {infoCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={fadeUp}
              custom={i}
              className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-white/40 dark:border-zinc-800 shadow-xl rounded-[2.5rem] p-8 text-center glass-card group hover:shadow-2xl transition-shadow duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-teal-100 dark:from-amber-900/40 dark:to-teal-900/40 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl shadow-md group-hover:scale-110 transition-transform duration-500">
                {card.emoji}
              </div>
              <h3 className="text-xl font-bold font-heading text-foreground mb-3 tracking-tight">
                {card.title}
              </h3>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed font-medium">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ───────────── BOTTOM CTA BANNER ───────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          custom={0}
          className="mt-16 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-amber-500 via-amber-400 to-teal-500 p-10 md:p-16 text-center text-white shadow-2xl"
        >
          {/* decorative blur */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border border-white/30"
            >
              <Heart className="w-9 h-9 text-white fill-white/80" />
            </motion.div>

            <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tight mb-4 drop-shadow-md">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-white/85 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed font-medium">
              Your perfect companion is just a click away. Join thousands of
              animal lovers in our community and give a rescued dog the life
              they deserve.
            </p>

            <a
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  className="bg-white text-amber-700 hover:bg-white/90 rounded-2xl shadow-xl shadow-black/10 px-10 h-16 text-lg font-bold gap-3 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Join the Facebook Group
                </Button>
              </motion.div>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
