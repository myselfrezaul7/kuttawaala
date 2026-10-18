# Kuttawaala Polish Plan — Missing Pictures & Mobile Card/Button Alignment

## Rules
- **Keep the existing design style**: Warm stone/amber/orange palette, rounded cards, existing typography.
- **No new libraries**: Do not install any new npm packages.
- **No refactors outside the task**: Only touch the files and lines specified in each task.
- **One task per session** (or batch on explicit confirmation): Verify the "Done when" check after each edit.

---

## Do Not Touch
- `firestore.rules` & `storage.rules` — Security rules are hardened and complete.
- `src/components/3d/RainbowBridgeCanvas.tsx` — 3D memorial canvas is complete.
- `src/utils/firebase.ts` & `src/contexts/AuthContext.tsx` — Core Firebase & auth logic.
- Color variables and theme tokens in `src/app/globals.css`.

---

## Root Cause Diagnosis

### A. Why Some Pictures Are Missing / Broken
1. **Silent Empty Array in `DogService.getAll()` (`src/services/DogService.ts`)**:
   - When `getDocs(q)` fails or returns 0 docs (or when Firestore has legacy docs with `image_url` instead of `imageUrl` or broken paths like `/assets/dog1.jpg` or `/assets/cat_success_1.png`), `DogService.getAll()` catches the error and returns `[]` instead of falling back to the local `dogs` seed data, leaving `FeaturedDogs` ("Meet Our Stars") empty or rendering broken image URLs.
2. **No Image Error Fallback (`onError`) or Path Normalizer on Pet Cards, Detail Pages & Memorials**:
   - `PetCard.tsx`, `adopt/[id]/page.tsx`, `MemorialList.tsx`, `dashboard/page.tsx`, and `admin/dogs/page.tsx` pass `dog.imageUrl` or `item.image_url` directly into `next/image` or `<img>` without:
     - Normalizing legacy/broken asset paths (e.g., `/assets/dog1.jpg`, `/assets/cat1.png`, empty string, or `image_url` vs `imageUrl` field names) to valid local dog photos (`/assets/placeholder-dog-1.png`, `/assets/placeholder-dog-2.png`, `/assets/placeholder-dog-3.png`).
     - Handling runtime image load errors (`onError`) so that any dead external link (e.g. expired ImgBB/Unsplash/Firebase URL) automatically swaps to `/assets/placeholder-dog-1.png` instead of showing a broken image icon.
3. **External Image Hosts in `next.config.ts` & `src/middleware.ts`**:
   - Community-submitted or admin-added dog/memorial photos hosted on `i.imgur.com`, `images.pexels.com`, or `placedog.net` are blocked by Next.js Image Optimization or CSP `img-src`.

### B. Why Some Mobile Cards & Buttons Are Misaligned
1. **Hero Buttons & Floating Badge (`src/components/home/Hero.tsx`)**:
   - On mobile (`< 640px`), the primary button ("Adopt a Dog") is a large `h-16` solid pill while the secondary button ("Become a Volunteer") strips its border (`border-none bg-transparent underline h-12`), making the two CTAs look uneven and misaligned.
   - The floating `"500+ Rescued"` badge (`-bottom-4 left-4`) on the Hero image overlaps the text section below it on mobile because the image wrapper lacks bottom spacing (`mb-6 lg:mb-0`).
2. **Featured Dogs Carousel & Uneven Card Heights (`src/components/home/FeaturedDogs.tsx` & `src/components/shared/PetCard.tsx`)**:
   - In `PetCard.tsx`, the card container lacks `h-full flex flex-col` and the content area lacks `flex-1 flex-col`, so when cards sit side-by-side in the mobile horizontal scroll carousel (`FeaturedDogs.tsx`) or grid, dogs with 1-line vs 2-line breed/tag names have different card heights and misaligned `"Meet {dog.name}"` buttons.
   - In `FeaturedDogs.tsx`, the header has `mb-16` (too large on mobile) and the `"View All Dogs"` ghost button has extra left padding (`px-6`) that makes it look indented/misaligned relative to the heading on mobile.
3. **Success Stories Mobile Card Squishing (`src/components/home/SuccessStories.tsx`)**:
   - Each mobile carousel slide (`flex-[0_0_85%]`) uses a horizontal `<div className="flex items-start gap-4">` with a fixed `w-24 h-24` (`96px`) image on the left. On a 360px screen, that leaves only ~135px for the quote text, squishing the story into a narrow vertical column.
4. **Adopt Page CTA Buttons & Filter Bar (`src/components/adopt/AdoptPageContent.tsx`)**:
   - The two Facebook CTA cards use `p-8` / `p-10` with fixed `px-10 h-16 text-lg` buttons (`"Visit Our Facebook Group"` and `"Join the Facebook Group"`). On 360px mobile screens, `px-10 text-lg` overflows the card width or wraps awkwardly.
5. **Pet Detail Page Quick Stats & PetBhai Upsell Card (`src/app/adopt/[id]/page.tsx`)**:
   - The 3-column Quick Stats row (`grid-cols-3 gap-4`) with `p-4` cards overflows long breed names (`"Desi Puppy (Bangladeshi Stray)"`) at 360px.
   - The PetBhai Upsell banner (`flex items-center justify-between gap-4`) never stacks on mobile (`flex-col sm:flex-row`), cramping the text against the `"Shop Now"` button.
6. **Quiz, Report, Dashboard & Adoption Form Top Navbar Overlap & Mobile Card Alignment (`src/app/quiz/page.tsx`, `src/components/report/ReportForm.tsx`, `src/app/dashboard/page.tsx`, `src/app/adoption-form/page.tsx`)**:
   - Because `Header` is `fixed top-4`, pages using `py-12` or `p-4` (`quiz/page.tsx`, `ReportForm.tsx`, `dashboard/page.tsx`, `adoption-form/page.tsx`) have their top headers/buttons overlapped by the floating navbar on mobile.
   - In `quiz/page.tsx`, the option cards lack `shrink-0` on the `w-14 h-14` emoji box and `w-8 h-8` checkmark circle, squishing them into ovals on mobile.
   - In `ReportForm.tsx`, the Facebook banner inner row (`flex items-center gap-5`) keeps the icon beside centered text on mobile instead of stacking cleanly (`flex-col sm:flex-row`), and `"Post in Group"` lacks `w-full sm:w-auto`.

---

## Tasks (Ordered by Priority)

### [IMG-01] Create safe image normalizer & fallback helper and wire into `DogService` & `MemorialService`
- **Priority:** High
- **Files:**
  - `src/utils/imageFallback.ts` (new helper)
  - `src/services/DogService.ts`
  - `src/services/MemorialService.ts`
  - `next.config.ts`
  - `src/middleware.ts`
- **Exactly what to change:**
  1. Create `src/utils/imageFallback.ts` with `resolveDogImage(url?: string | null, fallbackIndex?: number): string`:
     - Returns a valid image path from `['/assets/placeholder-dog-1.png', '/assets/placeholder-dog-2.png', '/assets/placeholder-dog-3.png']` whenever `url` is empty, whitespace, not starting with `/` or `http`, or matches known broken/legacy paths (`/assets/dog`, `/assets/cat`, `/assets/kitten`, `placeholder.com`, `unsplash.com/broken`).
  2. In `src/services/DogService.ts`:
     - In `getAll()`: if `snapshot.docs` is empty, return `[...dogs]`; if an error occurs in `catch`, return `[...dogs]` instead of `[]` so `"Meet Our Stars"` and `/adopt` never lose their dogs and images.
     - Normalize each dog's `imageUrl` using `resolveDogImage(data.imageUrl || data.image_url, index)`.
  3. In `src/services/MemorialService.ts`:
     - Normalize `image_url` using `resolveDogImage(data.image_url || data.imageUrl, index)`.
  4. In `next.config.ts` and `src/middleware.ts`:
     - Add `i.imgur.com` and `images.pexels.com` to `images.remotePatterns` and CSP `img-src`.
- **Done when:** `DogService.getAll()` never returns an empty array on empty/errored Firestore, legacy `image_url` or broken `/assets/dog*.jpg` paths resolve to valid local dog photos, and `npx tsc --noEmit` passes.
- **Status:** [x] Done

---

### [IMG-02] Add runtime `onError` image fallback across `PetCard`, `AdoptDetail`, `MemorialList`, `BeforeAfterSlider`, and `Dashboard`
- **Priority:** High
- **Files:**
  - `src/components/shared/PetCard.tsx`
  - `src/components/adopt/DogDetailImage.tsx` (new small client wrapper for `src/app/adopt/[id]/page.tsx`)
  - `src/app/adopt/[id]/page.tsx`
  - `src/components/memorial/MemorialList.tsx`
  - `src/app/dashboard/page.tsx`
- **Exactly what to change:**
  1. In `src/components/shared/PetCard.tsx`:
     - Add state `const [imgSrc, setImgSrc] = useState(() => resolveDogImage(dog.imageUrl));` and update `onError={() => setImgSrc("/assets/placeholder-dog-1.png")}` on `<Image />`.
  2. Create `src/components/adopt/DogDetailImage.tsx` with `<Image src={imgSrc} onError={() => setImgSrc("/assets/placeholder-dog-1.png")} ... />` and use it in `src/app/adopt/[id]/page.tsx`.
  3. In `src/components/memorial/MemorialList.tsx`:
     - Use `resolveDogImage(item.image_url, index)` and add an `onError` handler that swaps any broken external memorial photo to `/assets/placeholder-dog-2.png`.
  4. In `src/app/dashboard/page.tsx`:
     - Add `onError` fallback on report images (`report.image_url`) and user avatars so broken image icons never appear.
- **Done when:** Every dog card, dog profile page, memorial tribute, and dashboard report image gracefully falls back to a high-res local dog photo if the source URL fails to load.
- **Status:** [x] Done

---

### [MOB-01] Fix Hero buttons, badge overlap, and FeaturedDogs card/button alignment on mobile
- **Priority:** High
- **Files:**
  - `src/components/home/Hero.tsx`
  - `src/components/home/FeaturedDogs.tsx`
  - `src/components/shared/PetCard.tsx`
- **Exactly what to change:**
  1. In `src/components/home/Hero.tsx`:
     - Make both Hero CTA buttons consistent and aligned on mobile: give `"Adopt a Dog"` `h-14 sm:h-14 w-full sm:w-auto px-8 rounded-full` and give `"Become a Volunteer"` `h-14 sm:h-14 w-full sm:w-auto px-8 rounded-full border-2 border-primary/20 bg-white/80 dark:bg-zinc-900/80 text-primary font-bold shadow-sm` (removing the mismatched `border-none underline h-12` mobile override).
     - Add `mb-6 lg:mb-0` to the Hero image column (`order-1 lg:order-2`) so the `-bottom-4` `"500+ Rescued"` badge never collides with the heading below it on mobile.
  2. In `src/components/shared/PetCard.tsx`:
     - Add `h-full flex flex-col` to the outer `motion.div`, `flex-1 flex flex-col` to the `<div className="p-4 sm:p-6">`, and `mt-auto pt-3` to the bottom action wrapper so all cards in a row/carousel have identical height and aligned `"Meet {dog.name}"` buttons.
  3. In `src/components/home/FeaturedDogs.tsx`:
     - Change header margin from `mb-16` to `mb-8 md:mb-14` and align the `"View All Dogs"` button cleanly on mobile (`w-full sm:w-auto justify-between sm:justify-center border border-primary/20 sm:border-transparent`).
     - Ensure carousel items (`min-w-[85%] sm:min-w-0`) have `flex` stretching so all cards match height.
- **Done when:** Hero buttons are equal width/height and styled consistently on 360px mobile; FeaturedDogs cards have equal heights and aligned bottom buttons.
- **Status:** [x] Done

---

### [MOB-02] Fix SuccessStories, Mission stats, and PromoPetBhai mobile card layouts
- **Priority:** High
- **Files:**
  - `src/components/home/SuccessStories.tsx`
  - `src/components/home/PromoPetBhai.tsx`
  - `src/app/page.tsx`
- **Exactly what to change:**
  1. In `src/components/home/SuccessStories.tsx`:
     - Inside the mobile Embla carousel card (line 108), change `<div className="flex items-start gap-4">` to `<div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">` and center the star rating (`justify-center sm:justify-start`) so the quote text has the full card width on 360px phones instead of being squished beside a 96px image.
  2. In `src/components/home/PromoPetBhai.tsx`:
     - Make the `"Explore PetBhai"` CTA button full-width on mobile (`w-full sm:w-auto h-13 sm:h-14 px-6 sm:px-8`) and center the feature list items cleanly on mobile (`text-left max-w-xs mx-auto lg:mx-0`).
  3. In `src/app/page.tsx`:
     - In the Mission Section (line 164), reduce `mb-20` on the subtitle to `mb-10 md:mb-20` so there isn't a huge empty gap above the mobile stats cards.
- **Done when:** SuccessStories quotes read cleanly across full card width on 360px mobile, PromoPetBhai button and features align properly, and Mission stats spacing is balanced.
- **Status:** [x] Done

---

### [MOB-03] Fix Adopt page CTA buttons, Pet Detail stats/upsell card, and Memorial modal/buttons on mobile
- **Priority:** Medium
- **Files:**
  - `src/components/adopt/AdoptPageContent.tsx`
  - `src/app/adopt/[id]/page.tsx`
  - `src/components/memorial/MemorialList.tsx`
- **Exactly what to change:**
  1. In `src/components/adopt/AdoptPageContent.tsx`:
     - On both Facebook CTA cards (lines 126–147 and 208–228), adjust padding to `p-6 sm:p-8 md:p-10` and button classes to `w-full sm:w-auto px-6 sm:px-10 h-14 sm:h-16 text-base sm:text-lg` so the button text never overflows or wraps awkwardly on 360px screens.
  2. In `src/app/adopt/[id]/page.tsx`:
     - Change the Quick Stats grid (line 118) from `grid-cols-3 gap-4` with `p-4` and `text-lg` to `grid-cols-3 gap-2 sm:gap-4` with `p-3 sm:p-4` and `text-sm sm:text-lg break-words` so long breed names fit cleanly inside their stat box on 360px screens.
     - Change the PetBhai Contextual Upsell container (line 165) from `flex items-center justify-between gap-4` to `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4` and make its `"Shop Now"` link/button `w-full sm:w-auto`.
  3. In `src/components/memorial/MemorialList.tsx`:
     - Ensure all tribute cards have `h-full flex flex-col` and the `"Light a Candle"` button container sits at `mt-auto pt-4` so buttons align horizontally across cards.
- **Done when:** Adopt CTA buttons, Pet Detail quick stats, PetBhai upsell card, and Memorial cards align without overflow at 360px.
- **Status:** [x] Done

---

### [MOB-04] Fix top navbar overlap and mobile button/card alignment in Quiz, ReportForm, Dashboard, and AdoptionForm
- **Priority:** Medium
- **Files:**
  - `src/app/quiz/page.tsx`
  - `src/components/report/ReportForm.tsx`
  - `src/app/dashboard/page.tsx`
  - `src/app/adoption-form/page.tsx`
- **Exactly what to change:**
  1. In `src/app/quiz/page.tsx`:
     - Add `pt-24 md:pt-28` to the quiz header container (line 195) and results container (line 137) so the fixed navbar never overlaps the `"Exit"` button or step indicator.
     - Add `shrink-0` to the `w-12 h-12 sm:w-14 sm:h-14` option icon box and `w-8 h-8 shrink-0` to the checkmark circle, and change option text to `text-base sm:text-xl` so long answers don't squash the icons on 360px phones.
  2. In `src/components/report/ReportForm.tsx`:
     - Change outer wrapper padding (line 188) from `py-12` to `pt-24 pb-28 md:py-28` so the step indicator clears the top navbar and the navigation buttons clear the bottom mobile nav.
     - In the Facebook Community Banner (line 221), change `<div className="flex items-center gap-5">` to `<div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">` and make the `"Post in Group"` button `w-full sm:w-auto`.
  3. In `src/app/dashboard/page.tsx`:
     - Change container padding (line 100) from `py-12` to `pt-24 pb-12 md:pt-28` so the Profile Card clears the fixed navbar, and make the Profile action buttons (`Edit Profile`, `Find a Dog`, `Sign Out`) align cleanly on mobile.
  4. In `src/app/adoption-form/page.tsx`:
     - Change outer wrapper padding (line 12) from `p-4 sm:p-8 md:p-12` to `pt-24 pb-24 px-4 sm:px-8 md:pt-28 md:pb-16 print:p-0` so the `"Print / Save as PDF"` button isn't hidden behind the fixed navbar on screen.
- **Done when:** Quiz, Report, Dashboard, and AdoptionForm pages have zero overlap with the fixed top/bottom navigation bars and all option cards/buttons stay aligned at 360px.
- **Status:** [x] Done
