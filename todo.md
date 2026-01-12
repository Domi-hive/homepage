# Revert Tasks

- [ ] Revert `RequestFormDrawer.tsx` payload changes
    - **Current (Temporary) Payload:**
        ```typescript
        {
            bedrooms: Number(bedrooms),
            bathrooms: Number(bathrooms),
            cities: string[], // [selectedLocations] or [location]
            state: "Lagos", // Hardcoded
            minPrice: number,
            maxPrice: number
        }
        ```
    - **Original (Expected) Payload:**
        ```typescript
        {
            location: string, // comma separated string
            propertyType: string, // comma separated string
            bedrooms: string | number,
            bathrooms: string | number,
            offerType: string,
            budgetRange: string, // formatted string "₦X - ₦Y"
            additionalInfo: string
        }
        ```
    - **Action:** Uncomment the original `createPropertyRequest` call and remove the temporary `testPayload` and manual `requestService` call. Remove the `as any` cast.

---

# AddPropertyDrawer → Listing Creation API Gaps

## Form-to-API Mapping Status

### Implemented (mapped in current integration):
- [x] `offerType` → `listing.type` (rent→for_rent, sale→for_sale, shortlet→for_rent)
- [x] `price` → `listing.price` (Number)
- [x] `address` → `property.address`
- [x] `state` → `property.state`
- [x] `neighborhood` → `property.city`
- [x] `beds` → `property.bedrooms`
- [x] `baths` → `property.bathrooms`
- [x] `sqm` → `property.squareMeters`
- [x] `description` → `property.description`
- [x] `meetingPoint` → `listing.meetingPoint`
- [x] `country` → Hardcoded to "Nigeria"

### Gaps - Frontend form needs to be updated:
- [ ] **propertyTypeId**: API expects UUID, form sends string like "apartment". Need to:
    - Create property types endpoint or hardcode mapping
    - Update the form select to use UUIDs
- [ ] **inspectionDates**: API expects ISO date strings (`["2025-01-05T10:00:00.000Z"]`), form only has `availableDays` (days of week like "Monday"). Need to:
    - Add date/time picker for inspection dates
    - Or implement a hybrid approach
- [ ] **listingPeriod**: API expects "yearly" | "monthly" | "weekly", form doesn't have this field. Need to:
    - Add listingPeriod select (only for rent listings)
- [ ] **imageUrls**: API expects array of URLs, form has file upload zone but no actual upload implementation. Need to:
    - Implement file upload to storage (e.g., S3, Cloudinary)
    - Get back URLs to send to API
- [ ] **yearBuilt**: API accepts this but form doesn't have it. Optional, can add later.
- [ ] **features**: API accepts array of strings, form doesn't have amenities/features checklist. Need to:
    - Add features/amenities multi-select or checkboxes

---

# Listing Status API Nomenclature

## Current Implementation (Temporary)
- **Frontend displays**: "Available" / "Unavailable"
- **Backend expects**: "active" / "rented"
- The `updateListingStatus` service method maps `isAvailable: true` → `{ status: 'active' }` and `isAvailable: false` → `{ status: 'rented' }`

## Future Update
- [ ] Request backend team to add proper "available" / "unavailable" status values
- [ ] Once backend supports it, update `listing.service.ts` to use proper status values
- The current mapping works but "rented" doesn't semantically cover all unavailable scenarios (e.g., property taken off market, under maintenance, etc.)

---

# Referrals Toggle API

## Current Implementation (Frontend Only)
- Referrals toggle works on individual cards and via bulk action
- Currently using **optimistic updates** (local state only)
- No API endpoint exists yet

## When API is Available
- [ ] Add `updateListingReferrals(listingId, referralsOn)` to `listing.service.ts`
- [ ] Update `handleReferralToggle` in `my-listings/page.tsx` to call API
- [ ] Update `handleBulkReferralToggle` to call API for each selected listing (or batch endpoint)
- [ ] Add proper error handling with rollback on failure

---

# Listing Card Actions UX

## Decided: Options Menu Approach
- Put Edit and Delete inside the MoreVertical (⋮) options menu
- Reasons:
  - Cleaner cards with less visual clutter
  - Delete is destructive, menu adds natural barrier
  - Consistent with common patterns (Gmail, Trello, etc.)
  - Mobile-friendly with fewer touch targets

## To Implement
- [x] Create dropdown menu from MoreVertical button
- [x] Add menu items: Edit, Delete, View Details
- [x] Add confirmation dialog for Delete action
- [x] Add delete API integration

---

# KYC Document Type Workaround

## Current Issue
- **Backend document types**: `nin` and `voter's card`
- **Frontend needs**: `nin` and `selfie`
- **Workaround**: Using voter's card ID for selfie uploads

## When Backend is Updated
- [ ] Backend team to add `selfie` document type and remove `voter's card` requirement
- [ ] Update `kyc.service.ts` to use proper `selfie` document type name
- [ ] Remove DOCUMENT_TYPE_NAMES mapping workaround

---

# KYC File Upload Implementation

## Current State
- KYCTab accepts file selection and validates files
- Uses placeholder URL for document submission
- API integration is ready, just needs real file URLs

## To Implement
- [ ] Implement file upload to S3/Cloudinary/Supabase Storage
- [ ] Get back permanent URL after upload
- [ ] Pass real URL to KYC document submission API
- [ ] Add upload progress indicator

---

# Two-Step Funnel (Recommended)

## Concept
Replace the current full form with a multi-step process to reduce friction and increase commitment.

**Flow:**
1.  **Step 1 (Landing Page)**: "What type of property are you looking for?"
    -   Options: Apartment, House, Duplex, Land (Visual buttons)
    -   *Goal: Low initial friction, micro-commitment.*
2.  **Step 2 (Next Screen)**: Location + Budget.
3.  **Step 3**: Create account + finalize request.

## Why This Works
-   **Lower Friction**: One simple visual choice is easier/faster than 9 form fields.
-   **Psychological Commitment**: Users who start are more likely to finish (`Foot-in-the-door` technique).
-   **Better Data**: Capture intent even if they drop off later.
-   **Mobile Experience**: Much better for small screens (tap vs type).
-   **Simpler Tech**: No pre-account storage complexity needed immediately.

## Action Items
-   [ ] Remove full form from hero section.
-   [ ] Implement Step 1 Component (Property Type Buttons) in Hero.
-   [ ] Create Step 2 form for Location & Budget.
-   [ ] Wire up flow: Step 1 -> Step 2 -> Signup/Login.
