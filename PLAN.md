# Kuttawaala Veterinary Directory Verification, Expansion & UI Modernization Plan

## Rules
- **Keep the existing core design identity**: Warm stone/amber/orange palette (`--primary: 32 95% 44%`), IBM Plex Sans typography, and dark/light theme support.
- **No new libraries**: Do not install any new npm packages.
- **Zero unverified/fake contact numbers**: Never display fabricated or sequential placeholder numbers (`01855-123456`, `01733-445566`, `01711-000000`, etc.). Only use verified clinic/hospital phone numbers or the official Department of Livestock Services (DLS) national helpline (`16358`).
- **Strict verification**: Check TypeScript (`npx tsc --noEmit`) and production build (`npm run build`) after implementation.

---

## Do Not Touch
- `firestore.rules` & `storage.rules` — Security rules are hardened and complete.
- `src/components/3d/RainbowBridgeCanvas.tsx` — 3D memorial canvas is complete.
- `src/utils/firebase.ts` & `src/contexts/AuthContext.tsx` — Core Firebase & auth logic.

---

## Tasks (Ordered by Priority)

### [TASK-1] Cross-Check, Sanitize & Expand Nationwide Veterinary Data (`src/data/vets.ts`, `src/data/bd-vets.ts`, `src/services/VetService.ts`)
- **Priority:** High
- **Files:**
  - `src/data/vets.ts`
  - `src/data/bd-vets.ts`
  - `src/services/VetService.ts`
- **Exactly what to change:**
  1. **Fix Data Bugs & Fake Numbers (`src/data/vets.ts` & `src/data/bd-vets.ts`)**:
     - Fix duplicate `id: 203` (`Dr. Bibek Chandra` -> `213`).
     - Replace all sequential/fake placeholder numbers (`01855-123456`, `01733-445566`, `01711-122334`, `01712-111345`, `01777-889900`, `01744-556677`, `01766-778899`, `+880 1711-000000`) with verified phone numbers or the official DLS national veterinary helpline (`16358`, `usesHelpline: true`).
     - Correct Furmillion Veterinary Clinic's Mohammadpur address (`15/2, Block C, Tajmahal Road, Mohammadpur, Dhaka-1207`) and phone (`01600-011644`).
  2. **Expand Nationwide Coverage across all 8 Divisions & 64 Districts**:
     - Add verified university teaching hospitals:
       - **CVASU Teaching & Training Pet Hospital and Research Centre (Purbachal, Dhaka)**: Plot 5B, Road 114, Sector-18, Purbachal (`01960-136749`, `01814-362649`)
       - **SAU Veterinary Teaching Hospital (Sher-e-Bangla Nagar, Dhaka)**: `02-44814020`
       - **BAU Veterinary Teaching Hospital (Mymensingh)**: `02-996667401`
       - **CVASU Veterinary Hospital (Khulshi, Chattogram)**: `031-659492`, `01314-300655`
     - Add verified private pet clinics across Dhaka (Mirpur, Uttara, Dhanmondi, Banani, Bashundhara, Mohammadpur, Tikatuli, Baridhara) and regional hubs (Chattogram, Cumilla, Sylhet, Rajshahi, Khulna, Barishal, Jhalokati, Rangpur, Mymensingh).
     - Add the 9 missing Dhaka Division districts (`Tangail`, `Faridpur`, `Manikganj`, `Narsingdi`, `Kishoreganj`, `Gopalganj`, `Madaripur`, `Rajbari`, `Shariatpur`) with verified DLO numbers (`Tangail: 01716-365729`, `Narsingdi: 01711-020662`, `Narayanganj: 01730-976669`, `Bandarban: 01711-967855`) or the official DLS `16358` helpline so all **64 districts of Bangladesh** are covered.
  3. **Enrich Clinic Metadata & Division Helpers (`src/data/vets.ts`)**:
     - Export `BangladeshDivision` (`'Dhaka' | 'Chattogram' | 'Rajshahi' | 'Khulna' | 'Barishal' | 'Sylhet' | 'Rangpur' | 'Mymensingh'`), `BANGLADESH_DIVISIONS`, `VetClinicType` (`'Private' | 'Government' | 'University' | 'NGO'`), and deterministic helper functions (`getClinicDivision`, `getClinicType`, `isClinicEmergency24h`).
  4. **Smart Firestore + Local Directory Merge (`src/services/VetService.ts`)**:
     - Update `VetService.getAll()` and `VetService.getByDistrict()` so that if Firestore has `vets` documents, they are **merged** with `MOCK_VET_CLINICS` (deduplicating by normalized clinic name and district) and any legacy fake phone numbers in Firestore docs are overridden by verified local records.
- **Done when:** All 64 districts of Bangladesh and 90+ verified clinics are available with zero fake numbers, complete division/category metadata, and seamless Firestore merge.
- **Status:** [x] Done

---

### [TASK-2] Redesign `VetCard.tsx` for Clean, Intuitive, High-Trust Information Hierarchy
- **Priority:** High
- **Files:**
  - `src/components/vet/VetCard.tsx`
- **Exactly what to change:**
  - Replace the heavy glass/gradient card with a clean editorial surface (`bg-white dark:bg-zinc-900 border border-stone-200/80 dark:border-zinc-800/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-200 flex flex-col justify-between h-full`).
  - **Top Metadata Bar**:
    - District + Division pill (`MapPin` icon).
    - Semantic Category Badge (`Private Clinic`, `University Hospital`, `Govt Hospital`, `Animal Welfare NGO`).
    - Subtle `24/7 Emergency` badge with live emerald/rose dot when applicable.
    - Verified Google Rating pill when `vet.rating` is present, or a clean `"Verified Listing"` badge when `rating` is omitted (never fabricating a fake `5.0 (0 reviews)` badge).
  - **Contact & Hours Section**:
    - Clear address with 2-line clamp.
    - Primary phone number (and `altPhone` when available), or a clear `"16358 (National Vet Helpline)"` label when `usesHelpline` is true, paired with a one-tap **Copy Number** button (`Copy` / `Check` icon + `sonner` toast confirmation).
    - Operating hours and safe external website link.
  - **Bottom Action Bar**:
    - Equal-width 2-column action row (`mt-auto pt-4 border-t border-stone-100 dark:border-zinc-800/80`):
      - Primary `Call Now` (`tel:`) button.
      - Secondary `Directions` (Google Maps) button.
- **Done when:** Every `VetCard` has equal height in the grid, subtle modern styling, accurate rating/category badges, one-tap phone copy, and instant call/map actions.
- **Status:** [x] Done

---

### [TASK-3] Redesign `VetFinder.tsx` with Division Tabs, Category Pills, Smart Sorting & National Helpline Banner
- **Priority:** High
- **Files:**
  - `src/components/vet/VetFinder.tsx`
- **Exactly what to change:**
  - **Clean Header & Live Stats**:
    - Refined editorial header showing verified clinic count, `64 Districts Covered`, `24/7 Emergency Centers`, and `National Helpline: 16358`.
  - **Intuitive Multi-Layered Filter Bar**:
    - **Search Input**: Instant filtering across clinic name, area/address, district, division, phone, and services, with a quick-clear button.
    - **Division Segmented Bar**: Horizontal scrollable pills for `All Bangladesh` + all 8 Divisions (`Dhaka`, `Chattogram`, `Sylhet`, `Rajshahi`, `Khulna`, `Barishal`, `Rangpur`, `Mymensingh`) with clinic counts per division. Selecting a division automatically scopes the District dropdown.
    - **Clinic Type & Quick Filters**: Segmented pills for `All Clinics`, `24/7 Emergency`, `Private Clinics`, `University & NGO`, and `Govt Hospitals`, alongside clinical service filters (`Vaccination`, `Surgery`, `Diagnostics`, `Spay/Neuter`, `General Checkup`).
    - **Sort Selector**: Sort by `Recommended (Smart)`, `Highest Rated`, `24/7 Emergency First`, or `District (A–Z)`.
  - **Smart Default Sorting**:
    - By default (`Recommended`), prioritize 24/7 Emergency centers, University Teaching Hospitals, and verified Private/NGO companion-animal clinics ahead of generic helpline-only district livestock offices, so pet owners immediately see the most specialized pet care first.
  - **Subtle National Veterinary Helpline Banner (`16358`)**:
    - A refined, non-intrusive callout banner explaining that Bangladesh's Department of Livestock Services (DLS) operates the toll-free `16358` helpline for nationwide veterinary assistance, with one-tap call and copy buttons.
- **Done when:** Users can effortlessly filter by Division, District, Clinic Type, Emergency status, or Service, with smart default ranking and zero visual clutter.
- **Status:** [x] Done
