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
