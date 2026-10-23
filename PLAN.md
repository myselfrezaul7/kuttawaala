# Kuttawaala Modernization & Subtle UI Polish Plan

## Rules
- **Keep the existing core design identity**: Warm stone/amber/orange palette (`--primary: 32 95% 44%`), IBM Plex Sans typography, and dark/light theme support.
- **No new libraries**: Do not install any new npm packages.
- **No refactors outside the task**: Only touch the files specified in each task.
- **Strict verification**: Check TypeScript (`npx tsc --noEmit`) and production build (`npm run build`) after implementation.

---

## Do Not Touch
- `firestore.rules` & `storage.rules` — Security rules are hardened and complete.
- `src/components/3d/RainbowBridgeCanvas.tsx` — 3D memorial canvas is complete.
- `src/utils/firebase.ts` & `src/contexts/AuthContext.tsx` — Core Firebase & auth logic.
- Core color variables in `src/app/globals.css`.

---

## Diagnosis: Why the Site Currently Feels Busy & How to Make It Professional, Modern, Intuitive, Subtle & Clean

1. **PWA Install Notification Appearing Across Every Page (`PWAInstallPrompt.tsx` & `PetBhaiBanner.tsx`)**
   - **Root Cause**: `PWAInstallPrompt` is mounted in `RootLayout` (`src/app/layout.tsx`) without checking `usePathname()`, and only saves dismissal to `localStorage` if the user clicks the `X` button. If a user navigates from `/` to `/adopt` or `/find-vet` without clicking `X`, the floating banner follows them everywhere.
   - **Fix**: Restrict `PWAInstallPrompt` (and `PetBhaiBanner`) to `pathname === "/"` only, and record a session/localStorage impression flag (`kuttawaala-pwa-shown-once`) the first time it appears on the home page so it only ever previews **once** on the home page and never nags across pages.

2. **Floating Bottom-Corner Chrome Overload (`EmergencyFAB.tsx`, `PWAInstallPrompt.tsx`, `PetBhaiBanner.tsx`)**
   - **Root Cause**: On the home page, users simultaneously see a Fixed Top Pill Header, Mobile Bottom Nav, a 64x64px (`w-16 h-16`) Emergency FAB on the bottom-right, `PetBhaiBanner` on the bottom-left, AND `PWAInstallPrompt` stacked at `bottom-[148px]`.
   - **Fix**:
     - Prevent `PWAInstallPrompt` and `PetBhaiBanner` from stacking simultaneously on the screen (show at most one subtle bottom-left pill at a time, or sequence them cleanly).
     - Refine `EmergencyFAB` from a bulky `w-16 h-16` button into a sleek, modern `w-12 h-12 md:w-14 md:h-14` subtle floating trigger with a clean `1px` border and refined backdrop blur, and hide it on `/report` where the user is already reporting.

3. **Navigation Intuitiveness & Active State Clarity (`Header.tsx` & `MobileBottomNav.tsx`)**
   - **Root Cause**:
     - Desktop `Header.tsx` has **no active route indicator**—all links look identical regardless of which page you are on.
     - Desktop `Header.tsx` has 8 top-level items (`Home`, `Adopt`, `Community`, `Find a Vet`, `Report`, `PetBhai Shop [NEW]`, `Dashboard`, `Search`) which crowds the pill bar, and "PetBhai Shop" has a loud purple `NEW` badge that clashes with the warm amber/stone palette.
   - **Fix**:
     - Add `usePathname()` active pill/text highlighting in `Header.tsx` so users always have intuitive spatial awareness of where they are.
     - Replace the loud purple `NEW` tag on "PetBhai Shop" with a subtle external arrow icon (`ArrowUpRight`) or understated amber/stone badge.
     - Refine the header surface (`bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-stone-200/70 dark:border-zinc-800/80 shadow-sm`) for a crisp Apple/Linear-grade glass finish.

4. **Visual Restraint: Replacing Loud Gradients, Heavy Borders & Emoji Badges with Subtle, Editorial Surfaces**
   - **Root Cause**:
     - **Home Page (`src/app/page.tsx`, `SuccessStories.tsx`, `PromoPetBhai.tsx`)**: Uses large emoji circles (`🏚️`, `🏡`, `🐈`, `🐾`, `🥬`, `⚕️`, `📢`), thick `border-4` frames, `rounded-[3rem]` containers, and heavy `shadow-2xl` shadows.
     - **Adopt Page (`src/components/adopt/AdoptPageContent.tsx`)**: Mixes conflicting teal-to-amber gradients (`from-teal-400 to-amber-400`) and a giant `text-6xl` `📘` emoji box instead of a clean vector Facebook icon and cohesive warm stone/amber cards.
     - **Community, VetFinder & FAQ Pages**: Use bouncy animations (`animate-bounce-slow`), saturated full-bleed orange banners, and emoji-laden section titles (`Upcoming Events 📅`, `Canine Resources 📚`).
   - **Fix**:
     - Replace emoji badges (`🏚️`, `🏡`, `📘`, `🥬`, `⚕️`, `📢`, `📅`, `📚`) with crisp **Lucide vector icons** inside subtle tinted containers (`bg-primary/10 text-primary`).
     - Standardize card border radius (`rounded-2xl md:rounded-3xl`), border weight (`border border-stone-200/80 dark:border-zinc-800/80`), and subtle elevation (`shadow-sm hover:shadow-md`), toning down hover scales from `scale-105` / `scale-110` to a refined `-translate-y-0.5` or `scale-[1.01]`.

---

## Tasks (Ordered by Priority)

### [TASK-1] Restrict `PWAInstallPrompt` to appear only once on the Home Page & declutter bottom floating chrome
- **Priority:** High
- **Files:**
  - `src/components/layout/PWAInstallPrompt.tsx`
  - `src/components/layout/PetBhaiBanner.tsx`
  - `src/components/shared/EmergencyFAB.tsx`
- **Exactly what to change:**
  1. In `src/components/layout/PWAInstallPrompt.tsx`:
     - Import `usePathname` from `next/navigation`.
     - Check `const pathname = usePathname();` — if `pathname !== "/"`, do not render the prompt (`if (pathname !== "/" || !canInstall) return null;`).
     - Ensure it only appears **once** on the home page: when `canInstall` becomes `true` on `pathname === "/"` and the prompt is displayed, mark `sessionStorage.setItem("kuttawaala-pwa-shown-session", "true")` and `localStorage.setItem("kuttawaala-pwa-dismissed", "true")` upon dismissal or after a subtle 12-second auto-hide timer (or as soon as the user navigates away from `"/"`), so it never re-appears on subsequent page loads or route changes.
     - Refine its visual styling to a cleaner, more subtle pill (`bg-zinc-900/95 dark:bg-zinc-900/95 border border-zinc-800 shadow-lg`).
  2. In `src/components/layout/PetBhaiBanner.tsx`:
     - Import `usePathname` from `next/navigation` and only display on `pathname === "/"` so inner pages (`/adopt`, `/find-vet`, `/report`, `/donate`, `/faq`) stay 100% free of floating promotional popups.
  3. In `src/components/shared/EmergencyFAB.tsx`:
     - Import `usePathname` and hide the FAB on `/report` and `/login` / `/signup` where it is redundant.
     - Scale the trigger down from `w-16 h-16` (`64px`) to a sleeker, less intrusive `w-13 h-13 md:w-14 md:h-14` (`52px`/`56px`) with a subtle border (`border border-white/15`) and refined shadow (`shadow-lg hover:shadow-xl`), removing exaggerated `whileHover={{ scale: 1.1 }}` in favor of `whileHover={{ scale: 1.03 }}`.
- **Done when:** The "Install Kuttawaala App" prompt only ever appears once on the Home page (`/`), never appears on `/adopt`, `/find-vet`, `/community`, `/report`, `/donate`, or `/faq`, and the bottom viewport is clean and unobstructed.
- **Status:** [x] Done

---

### [TASK-2] Modernize Header, Navigation Active States & Footer for Intuitive Wayfinding
- **Priority:** High
- **Files:**
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
- **Exactly what to change:**
  1. In `src/components/layout/Header.tsx`:
     - Import `usePathname` from `next/navigation` and `ArrowUpRight` from `lucide-react`.
     - Add active route detection (`const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href))`) for desktop nav links:
       - Active link gets `text-primary font-semibold bg-primary/10 dark:bg-primary/15 rounded-full px-3 py-1.5`.
       - Inactive links get `text-stone-600 dark:text-stone-300 hover:text-foreground dark:hover:text-white hover:bg-stone-100/70 dark:hover:bg-zinc-800/60 rounded-full px-3 py-1.5 transition-colors`.
     - Replace the loud purple `NEW` badge on "PetBhai Shop" with a subtle `<ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground opacity-70" />`.
     - Refine header glass surface to `bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-stone-200/80 dark:border-zinc-800/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)]`.
  2. In `src/components/layout/Footer.tsx`:
     - Replace the emoji `<span>🐾</span>` in the support pill with a clean `Heart` Lucide icon.
     - Replace the heavy `from-transparent via-rose-50/50 to-secondary/50` background gradient with a clean, subtle architectural footer surface (`bg-stone-100/60 dark:bg-zinc-950 border-t border-stone-200/70 dark:border-zinc-800/80`) and clean up the inner card border.
- **Done when:** Desktop navigation clearly highlights the current active page, external links use subtle iconography instead of loud badges, and the header/footer feel cohesive and understated.
- **Status:** [x] Done

---

### [TASK-3] Refine Home Page & PetCard for Subtle, Editorial Visual Hierarchy
- **Priority:** High
- **Files:**
  - `src/app/page.tsx`
  - `src/components/home/Hero.tsx`
  - `src/components/home/PromoPetBhai.tsx`
  - `src/components/home/SuccessStories.tsx`
  - `src/components/shared/PetCard.tsx`
- **Exactly what to change:**
  1. In `src/app/page.tsx`:
     - **Transformations Section**: Replace the `🏚️` and `🏡` emoji circles with clean Lucide `ShieldAlert` / `HeartHandshake` (or `Home`) vector icons in subtle `bg-amber-500/10 text-amber-600` and `bg-emerald-500/10 text-emerald-600` badges. Refine the `BeforeAfterSlider` wrapper from `rounded-[3rem] border-4 shadow-2xl` to `rounded-3xl border border-stone-200/80 dark:border-zinc-800 shadow-lg`.
     - **Companion Chip (Visit Catwaala)**: Replace the `🐈` emoji with a clean `Cat` Lucide icon and subtle stone/teal border.
     - **Mission Section**: Remove the tilted `rotate-3` icon box (`w-20 h-20`) in favor of a subtle eyebrow pill (`Our Mission & Impact`), and refine the 3 stat cards to use clean `rounded-2xl md:rounded-3xl border border-stone-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/80 shadow-sm hover:shadow-md` instead of heavy glass shadows.
     - **Bottom CTA Section**: Refine from `rounded-[3rem] p-8 md:p-24 shadow-2xl` to a balanced `rounded-3xl p-8 md:p-16 border border-stone-200/80 dark:border-zinc-800 shadow-sm bg-white/90 dark:bg-zinc-900/90`.
  2. In `src/components/home/PromoPetBhai.tsx`:
     - Tone down the infinite floating/rotating background icons (`animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}`) into static, subtle architectural watermarks (`opacity-10`) and refine the button hover from `hover:scale-105` to `hover:-translate-y-0.5`.
  3. In `src/components/home/SuccessStories.tsx`:
     - Remove the `🐾` emoji from the heading (`Happy Tails`), replace raw `★★★★★` text with crisp Lucide `Star` icons (`w-3.5 h-3.5 fill-amber-400 text-amber-400`), and refine card borders to `border-stone-200/80 dark:border-stone-800 shadow-sm hover:shadow-md`.
  4. In `src/components/shared/PetCard.tsx`:
     - Make card hover subtle (`whileHover={{ y: -4 }}` instead of `y: -6, scale: 1.02`), image zoom gentle (`group-hover:scale-105` instead of `scale-110`), and card shadow clean (`shadow-sm hover:shadow-xl hover:shadow-black/5 border-stone-200/80 dark:border-zinc-800`).
- **Done when:** The Home page and PetCards look cohesive, editorial, and modern without raw emojis, exaggerated hover scaling, or heavy borders.
- **Status:** [x] Done

---

### [TASK-4] Polish Inner Pages (`Adopt`, `Community`, `FindVet`, `Donate`, `FAQ`) for Clean Consistency
- **Priority:** Medium
- **Files:**
  - `src/components/adopt/AdoptPageContent.tsx`
  - `src/app/community/page.tsx`
  - `src/components/vet/VetFinder.tsx`
  - `src/components/donate/DonatePage.tsx`
  - `src/app/faq/page.tsx`
- **Exactly what to change:**
  1. In `src/components/adopt/AdoptPageContent.tsx`:
     - Replace the loud orange/teal hero and `📘` / `🐾` / `💬` / `❤️` emojis with a clean, warm editorial header (`bg-stone-100/70 dark:bg-zinc-900/50 border-b border-border/60`) and Lucide icons (`Facebook`, `Clock`, `MessageCircle`, `Heart`) inside cohesive warm amber/stone icon containers.
  2. In `src/app/community/page.tsx`:
     - Remove `animate-bounce-slow`, `animate-pulse`, and heading emojis (`📅`, `📚`, `🐕`). Use clean typography and subtle card borders.
  3. In `src/components/vet/VetFinder.tsx`:
     - Refine the hero banner from a saturated full-bleed orange gradient to a clean, modern header surface consistent with `/donate` and `/faq`, and tone down service filter chip `scale-105` to a crisp border/fill transition.
  4. In `src/components/donate/DonatePage.tsx`:
     - Replace the `🥬`, `⚕️`, `📢` emojis in "Where does the money go?" with Lucide icons (`Utensils`, `Stethoscope`, `Megaphone`) in clean circular badges, and refine the option card borders from `border-[3px]` to `border` / `ring-2 ring-primary`.
  5. In `src/app/faq/page.tsx`:
     - Fix the sticky filter bar offset (`sticky top-20 z-30` so it doesn't collide with the floating header when scrolling) and refine the accordion cards to clean `shadow-sm border-stone-200/80 dark:border-zinc-800`.
- **Done when:** All core pages share a unified, subtle, high-trust visual language, `npx tsc --noEmit` passes with 0 errors, and `npm run build` succeeds.
- **Status:** [x] Done
