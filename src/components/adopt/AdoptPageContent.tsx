"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Printer, Clock, MessageCircle, Facebook, Dog, Cat } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/groups/721498465956239/";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as any },
  }),
};

const infoCards = [
  {
    icon: Clock,
    color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    title: "Real-Time Updates",
    description:
      "See new rescues the moment they're posted. Every dog has a story, and you'll find it on our community page.",
  },
  {
    icon: MessageCircle,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    title: "Direct Communication",
    description:
      "Chat directly with our rescue volunteers. Ask questions, schedule visits, and get to know your future companion.",
  },
  {
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    title: "Hundreds of Lives",
    description:
      "Over 500 dogs rescued and counting. From tiny puppies to wise seniors, there's a perfect match waiting for you.",
  },
];

export function AdoptPageContent() {
  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-zinc-950 pb-24">
      {/* ───────────── HERO BANNER ───────────── */}
      <div className="relative overflow-hidden bg-secondary/30 dark:bg-zinc-900/50 border-b border-stone-200/70 dark:border-zinc-800/80 py-16 md:py-24 text-center px-4">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as any }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800 border border-stone-200/80 dark:border-zinc-700 text-primary text-xs font-semibold mb-6 shadow-sm">
            <Dog className="w-3.5 h-3.5" />
            <span>Adopt Don&apos;t Shop</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-5 font-heading tracking-tight text-foreground">
            Find Your Canine <span className="text-primary">Soulmate</span>
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8 text-base sm:text-lg md:text-xl leading-relaxed">
            Every dog deserves a loving home. Browse, connect, and adopt through our verified rescue community.
          </p>

          {/* Actions & Companion Link */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="/adoption-form" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                className="gap-2 bg-white dark:bg-zinc-900 border-stone-200 dark:border-zinc-800 text-foreground hover:bg-stone-50 dark:hover:bg-zinc-800 rounded-xl shadow-sm px-5 h-11 text-sm font-semibold"
              >
                <Printer className="w-4 h-4 text-primary" />
                Print Adoption Form
              </Button>
            </a>

            <a
              href="https://www.catwaala.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white/80 dark:bg-zinc-900/80 text-muted-foreground hover:text-teal-600 dark:hover:text-teal-400 px-4 h-11 rounded-xl border border-stone-200/80 dark:border-zinc-800 shadow-sm transition-colors"
            >
              <Cat className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Looking for cats? Visit Catwaala</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* ───────────── MAIN CONTENT ───────────── */}
      <div className="container mx-auto px-4 mt-10 md:mt-14 relative z-20 max-w-5xl">
        {/* Facebook Community CTA Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={0}
          className="bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-sm rounded-3xl p-6 sm:p-10 md:p-14 text-center"
        >
          <div className="w-16 h-16 bg-[#1877F2]/10 border border-[#1877F2]/20 text-[#1877F2] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Facebook className="w-8 h-8 fill-current" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mb-4">
            Adopt Through Our Facebook Community
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            We have hundreds of rescued dogs waiting for their forever homes.
            Our Facebook community is where all adoptions happen — see real-time
            posts, photos, and connect directly with our rescue team.
          </p>

          <a
            href={FACEBOOK_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-block"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm px-6 sm:px-8 h-12 sm:h-13 text-sm sm:text-base font-semibold gap-2 transition-all hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4 shrink-0" />
              <span>Visit Our Facebook Group</span>
            </Button>
          </a>
        </motion.div>

        {/* ───────────── THREE INFO CARDS ───────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          {infoCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={fadeUp}
                custom={i}
                className="bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-sm rounded-3xl p-6 sm:p-8 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl border ${card.color} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-heading text-foreground mb-2 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* ───────────── BOTTOM CTA BANNER ───────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          custom={0}
          className="mt-10 md:mt-14 relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 p-8 sm:p-10 md:p-14 text-center shadow-sm"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">
              <Heart className="w-6 h-6 fill-current" />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading tracking-tight text-foreground mb-3">
              Ready to Meet Your New Best Friend?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Your companion is just a click away. Join thousands of animal lovers in our community and give a rescued dog the life they deserve.
            </p>

            <a
              href={FACEBOOK_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-block"
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-stone-200 dark:border-zinc-800 hover:bg-stone-50 dark:hover:bg-zinc-800 text-foreground rounded-xl shadow-sm px-6 sm:px-8 h-12 sm:h-13 text-sm sm:text-base font-semibold gap-2 transition-all hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4 text-primary shrink-0" />
                <span>Join the Facebook Group</span>
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
