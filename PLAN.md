# Kuttawaala — Polish & Improvement Execution Plan (`PLAN.md`)

> **Target Project:** `C:\Users\mysel\.gemini\antigravity\scratch\kuttawaala`  
> **Scope:** Kuttawaala only. Zero functional regression. Every task below is small, atomic, self-contained, and written with exact file paths, line numbers, and code replacements so it can be completed in a single edit session without making design decisions.

---

## Rules

1. **Keep the existing design style:** Preserve the warm stone/amber palette (`--primary`, `--secondary`, `--background`, `--foreground`), rounded cards (`rounded-2xl` / `rounded-3xl`), and `IBM Plex Sans` typography.
2. **No new libraries:** Do **not** install any new npm packages (`package.json` dependencies must not gain new entries).
3. **No refactors outside the task:** Only modify the exact files and lines specified in the active task. Do not rename files, restructure folders, or reformat unrelated code.
4. **One task per edit session:** Complete and verify the `"Done when"` check for a single task before moving to the next.
5. **No automatic commits:** Do not run `git commit` or `git push` unless explicitly instructed by the user.

---

## Do Not Touch

Keep the following files, configurations, and styles **exactly as they are**:

- `src/middleware.ts` — Hardened Content Security Policy (CSP), `X-Frame-Options: DENY`, HSTS, and security headers.
- `next.config.ts` — PWA wrapper (`@ducanh2912/next-pwa`), image remote patterns, and security header definitions.
- `firestore.rules` & `storage.rules` — Production Firebase security rules.
- `src/lib/firebase.ts` — Firebase client initialization and singleton config.
- `src/lib/rate-limit.ts` — Sliding-window authentication and submission rate limiter.
- `src/contexts/AuthContext.tsx`, `src/contexts/FavoritesContext.tsx`, `src/contexts/LanguageContext.tsx`, `src/contexts/RemoteConfigContext.tsx` — Core application state providers.
- `src/app/globals.css` — Root CSS variables, light/dark theme tokens, and `.glass-card` utility styles.
- `src/components/3d/RainbowBridgeCanvas.tsx` — Three.js instanced lantern WebGL canvas on `/memorial` (except responsive wrapper padding in Task `MED-04`).
- `src/components/shared/ShareModal.tsx` — Social sharing modal component.
- `src/app/adopt/[id]/opengraph-image.tsx` — Dynamic Next.js OpenGraph image generator.

---

## High Priority Tasks (Bugs, Hero Redesign, Broken Assets, Critical Contrast)

---

### `HIGH-01` [DONE]: Redesign Hero Visual to a Stray Newborn Dog Baby with a Subtle, Clean Design
- **Status:** COMPLETED
- **Area:** Design Consistency / Hero Section / Performance
- **Files:**
  1. `public/assets/hero-newborn-puppy.jpg` (new image asset)
  2. `src/components/home/Hero.tsx` (lines 1–29 and lines 113–141)
- **What to change:**
  1. Generate or place a high-resolution, warm, natural photograph of a rescued Bangladeshi Desi newborn stray puppy resting on a soft neutral cloth at `public/assets/hero-newborn-puppy.jpg` (aspect ratio 4:5, minimum 800×1000px, <250KB).
  2. In `src/components/home/Hero.tsx`, remove `import dynamic from "next/dynamic";` (line 3) and remove the `const HeroDogCanvas = dynamic(...)` block (lines 11–28).
  3. In `src/components/home/Hero.tsx`, replace the right column block (lines 113–140, which currently mounts `<HeroDogCanvas />` inside a heavy `border-8 rounded-t-full rounded-b-[200px] overflow-hidden` frame that clips the `-left-6` badge) with this subtle, clean card design:
     ```tsx
     {/* Hero Newborn Stray Puppy Visual — Subtle & Clean Design */}
     <motion.div
         initial={{ opacity: 0, y: 16 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
         className="relative order-1 lg:order-2 flex justify-center"
     >
         <div className="relative w-full max-w-[380px] sm:max-w-[420px]">
             <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-stone-100 dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(28,25,23,0.08)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                 <Image
                     src="/assets/hero-newborn-puppy.jpg"
                     alt="Rescued newborn native Bangladeshi Desi stray puppy resting warmly"
                     fill
                     priority
                     sizes="(max-width: 640px) 92vw, (max-width: 1024px) 420px, 420px"
                     className="object-cover object-center transition-transform duration-700 hover:scale-[1.02]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                 <div className="absolute bottom-4 right-4 bg-black/45 backdrop-blur-md text-white/95 px-3 py-1 rounded-full text-xs font-medium tracking-wide border border-white/10">
                     Newborn Street Rescue • Dhaka
                 </div>
             </div>

             {/* Subtle Floating Status Badge (positioned outside overflow-hidden so it never clips) */}
             <motion.div
                 initial={{ opacity: 0, y: 12 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: 0.3 }}
                 viewport={{ once: true }}
                 className="absolute -bottom-4 left-4 sm:-left-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-stone-200/80 dark:border-zinc-800 flex items-center gap-3 z-20"
             >
                 <div className="w-8 h-8 sm:w-9 sm:h-9 bg-secondary rounded-full flex items-center justify-center text-primary shrink-0">
                     <Heart className="w-4 h-4 fill-current" />
                 </div>
                 <div>
                     <p className="font-bold text-xs sm:text-sm text-foreground dark:text-stone-100 leading-tight">500+ Rescued</p>
                     <p className="text-[11px] text-muted-foreground leading-tight">Since 2020</p>
                 </div>
             </motion.div>
         </div>
     </motion.div>
     ```
- **Done when:** `public/assets/hero-newborn-puppy.jpg` exists, `Hero.tsx` no longer imports `HeroDogCanvas`, the newborn stray puppy displays inside the subtle `rounded-[2rem]` frame, the `500+ Rescued` badge is not clipped on any viewport, and `npx tsc --noEmit` passes.

---

### `HIGH-02` [DONE]: Remove Residual Catwaala Favicon (`src/app/icon.jpg`) and Residual Cat References
- **Status:** COMPLETED
- **Area:** Bugs & Broken Things / Brand Consistency
- **Files:**
  1. `src/app/icon.jpg` (delete file)
  2. `src/app/dashboard/page.tsx` (line 191)
  3. `src/data/quiz.ts` (lines 30 and 32)
- **What to change:**
  1. Delete `src/app/icon.jpg` (it depicts 4 cartoon cats at a tea stall from Catwaala and overrides `public/logo.png` as Next.js App Router's automatic favicon). `src/app/layout.tsx:37-41` already points `icons.icon`, `icons.shortcut`, and `icons.apple` to `"/logo.png"`.
  2. In `src/app/dashboard/page.tsx` at line 191, replace the crying cat emoji:
     - Find: `<div className="text-6xl mb-4">😿</div>`
     - Replace with: `<div className="text-6xl mb-4">🐶</div>`
  3. In `src/data/quiz.ts` at lines 30 and 32, replace the cat toy strings:
     - Line 30 Find: `{ id: '3a', text: 'Lots of time for feather wands! 🎣', scores: { energy: 4, social: 4 } },`
     - Line 30 Replace: `{ id: '3a', text: 'Lots of time for fetch and walks! 🎾', scores: { energy: 4, social: 4 } },`
     - Line 32 Find: `{ id: '3c', text: 'I prefer a dog who entertains themselves 🧶', scores: { independent: 5, energy: 2 } },`
     - Line 32 Replace: `{ id: '3c', text: 'I prefer a calm dog who relaxes nearby 🦴', scores: { independent: 5, energy: 2 } },`
- **Done when:** `src/app/icon.jpg` no longer exists, `dashboard/page.tsx` shows `🐶`, and `src/data/quiz.ts` contains zero references to feather wands or yarn.

---

### `HIGH-03` [DONE]: Fix Invisible Buttons in Light Mode and Invisible Headings in Dark Mode
- **Status:** COMPLETED
- **Area:** Accessibility (Contrast) / Bugs
- **Files:**
  1. `src/app/dashboard/page.tsx` (lines 117 and 136)
  2. `src/app/adopt/[id]/page.tsx` (line 105)
  3. `src/app/error.tsx` (line 33)
  4. `src/app/global-error.tsx` (line 35)
- **What to change:**
  1. In `src/app/dashboard/page.tsx` line 117 (`dark:text-muted` is `#292524` dark charcoal on a dark card):
     - Find: `className="text-4xl font-bold text-foreground dark:text-muted font-heading flex flex-col sm:flex-row items-center sm:items-baseline gap-2"`
     - Replace: `className="text-4xl font-bold text-foreground dark:text-stone-100 font-heading flex flex-col sm:flex-row items-center sm:items-baseline gap-2"`
  2. In `src/app/dashboard/page.tsx` line 136 (`bg-card text-white` is white text on a white button in light mode):
     - Find: `<Button className="rounded-xl bg-card text-white hover:bg-primary/90">`
     - Replace: `<Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">`
  3. In `src/app/adopt/[id]/page.tsx` line 105:
     - Find: `<h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground dark:text-muted">{dog.name}</h1>`
     - Replace: `<h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground dark:text-stone-100">{dog.name}</h1>`
  4. In `src/app/error.tsx` line 33:
     - Find: `className="gap-2 bg-card dark:bg-muted text-white dark:text-foreground hover:bg-card dark:hover:bg-muted"`
     - Replace: `className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"`
  5. In `src/app/global-error.tsx` line 35:
     - Find: `className="bg-card text-white hover:bg-stone-800 rounded-xl px-6 h-12 font-bold"`
     - Replace: `className="bg-stone-900 text-white hover:bg-stone-800 rounded-xl px-6 h-12 font-bold"`
- **Done when:** No file in `src/app/` contains `bg-card text-white`, `bg-card dark:bg-muted text-white`, or `dark:text-muted` on headings.

---

### `HIGH-04` [DONE]: Fix Broken 404 Image Fallback Paths in Admin Dogs & ProfileModal
- **Status:** COMPLETED
- **Area:** Bugs and Broken Things (Missing Assets)
- **Files:**
  1. `src/app/admin/dogs/page.tsx` (line 65)
  2. `src/components/dashboard/ProfileModal.tsx` (line 80)
- **What to change:**
  1. In `src/app/admin/dogs/page.tsx` line 65 (`/assets/dog1.jpg` does not exist in `public/assets/`):
     - Find: `imageUrl: '/assets/dog1.jpg'`
     - Replace: `imageUrl: '/assets/dog_success_1.png'`
  2. In `src/components/dashboard/ProfileModal.tsx` line 80 (`/images/placeholder-avatar.png` does not exist in `public/`):
     - Find: `src={avatarUrl || "/images/placeholder-avatar.png"}`
     - Replace: `src={avatarUrl || "/logo.png"}`
- **Done when:** Searching `src/` for `dog1.jpg` and `placeholder-avatar.png` returns 0 matches.

---

### `HIGH-05` [DONE]: Fix Quiz Stale State Bug, Tag Matching, and Dark Mode Contrast
- **Status:** COMPLETED
- **Area:** Bugs & Broken Things / Design Consistency
- **Files:**
  1. `src/app/quiz/page.tsx` (lines 62–97, 111, 132, 188, 196, 224, 232, 236, 240)
- **What to change:**
  1. In `src/app/quiz/page.tsx` lines 62–97, fix `handleAnswer` so the final question's tags are passed directly into `finishQuiz(updatedTags)` instead of reading stale closure state, and align tag scoring with `src/data/dogs.ts` tags (`Gentle`, `Playful`, `Quiet`, `Sleepyhead`, `Cuddly`, `Loving`, `Sweet`):
     ```tsx
     const handleAnswer = (tags: string[]) => {
         const updatedTags = [...selectedTags, ...tags];
         setSelectedTags(updatedTags);
         if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
             setCurrentQuestion(prev => prev + 1);
         } else {
             finishQuiz(updatedTags);
         }
     };

     const finishQuiz = (finalTags: string[] = selectedTags) => {
         setIsCalculating(true);
         setTimeout(() => {
             const scoredDogs = dogs.map(dog => {
                 let score = 0;
                 dog.temperamentTags.forEach(tag => {
                     if (finalTags.includes(tag)) score += 2;
                 });
                 if (finalTags.includes("Calm") && (dog.temperamentTags.includes("Quiet") || dog.temperamentTags.includes("Sleepyhead"))) score += 2;
                 if (finalTags.includes("Affectionate") && (dog.temperamentTags.includes("Cuddly") || dog.temperamentTags.includes("Loving") || dog.temperamentTags.includes("Sweet"))) score += 2;
                 return { dog, score };
             });
             scoredDogs.sort((a, b) => b.score - a.score);
             setMatchedDog(scoredDogs[0].dog);
             setShowResults(true);
             setIsCalculating(false);
         }, 800);
     };
     ```
  2. In `src/app/quiz/page.tsx`, add dark mode classes to the hardcoded light containers:
     - Line 111 & Line 188: Replace `bg-[#FFFDF8]` with `bg-[#FFFDF8] dark:bg-zinc-950`
     - Line 132 & Line 224: Replace `bg-white rounded-[2.5rem]` with `bg-white dark:bg-zinc-900 rounded-[2.5rem]` and `border-stone-100` with `border-stone-100 dark:border-zinc-800`
     - Line 196: Replace `text-stone-400` with `text-stone-600 dark:text-stone-400`
     - Line 232: Replace `text-stone-800` with `text-stone-800 dark:text-stone-100`
     - Line 236: Replace `bg-stone-50/50 hover:bg-amber-50/50 border-2 border-stone-100` with `bg-stone-50/50 dark:bg-zinc-800/60 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 border-2 border-stone-100 dark:border-zinc-700`
     - Line 240: Replace `text-stone-700 group-hover:text-stone-900` with `text-stone-700 dark:text-stone-200 group-hover:text-stone-900 dark:group-hover:text-white`
- **Done when:** Answering all 4 quiz questions includes the 4th answer in `finishQuiz(updatedTags)`, and `/quiz` renders legible dark surfaces and light text in dark mode.

---

### `HIGH-06` [DONE]: Fix ReportForm File Size Mismatch (10MB vs 5MB) and Undefined Map Coordinates Link
- **Status:** COMPLETED
- **Area:** Bugs and Broken Things (Forms)
- **Files:**
  1. `src/services/ReportService.ts` (line 72)
  2. `src/components/report/ReportForm.tsx` (line 149)
- **What to change:**
  1. In `src/services/ReportService.ts` line 72, align the service upload limit with the UI's `10MB` validation (`ReportForm.tsx:343 & 362`):
     - Find:
       ```ts
       if (file.size > 5 * 1024 * 1024) {
           throw new Error("File size exceeds 5MB limit");
       }
       ```
     - Replace:
       ```ts
       if (file.size > 10 * 1024 * 1024) {
           throw new Error("File size exceeds 10MB limit");
       }
       ```
  2. In `src/components/report/ReportForm.tsx` line 149, prevent `https://www.google.com/maps?q=undefined,undefined` when map coordinates are not pinned:
     - Find:
       ```ts
       map_link: `https://www.google.com/maps?q=${data.latitude},${data.longitude}`,
       ```
     - Replace:
       ```ts
       map_link: data.latitude && data.longitude ? `https://www.google.com/maps?q=${data.latitude},${data.longitude}` : "Location not pinned on map",
       ```
- **Done when:** Uploading a 6MB–10MB photo succeeds in `ReportService.ts` and unpinned reports send `"Location not pinned on map"` instead of `undefined,undefined`.

---

### `HIGH-07` [DONE]: Fix Non-Functional Table of Contents Links on Resource Detail Page
- **Status:** COMPLETED
- **Area:** Bugs and Broken Things (Links)
- **Files:**
  1. `src/app/resources/[slug]/page.tsx` (lines 58 and 139–145)
- **What to change:**
  1. In `src/app/resources/[slug]/page.tsx` line 58, add an `id` attribute and `scroll-mt-28` to the `ReactMarkdown` `h2` renderer:
     - Find:
       ```tsx
       h2: ({ node, ...props }) => <h2 className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground border-b border-border/50 pb-2" {...props} />,
       ```
     - Replace:
       ```tsx
       h2: ({ node, children, ...props }) => {
           const id = String(children).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
           return <h2 id={id} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground border-b border-border/50 pb-2 scroll-mt-28" {...props}>{children}</h2>;
       },
       ```
  2. In `src/app/resources/[slug]/page.tsx` lines 139–145, turn each Table of Contents `<li>` into an anchor link:
     - Find:
       ```tsx
       <ul className="space-y-3 text-sm border-l-2 border-stone-200 dark:border-zinc-800 ml-1">
           {headings.map((heading, i) => (
               <li key={i} className="pl-4 text-muted-foreground hover:text-amber-600 dark:hover:text-amber-500 cursor-pointer transition-colors line-clamp-1">
                   {heading}
               </li>
           ))}
       </ul>
       ```
     - Replace:
       ```tsx
       <ul className="space-y-3 text-sm border-l-2 border-stone-200 dark:border-zinc-800 ml-1">
           {headings.map((heading, i) => {
               const slugId = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
               return (
                   <li key={i} className="pl-4">
                       <a href={`#${slugId}`} className="block text-muted-foreground hover:text-amber-600 dark:hover:text-amber-500 transition-colors line-clamp-1">
                           {heading}
                       </a>
                   </li>
               );
           })}
       </ul>
       ```
- **Done when:** Clicking any item under `"In this article"` on `/resources/[slug]` smoothly scrolls to the matching `<h2>` section.

---

## Medium Priority Tasks (Mobile 360px/768px/1280px, SEO, Accessibility, Performance)

---

### `MED-01` [DONE]: Fix 1280px Desktop 4-Column Empty Slot in FeaturedDogs & Duplicate Hero Catwaala Pill
- **Status:** COMPLETED
- **Area:** Mobile & Desktop Responsiveness (1280px) / Design Consistency
- **Files:**
  1. `src/components/home/FeaturedDogs.tsx` (line 66)
  2. `src/components/home/Hero.tsx` (lines 85–110)
- **What to change:**
  1. In `src/components/home/FeaturedDogs.tsx` line 66 (`featuredDogs` slices 3 items on line 20, so `lg:grid-cols-4` leaves 25% of the row blank at 1280px):
     - Find: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">`
     - Replace: `<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">`
  2. In `src/components/home/Hero.tsx`, remove the duplicate `"Also love cats? Visit Catwaala"` floating badge block (lines 85–110), because `src/app/page.tsx:120-146` already renders a dedicated Catwaala partner section on the homepage.
- **Done when:** On a 1280px desktop screen, the 3 featured dog cards fill the 3-column grid evenly without a blank 4th column, and the Catwaala CTA appears once on the homepage.

---

### `MED-02` [DONE]: Fix 360px Horizontal Overflow on ReCAPTCHA Containers (Login & Report Pages)
- **Status:** COMPLETED
- **Area:** Mobile Responsiveness (360px)
- **Files:**
  1. `src/app/login/page.tsx` (lines 166 and 238–246)
  2. `src/components/report/ReportForm.tsx` (lines 400–410)
- **What to change:**
  1. In `src/app/login/page.tsx`:
     - Line 166: Change `className="glass-card p-8 rounded-3xl shadow-xl border border-stone-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl"` to use `p-5 sm:p-8`.
     - Lines 238–246: Wrap `<ReCAPTCHA>` in a responsive scale wrapper so the 304px widget never overflows a 360px screen:
       ```tsx
       <div className="flex justify-center my-4 overflow-hidden">
           <div className="scale-[0.85] sm:scale-100 origin-center">
               <ReCAPTCHA
                   sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                   onChange={(val) => setCaptchaVerified(!!val)}
                   onErrored={onCaptchaError}
               />
           </div>
       </div>
       ```
  2. In `src/components/report/ReportForm.tsx` lines 400–410:
     - Change `p-6` on line 400 to `p-4 sm:p-6`.
     - Change `<div className="flex justify-center">` around `<ReCAPTCHA>` on line 402 to `<div className="flex justify-center overflow-hidden"><div className="scale-[0.82] sm:scale-100 origin-center">` (and close the extra `</div>`).
- **Done when:** At 360px viewport width, neither `/login` nor Step 3 of `/report` has horizontal scrollbars (`document.documentElement.scrollWidth <= 360`).

---

### `MED-03` [DONE]: Fix 360px Cramped 2-Column Form Grids in AdoptionForm, MemorialModal, and Adoption-Form Page
- **Status:** COMPLETED
- **Area:** Mobile Responsiveness (360px)
- **Files:**
  1. `src/components/adopt/AdoptionForm.tsx` (line 85)
  2. `src/components/memorial/MemorialModal.tsx` (lines 105 and 118)
  3. `src/app/adoption-form/page.tsx` (lines 40, 81, 165)
- **What to change:**
  1. In `src/components/adopt/AdoptionForm.tsx` line 85:
     - Find: `<div className="grid grid-cols-2 gap-4">`
     - Replace: `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">`
  2. In `src/components/memorial/MemorialModal.tsx`:
     - Line 105: Change `<DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-card border-none rounded-3xl shadow-2xl">` to `<DialogContent className="w-[calc(100%-1.5rem)] sm:max-w-[500px] max-h-[90vh] overflow-y-auto p-0 bg-card border-none rounded-3xl shadow-2xl">`
     - Line 118: Change `<div className="grid grid-cols-2 gap-4">` to `<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">`
  3. In `src/app/adoption-form/page.tsx`:
     - Line 40: Change `p-8 md:p-12 print:p-0` to `p-4 sm:p-8 md:p-12 print:p-0`
     - Line 81 & Line 165: Change `grid-cols-2` to `grid-cols-1 sm:grid-cols-2 print:grid-cols-2`
- **Done when:** Name and Phone inputs stack vertically at 360px and sit side-by-side at `>=640px` (`sm:`).

---

### `MED-04` [DONE]: Fix 360px Padding & Header Wrapping in VolunteerForm and RainbowBridgeCanvas
- **Status:** COMPLETED
- **Area:** Mobile Responsiveness (360px)
- **Files:**
  1. `src/components/volunteer/VolunteerForm.tsx` (lines 102, 112, 136)
  2. `src/components/3d/RainbowBridgeCanvas.tsx` (line 388)
- **What to change:**
  1. In `src/components/volunteer/VolunteerForm.tsx`:
     - Line 102: Change `text-5xl font-extrabold` to `text-3xl sm:text-4xl md:text-5xl font-extrabold`
     - Line 112: Change `glass-card p-10 rounded-[2.5rem]` to `glass-card p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem]`
     - Line 136: Change `glass-card p-10 rounded-[2.5rem]` to `glass-card p-6 sm:p-10 rounded-3xl sm:rounded-[2.5rem]`
  2. In `src/components/3d/RainbowBridgeCanvas.tsx` line 388:
     - Find: `<div className="relative z-10 p-6 md:p-8 flex items-center justify-between w-full pointer-events-auto">`
     - Replace: `<div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-wrap items-center justify-between gap-2 w-full pointer-events-auto">`
- **Done when:** `/volunteer` and `/memorial` fit comfortably on a 360px screen with no cramped inputs or colliding top badges.

---

### `MED-05` [DONE]: Fix SEO Metadata, Server Component Conversion, and Duplicate `| Kuttawaala` Titles
- **Status:** COMPLETED
- **Area:** SEO (Titles, Meta Descriptions, Open Graph)
- **Files:**
  1. `src/app/page.tsx` (line 1)
  2. `src/app/adopt/[id]/page.tsx` (lines 26 and 36)
  3. `src/app/donate/page.tsx` (lines 4–7)
  4. `src/app/resources/[slug]/page.tsx` (lines 1–28)
- **What to change:**
  1. In `src/app/page.tsx`, remove `"use client";` from line 1 (all interactive children already have `"use client"`).
  2. In `src/app/adopt/[id]/page.tsx` lines 26 and 36, remove `| Kuttawaala` from `title` so the root layout template (`%s | Kuttawaala`) does not produce `... | Kuttawaala | Kuttawaala`:
     - Line 26: Change `title: "Dog Not Found | Kuttawaala"` to `title: "Dog Not Found"`
     - Line 36: Change ``const title = `Adopt ${dog.name} - ${dog.breed} in ${dog.location} | Kuttawaala`;`` to ``const title = `Adopt ${dog.name} - ${dog.breed} in ${dog.location}`;``
  3. In `src/app/donate/page.tsx` lines 4–7, remove duplicate brand suffix and add `openGraph`:
     ```tsx
     export const metadata: Metadata = {
         title: "Donate | Save a Street Dog",
         description: "Your contribution provides emergency rescues, vaccinations, sterilization, and daily meals for stray dogs in Bangladesh. Donate via bKash, Nagad, or Bank.",
         openGraph: {
             title: "Donate to Kuttawaala | Save a Street Dog",
             description: "Your contribution provides emergency rescues, vaccinations, sterilization, and daily meals for stray dogs in Bangladesh.",
         },
     };
     ```
  4. In `src/app/resources/[slug]/page.tsx`:
     - Remove `"use client";` (line 1) and `import { use } from "react";` (line 3).
     - Add `import type { Metadata } from "next";` and export `generateMetadata`:
       ```tsx
       export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
           const { slug } = await params;
           const resource = resources.find((r) => r.slug === slug);
           if (!resource) return { title: "Article Not Found" };
           return {
               title: resource.title,
               description: resource.summary,
               openGraph: {
                   title: `${resource.title} | Kuttawaala`,
                   description: resource.summary,
                   type: "article",
                   images: [{ url: resource.coverImage, alt: resource.title }],
               },
           };
       }
       ```
     - Change `export default function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> })` (line 19) to `export default async function ResourceDetailPage({ params }: { params: Promise<{ slug: string }> })` and change `const { slug } = use(params);` (line 20) to `const { slug } = await params;`.
- **Done when:** `/adopt/[id]`, `/donate`, and `/resources/[slug]` render unique `<title>` tags without doubled `| Kuttawaala | Kuttawaala` suffixes.

---

### `MED-06` [DONE]: Add Route Metadata Layouts for Client-Only Pages (`/community`, `/faq`, `/quiz`, `/login`, `/adoption-form`)
- **Status:** COMPLETED
- **Area:** SEO (Titles, Meta Descriptions, Open Graph)
- **Files:**
  1. `src/app/community/layout.tsx` (new file)
  2. `src/app/faq/layout.tsx` (new file)
  3. `src/app/quiz/layout.tsx` (new file)
  4. `src/app/login/layout.tsx` (new file)
  5. `src/app/adoption-form/layout.tsx` (new file)
- **What to change:**
  Create a minimal Server Component `layout.tsx` in each of the 5 folders above that exports `metadata: Metadata` and returns `children`:
  ```tsx
  import type { Metadata } from "next";

  export const metadata: Metadata = {
      title: "<Route Title>",
      description: "<Route Description>",
  };

  export default function Layout({ children }: { children: React.ReactNode }) {
      return children;
  }
  ```
  Use these exact titles and descriptions:
  - `community/layout.tsx`: `title: "Community Hub"`, `description: "Read rescue stories, dog care guides, and local welfare updates from Kuttawaala's 17K+ community in Bangladesh."`
  - `faq/layout.tsx`: `title: "Frequently Asked Questions"`, `description: "Answers to common questions about stray dog adoption, rabies vaccination, emergency rescue, and fostering in Bangladesh."`
  - `quiz/layout.tsx`: `title: "Soul-Dog Matcher Quiz"`, `description: "Take our quick personality quiz to find your ideal rescued street dog match in Bangladesh."`
  - `login/layout.tsx`: `title: "Sign In or Create Account"`, `description: "Sign in to Kuttawaala to track your adoption applications, rescue reports, and community impact."`
  - `adoption-form/layout.tsx`: `title: "Adoption Agreement Form"`, `description: "Official Kuttawaala dog adoption application and agreement form for adopters in Bangladesh."`
- **Done when:** All 5 routes have a `layout.tsx` exporting `metadata` and `npm run build` succeeds.

---

### `MED-07` [DONE]: Fix Heading Hierarchy (`<h1>` / `<h2>`) and Nested `<main>` Landmarks
- **Status:** COMPLETED
- **Area:** SEO & Accessibility (Headings & Landmarks)
- **Files:**
  1. `src/components/report/ReportForm.tsx` (lines 226 and 250)
  2. `src/components/volunteer/VolunteerForm.tsx` (lines 113 and 135)
  3. `src/components/memorial/MemorialList.tsx` (lines 162 and 170)
  4. `src/components/donate/DonatePage.tsx` (lines 110 and 219)
  5. `src/app/community/page.tsx` (lines 19 and 162)
  6. `src/app/memorial/page.tsx` (lines 12 and 18)
- **What to change:**
  1. In `src/components/report/ReportForm.tsx`:
     - Line 226: Change `<h3 className="text-2xl font-bold mb-2">Join 17K+ Rescuers</h3>` to `<h2 className="text-2xl font-bold mb-2">Join 17K+ Rescuers</h2>`
     - Line 250: Change `<h2 className="text-2xl font-bold text-foreground dark:text-stone-100">What&apos;s the situation?</h2>` to `<h1 className="text-2xl font-bold text-foreground dark:text-stone-100">What&apos;s the situation?</h1>`
  2. In `src/components/volunteer/VolunteerForm.tsx`:
     - Lines 113 & 135: Change `<h3 ...>...</h3>` to `<h2 ...>...</h2>`
  3. In `src/components/memorial/MemorialList.tsx`:
     - Lines 162 & 170: Change `<h3 ...>{memorial.pet_name}</h3>` to `<h2 ...>{memorial.pet_name}</h2>`
  4. In `src/components/donate/DonatePage.tsx`:
     - Lines 110 & 219: Change `<h3 ...>...</h3>` to `<h2 ...>...</h2>`
  5. In `src/app/community/page.tsx` (lines 19 and 162) and `src/app/memorial/page.tsx` (lines 12 and 18):
     - Replace outer `<main ...>` and `</main>` tags with `<div ...>` and `</div>` because `src/app/layout.tsx:118` already wraps all pages in `<main>`.
- **Done when:** Every public page has a single `<h1>`, no page skips `<h1>` to `<h3>`, and no page renders nested `<main><main>` elements.

---

### `MED-08` [DONE]: Clean Up Sitemap Redirect URL & Root JSON-LD Placeholder Phone Number
- **Status:** COMPLETED
- **Area:** SEO (Sitemap & Structured Data)
- **Files:**
  1. `src/app/sitemap.ts` (lines 17–22 and 40)
  2. `src/app/layout.tsx` (lines 98–102)
- **What to change:**
  1. In `src/app/sitemap.ts` lines 17–22, filter out `emergency-vet-list` (which redirects to `/find-vet`) and change `/report`'s `changeFrequency` on line 40 from `"never"` to `"monthly"`:
     ```ts
     const resourceUrls = resources
       .filter((resource) => resource.slug !== "emergency-vet-list")
       .map((resource) => ({
         url: `${baseUrl}/resources/${resource.slug}`,
         lastModified: new Date(resource.date),
         changeFrequency: "monthly" as const,
         priority: 0.7,
       }));
     ```
  2. In `src/app/layout.tsx` lines 98–102, replace the fake placeholder telephone `"+880-987-654321"` in the JSON-LD schema with the official email:
     ```tsx
     contactPoint: {
         "@type": "ContactPoint",
         email: "hello@kuttawaala.org",
         contactType: "customer service",
     },
     ```
- **Done when:** `sitemap.ts` excludes `emergency-vet-list` and `src/app/layout.tsx` no longer contains `+880-987-654321`.

---

### `MED-09` [DONE]: Optimize Next/Image `sizes` & Remove Below-the-Fold `priority` Preloading
- **Status:** COMPLETED
- **Area:** Performance (Image Sizes & Render Blocking)
- **Files:**
  1. `src/components/shared/BeforeAfterSlider.tsx` (lines 65–71 and 82–88)
  2. `src/components/shared/PetCard.tsx` (lines 34–39)
  3. `src/components/memorial/MemorialList.tsx` (lines 154–159)
- **What to change:**
  1. In `src/components/shared/BeforeAfterSlider.tsx` lines 65–71 and 82–88, remove `priority` from both `<Image>` tags (it is rendered below the fold on `/`) and add `sizes="(max-width: 1024px) 100vw, 50vw"`.
  2. In `src/components/shared/PetCard.tsx` lines 34–39, add `sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"` to `<Image src={dog.imageUrl} alt={dog.name} fill ... />`.
  3. In `src/components/memorial/MemorialList.tsx` lines 154–159, add `sizes="(max-width: 750px) 100vw, (max-width: 1024px) 50vw, 33vw"` to `<Image src={memorial.image_url} alt={memorial.pet_name} fill ... />`.
- **Done when:** None of `BeforeAfterSlider.tsx`, `PetCard.tsx`, or `MemorialList.tsx` have `<Image fill>` without a `sizes` attribute, and `BeforeAfterSlider.tsx` does not preload images with `priority`.

---

### `MED-10` [DONE]: Remove Double Route Transition Wrapper (`src/app/template.tsx`) & Optimize Dashboard Leaderboard Query
- **Status:** COMPLETED
- **Area:** Performance (JS Execution & Network Payload)
- **Files:**
  1. `src/app/template.tsx` (delete file)
  2. `src/app/dashboard/page.tsx` (lines 11 and 52–60)
- **What to change:**
  1. Delete `src/app/template.tsx` because `src/app/layout.tsx:119` already wraps `{children}` in `<PageTransition>` (`src/components/layout/PageTransition.tsx`). Having both causes every route change to run two nested Framer Motion animations.
  2. In `src/app/dashboard/page.tsx`:
     - Line 11: Add `orderBy, limit` to the `firebase/firestore` import:
       `import { collection, query, where, getDocs, doc, getDoc, orderBy, limit } from "firebase/firestore";`
     - Lines 52–60: Replace the full-collection scan `getDocs(collection(db, "users"))` with a bounded query:
       ```tsx
       const leaderboardQuery = query(
           collection(db, "users"),
           where("points", ">", 0),
           orderBy("points", "desc"),
           limit(10)
       );
       const usersSnap = await getDocs(leaderboardQuery);
       const sortedUsers = usersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
       setLeaderboard(sortedUsers);
       ```
- **Done when:** `src/app/template.tsx` is deleted and `dashboard/page.tsx` queries at most 10 users with `limit(10)`.

---

### `MED-11` [DONE]: Add Missing `aria-label` Attributes to Icon-Only Buttons & Social Links
- **Status:** COMPLETED
- **Area:** Accessibility (Labels)
- **Files:**
  1. `src/components/layout/Header.tsx` (lines 120, 152, 158, 262, 285, 297)
  2. `src/components/layout/Footer.tsx` (lines 90, 93, 94, 95)
  3. `src/components/shared/EmergencyFAB.tsx` (line 78)
  4. `src/components/shared/LanguageToggle.tsx` (line 10)
  5. `src/components/vet/VetFinder.tsx` (lines 146, 154, 167, 172)
- **What to change:**
  1. In `src/components/layout/Header.tsx`:
     - Lines 120, 158, 262: Add `aria-label="Toggle color theme"` to each theme toggle `<button>`.
     - Line 152: Add `aria-label="Open search"` to the mobile search `<button>`.
     - Line 285: Add `aria-label="Close search"` to the search modal close `<button>`.
     - Line 297: Add `aria-label="Search Kuttawaala"` to the search `<input>`.
  2. In `src/components/layout/Footer.tsx`:
     - Line 90: Add `aria-label="Kuttawaala on Facebook"`
     - Line 93: Add `aria-label="Kuttawaala on Instagram"`
     - Line 94: Add `aria-label="Kuttawaala on YouTube"`
     - Line 95: Add `aria-label="Kuttawaala on TikTok"`
  3. In `src/components/shared/EmergencyFAB.tsx` line 78:
     - Add `aria-label={isOpen ? "Close emergency menu" : "Open emergency rescue menu"}` and `aria-expanded={isOpen}` to `<motion.button>`.
  4. In `src/components/shared/LanguageToggle.tsx` line 10:
     - Add `aria-label={language === "en" ? "Switch language to Bengali" : "Switch language to English"}` to `<Button>`.
  5. In `src/components/vet/VetFinder.tsx`:
     - Line 146: Add `aria-label="Search clinics, doctors, or areas"` to `<Input>`.
     - Line 154: Add `type="button" aria-label="Clear search"` to the clear `<button>`.
     - Lines 167 & 172: Add `htmlFor="vet-area-select"` to `<label>` and `id="vet-area-select"` to `<select>`.
- **Done when:** All icon-only buttons and inputs in `Header.tsx`, `Footer.tsx`, `EmergencyFAB.tsx`, `LanguageToggle.tsx`, and `VetFinder.tsx` have explicit `aria-label` or `htmlFor`/`id` attributes.

---

### `MED-12` [DONE]: Associate Form Labels & Add Keyboard Navigation to Interactive Widgets
- **Status:** COMPLETED
- **Area:** Accessibility (Form Labels & Keyboard Navigation)
- **Files:**
  1. `src/components/adopt/AdoptionForm.tsx` (lines 88–109)
  2. `src/components/volunteer/VolunteerForm.tsx` (lines 146–203)
  3. `src/components/report/ReportForm.tsx` (lines 299, 322, 335, 384, 415)
  4. `src/components/shared/BeforeAfterSlider.tsx` (line 57)
  5. `src/components/donate/DonatePage.tsx` (line 93)
- **What to change:**
  1. In `src/components/adopt/AdoptionForm.tsx`:
     - Add `htmlFor="adopt-name"` / `id="adopt-name"` (lines 88–89), `htmlFor="adopt-phone"` / `id="adopt-phone"` (lines 95–96), `htmlFor="adopt-email"` / `id="adopt-email"` (lines 101–102), `htmlFor="adopt-message"` / `id="adopt-message"` (lines 108–109).
  2. In `src/components/volunteer/VolunteerForm.tsx`:
     - Add `htmlFor="vol-name"` / `id="vol-name"` (lines 146–148), `htmlFor="vol-email"` / `id="vol-email"` (lines 158–160), `htmlFor="vol-phone"` / `id="vol-phone"` (lines 169–171), `htmlFor="vol-interest"` / `id="vol-interest"` (lines 181–184), `htmlFor="vol-message"` / `id="vol-message"` (lines 201–203).
  3. In `src/components/report/ReportForm.tsx`:
     - Add `aria-label="Specific landmarks or location details"` (line 299), `aria-label="Describe the dog's condition"` (line 322), `aria-label="Upload photo of the dog"` (line 335), `aria-label="Your name and phone number"` (line 384), `aria-label="Security math question answer"` (line 415).
  4. In `src/components/shared/BeforeAfterSlider.tsx` line 57, add keyboard support to the slider container `div`:
     ```tsx
     role="slider"
     tabIndex={0}
     aria-label="Before and after rescue image comparison slider"
     aria-valuemin={0}
     aria-valuemax={100}
     aria-valuenow={Math.round(sliderPosition)}
     onKeyDown={(e) => {
         if (e.key === "ArrowLeft") {
             e.preventDefault();
             setSliderPosition((p) => Math.max(0, p - 5));
         } else if (e.key === "ArrowRight") {
             e.preventDefault();
             setSliderPosition((p) => Math.min(100, p + 5));
         }
     }}
     ```
  5. In `src/components/donate/DonatePage.tsx` line 93, add `role="button"`, `tabIndex={0}`, `aria-pressed={isSelected}`, and `onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSelectedOption(option.id); } }}` to the donation tier card `div`.
- **Done when:** Clicking any `<label>` in `AdoptionForm` or `VolunteerForm` focuses its input, and `BeforeAfterSlider` and `DonatePage` cards can be operated with Tab + Arrow/Enter keys.

---

## Low Priority Tasks (Code Quality, Service Consolidation, Dead Files)

---

### `LOW-01` [DONE]: Route `AdoptionForm` and `VolunteerForm` Through Their Dedicated Services
- **Status:** COMPLETED
- **Area:** Code Quality / Security Consistency
- **Files:**
  1. `src/services/AdoptionService.ts`
  2. `src/components/adopt/AdoptionForm.tsx` (lines 39–55)
  3. `src/services/VolunteerService.ts`
  4. `src/components/volunteer/VolunteerForm.tsx` (lines 45–63)
- **What to change:**
  1. In `src/components/adopt/AdoptionForm.tsx`, replace the direct `addDoc(collection(db, "adoptions"), ...)` call (lines 39–50) with `await AdoptionService.submitApplication({ dog_id: dogId || "general", dog_name: dogName || "General Application", applicant_name: data.name, applicant_phone: data.phone, applicant_email: data.email, message: data.message, user_id: user?.uid })` (updating `AdoptionService.submitApplication` in `src/services/AdoptionService.ts` to accept `dog_name` and `applicant_email`).
  2. In `src/components/volunteer/VolunteerForm.tsx`, replace the direct `addDoc(collection(db, "volunteers"), ...)` call (lines 45–53) with `await VolunteerService.submitApplication({ name: data.name, email: data.email, phone: data.phone, area: data.interest, experience: data.message, user_id: user?.uid })`.
- **Done when:** Both forms use `AdoptionService` and `VolunteerService` (enforcing `rateLimiter` and `sanitizeInput`) instead of calling `addDoc` directly.

---

### `LOW-02` [DONE]: Consolidate Duplicate Schemas & Remove Unused Dead Files
- **Status:** COMPLETED
- **Area:** Code Quality (Duplicate Code & Dead Files)
- **Files:**
  1. `src/lib/validation.ts` (lines 1 and 84–124)
  2. `src/data/memorials.ts` (delete unused file)
  3. `src/data/posts.ts` (delete unused file)
  4. `src/app/community/page.tsx` (lines 3–10)
- **What to change:**
  1. In `src/lib/validation.ts`, remove the 4 unused Zod schemas at lines 84–124 (`AdoptionApplicationSchema`, `ReportSubmissionSchema`, `MemorialSubmissionSchema`, `VolunteerApplicationSchema`) that duplicate `src/lib/schemas.ts`. Keep `isSafeUrl`, `SafeUrlSchema`, `SafeOptionalUrlSchema`, `sanitizeInput`, `isValidEmail`, `isValidBDPhone`, and `RateLimiter` intact.
  2. Delete `src/data/memorials.ts` and `src/data/posts.ts` (neither file is imported anywhere in `src/`).
  3. In `src/app/community/page.tsx` lines 3–10, remove the unused imports `useState`, `Clock`, `Download`, `Heart`, `Image`, `Header`, and `Footer`.
- **Done when:** `npx tsc --noEmit` and `npm run build` pass with 0 errors.

---

### `LOW-03` [DONE]: Remove Legacy Root Migration Scripts & Log Artifacts
- **Status:** COMPLETED
- **Area:** Code Quality (Repository Cleanliness)
- **Files:**
  1. `replace_script.ps1` (delete)
  2. `replace_script_safe.ps1` (delete)
  3. `theme_migration.ps1` (delete)
  4. `theme_migration_v2.ps1` (delete)
  5. `supabase_schema.sql` (delete)
  6. `build.log` & `ts_errors.log` (delete)
  7. `.env.local.backup` (delete)
- **What to change:**
  Remove the one-off migration PowerShell scripts, old Supabase SQL schema, and build log text files from the project root `C:\Users\mysel\.gemini\antigravity\scratch\kuttawaala`.
- **Done when:** None of the listed temporary scripts or log files exist in the project root directory.
