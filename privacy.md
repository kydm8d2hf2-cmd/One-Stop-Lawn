# One Stop Lawn — Privacy Policy

**Effective Date:** September 2, 2026
**App Version:** 1.9
**Owner:** One Stop Lawn, LLC, registered in South Carolina, USA

---

## Summary

One Stop Lawn helps you care for your lawn using AI-powered identification, weather data, soil testing guidance, and journaling. We collect the minimum data needed to make those features work. Your lawn data and photos stay on your device, backed up to your iCloud or Google Drive account, unless you explicitly use a feature that requires sending data to a third party (clearly marked below).

**We do not sell your data. We do not use your data for advertising. We do not share your data with anyone except the specific service providers listed below who help us operate the app.**

---

## What We Collect

### Information you provide directly
- ZIP code (required for weather and growing-zone calculations)
- Grass type, lawn size, and zone names you enter
- Optional address you input into the lawn measuring tool (used only on-device to position the map; we do not store it on our servers)
- Photos you choose to attach to AI features, save to your Lawn Journal, or save to your Wall of Fame
- Soil test data and product application records you enter
- Subscription tier selection and trial activation timestamps

### Information collected automatically
- Approximate location coordinates (latitude/longitude derived from your ZIP code) used to fetch weather and soil data from public weather services
- **Anonymous usage events.** The app records a small, fixed set of product-interaction events — that onboarding was started or completed, that the free explore window started or ended, that the upgrade screen was shown, and that a trial was started. Each event is stored as a single dated count with the platform (iOS or Android) and app version. No account, device identifier, advertising identifier, IP address, or location is attached, and the events cannot be linked to you. They are used only in aggregate, to see which parts of the app people reach.
- **Session grouping.** Each event also carries a random session identifier. It is generated afresh every time the app starts, held only in memory, and discarded when the app closes — it is never written to your device and never sent anywhere else. Two separate launches on the same phone produce two unrelated values, so it cannot be used to recognise a device or to follow anyone over time. Its only purpose is to tell apart events that came from one visit to the app and events that came from several different people.
- These events **never** include personal content — journal entries, photos, AI questions, soil values, or your lawn address are not collected for analytics under any circumstances.
- We do **not** collect crash-report data.
- Purchase and subscription transaction data, processed by the App Store / Google Play and our subscription manager RevenueCat (an anonymized app-user ID and your purchase history; no name, email, or payment details reach us)

### Information we do NOT collect
- Your real name (unless you put it in a lawn name)
- Your phone number, email, or contact information (the app does not require an account)
- Your precise device location (we use ZIP-based approximate location only)
- Your contacts, photos other than ones you explicitly attach, calendar, or any other system-level data
- Tracking data across other apps or websites

---

## Lawful Basis for Processing (GDPR / EU users)

For users in the European Union, European Economic Area, or United Kingdom, we rely on the following lawful bases under Article 6 of the GDPR (and equivalent UK provisions):

- **Performance of a contract (Article 6(1)(b))** — Processing necessary to provide the App's core features (lawn calculations, AI identification, weather data) which you have requested by using the App
- **Legitimate interests (Article 6(1)(f))** — Processing necessary to improve the App's functionality, prevent abuse of our API endpoints, and maintain service quality
- **Consent (Article 6(1)(a))** — Where you have explicitly opted in to optional features such as Rachio integration or feedback submission

You may withdraw consent for any consent-based processing at any time by ceasing to use that feature (e.g., disconnecting your Rachio account in Settings).

---

## Where Your Data Lives

### On your device
- Lawn names, zone names, journal entries, soil test history, schedules, photos, Wall of Fame photos, and subscription tier selection are stored locally on your device
- This data is **not stored on our servers**

### Backed up to your cloud account
- Your data is automatically backed up to your iCloud account (iOS users) or Google Drive (Android users) via your device's standard backup mechanism
- **We do not have access to these backups.** They are managed entirely by Apple or Google and encrypted with your account credentials
- You can disable cloud backup in your device settings (iOS: Settings → [Your Name] → iCloud; Android: Settings → System → Backup)
- If you disable cloud backup, your data exists only on your current device

### On our backend
- We do NOT store user data on our backend
- API requests (AI prompts, weather lookups) pass through our Vercel proxy in real time and are not persisted
- Server logs may briefly capture request metadata for operational purposes; see "Data Retention" below

---

## Photo and Image Handling

When you use a feature that involves a photo (Ask AI image attachment, Field Guide weed/insect/fungus/grass identification, fertilizer label scanning, baseline photos, Wall of Fame photos, or journal entry photos), the following applies:

### Photos sent for AI identification
- Resized to 1200 pixels max and JPEG-compressed before transmission
- Sent through our backend proxy (hosted on Vercel) to Anthropic's Claude API
- Used only to generate the AI response you requested
- **Not retained by Anthropic for model training** under their commercial API terms (see https://www.anthropic.com/legal/privacy)
- **Not stored on our servers** — the proxy forwards the request and response without persisting the image
- May appear briefly in our Vercel server logs alongside the request, automatically deleted per Vercel's standard retention

### Photos saved to your device
- Lawn Journal photos and Wall of Fame photos are stored only in your device's local storage
- These photos are not uploaded to any server (except as described above for AI identification)
- They are backed up to your iCloud or Google Drive account via your device's standard backup, accessible only to you
- They are deleted when you delete the entry or when you clear the app's local data

### Photo Library and Camera Access
- The app may request access to your photo library or camera when you choose to attach a photo
- These permissions are managed by your device's operating system
- You can revoke access at any time without losing app functionality

### EXIF metadata
- Photos may contain EXIF metadata such as the date the photo was taken
- We extract only the DateTimeOriginal field to populate the photo's date in your Wall of Fame timeline
- We do not extract or transmit GPS coordinates from your photos
- The full image (with whatever metadata it originally contained) is sent to Anthropic when you use AI identification — Anthropic's privacy practices apply to that transmission

---

## Automated Decision-Making

Some App features use AI to make automated assessments (weed identification, insect identification, fungus identification, grass type identification, soil test analysis). These assessments may inform recommendations you receive in the App.

**These are guidance, not decisions with legal or significant effect.** AI identifications can be wrong, and you should verify any recommendation before applying chemicals or making lawn care decisions. You have the right to challenge any AI-generated guidance and seek human review by contacting support@onestoplawnapp.com.

Per GDPR Article 22, you have the right not to be subject to decisions based solely on automated processing that produce legal or similarly significant effects. None of our features produce such effects — all final decisions (e.g., whether to apply a treatment) remain entirely with you.

---

## Cookies and Local Storage

The App uses your device's local storage (e.g., browser localStorage on web, app-private storage on iOS/Android) to remember your lawn profile, journal entries, subscription state, and preferences. This is technically necessary for the App to function and is exempt from cookie consent requirements under ePrivacy Directive Article 5(3).

We do not use:
- Tracking cookies
- Third-party advertising cookies
- Cross-site or cross-app identifiers
- Third-party analytics or advertising SDKs

The anonymous usage events described above are sent directly to our own backend. They do not use cookies, do not set any identifier on your device, and are not used for tracking as defined by the ePrivacy Directive or Apple's App Tracking Transparency framework.

---

## Third-Party Services We Use

We use a small number of third-party services to operate the app. Each is described here with a link to their privacy policy.

| Service | What it does | Data sent | Location | Privacy Policy |
|---|---|---|---|---|
| **Anthropic (Claude API)** | Powers all AI features | Photo data and text prompts; ZIP code and grass type for context | USA | https://www.anthropic.com/legal/privacy |
| **Vercel** | Hosts our backend proxy that forwards AI requests | Request payloads pass through; not retained | USA | https://vercel.com/legal/privacy-policy |
| **National Weather Service (NWS)** | Provides forecasts, soil temperature, and rainfall data | Approximate latitude/longitude derived from your ZIP | USA | https://www.weather.gov/disclaimer |
| **Open-Meteo / Zippopotam** | Geocodes ZIP to coordinates if NWS data is unavailable | ZIP code | EU (Open-Meteo) | https://open-meteo.com/en/terms |
| **Rachio** (optional) | Auto-syncs sprinkler schedule and watering history if you connect your account | Your Rachio Personal Access Token | USA | https://rachio.com/privacy |
| **Tally.so** (optional) | Hosts our feedback form | Whatever you choose to type in the form | EU (Belgium) | https://tally.so/privacy |
| **Apple iCloud** (iOS) | Stores your encrypted device backup (includes app data) | All app data on your device | Per your iCloud region | https://www.apple.com/legal/privacy |
| **Google Drive** (Android) | Stores your encrypted device backup (includes app data) | All app data on your device | Per your Google account region | https://policies.google.com/privacy |

We do not use Google Analytics, Facebook Pixel, advertising networks, or any other third-party tracking services. Our own anonymous usage counts, described above, are the only analytics of any kind in the app.

---

## International Data Transfers

One Stop Lawn, LLC is based in the United States. Some of our service providers (Anthropic, Vercel, Rachio) are also based in the United States. This means data you send to these services may be transferred to and processed in the United States.

For users in the European Union, European Economic Area, or United Kingdom, we rely on the following safeguards for international data transfers under GDPR Chapter V:

- **EU-US Data Privacy Framework**, where applicable to the receiving service
- **Standard Contractual Clauses (SCCs)** adopted by the European Commission, as provided by our service providers in their terms of service
- **Data minimization** — we only transfer the minimum data necessary for the requested feature

If you are an EU/EEA/UK user, you may request information about the specific safeguards in place for any data transfer by contacting us at support@onestoplawnapp.com.

---

## How We Use Your Data

- **Lawn calculations and recommendations:** Your ZIP, grass type, and lawn size drive seasonal task recommendations, watering schedules, and product suggestions
- **AI features:** Photos and text you submit are used to generate the requested identification or response, then discarded by us
- **Storage on your device:** Journal entries, Wall of Fame photos, soil test history, schedules, and zones are stored locally and backed up via your cloud account
- **Subscription management:** Your tier selection and trial dates are stored locally and used to gate premium features

We do not use your data for any other purpose. We do not advertise. We do not sell your data.

---

## Data Retention

- **On your device:** All your local data persists until you uninstall the app or clear its local storage
- **In your cloud backup (iCloud / Google Drive):** Persists according to Apple's or Google's retention policies, controlled by you
- **In our backend:** We do not store user data on our backend. The proxy forwards AI requests in real time and does not persist them
- **In server logs:** Vercel may keep request logs for up to 30 days for operational purposes; we cannot tie those logs back to a specific user since we do not collect user identifiers

---

## Your Rights

Because we do not maintain accounts or store your data on our servers, most data control happens directly on your device. Specific rights depending on your location:

### All users
- **Access:** Use Settings → Export Data to download a JSON copy of everything stored on your device
- **Deletion:** Delete individual journal entries, photos, or zones from within the app, OR clear all app data via your device settings to erase everything at once
- **Photo permissions:** Revoke camera or photo library access at any time via your device's Settings → Privacy

### Additional rights for EU / EEA / UK users (GDPR + UK GDPR)

Under the GDPR (and UK GDPR), you have the following rights regarding your personal data:

- **Right of access (Article 15)** — Request a copy of personal data we hold about you (use Settings → Export Data within the App)
- **Right to rectification (Article 16)** — Correct inaccurate data (edit it directly in the App)
- **Right to erasure / "right to be forgotten" (Article 17)** — Delete your data (delete entries within the App, or clear all data via device settings)
- **Right to restriction of processing (Article 18)** — Limit how we process your data
- **Right to data portability (Article 20)** — Receive your data in a structured, commonly used format (JSON export)
- **Right to object (Article 21)** — Object to processing based on legitimate interests
- **Right not to be subject to automated decision-making (Article 22)** — See "Automated Decision-Making" above
- **Right to withdraw consent (Article 7(3))** — Where processing is based on consent, you may withdraw it at any time
- **Right to lodge a complaint** — You may lodge a complaint with your national data protection authority (a list of EU authorities is available at https://edpb.europa.eu/about-edpb/about-edpb/members_en; the UK equivalent is the ICO at https://ico.org.uk/)

To exercise any of these rights, contact us at support@onestoplawnapp.com. We will respond within 30 days (or notify you of any extension as permitted by GDPR Article 12(3)).

### Additional rights for California residents (CCPA / CPRA)

Under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA), California residents have:

- The right to know what personal information is collected
- The right to delete personal information
- The right to opt out of the sale or sharing of personal information (we do not sell or share personal information)
- The right to non-discrimination for exercising these rights
- The right to correct inaccurate personal information

To exercise these rights, contact us at support@onestoplawnapp.com.

---

## EU Representative

One Stop Lawn, LLC is currently evaluating whether it qualifies for the small-scale processing exemption under GDPR Article 27(2). Our processing activities are:

- Limited in scope (lawn care data only)
- Occasional and non-systematic
- Not likely to result in risk to the rights and freedoms of natural persons
- Not involving special categories of data (Article 9) or criminal offense data (Article 10)

If you are an EU/EEA user and wish to contact us regarding your data, please reach out directly at support@onestoplawnapp.com.

If we later appoint an EU representative, this policy will be updated with their contact information.

---

## Children's Privacy

This app is intended for users 13 years of age and older. We do not knowingly collect data from children under 13. The App is not designed to appeal to or be used by children, and we do not market it to children.

**For users in the European Union:** The age of digital consent under GDPR varies by member state, ranging from 13 to 16. In jurisdictions where the age is higher than 13, users below the local age of digital consent must have verifiable parental consent before using the App.

If you are a parent or guardian and believe your child under the relevant age of digital consent has provided personal data to us, please contact us at support@onestoplawnapp.com and we will work to delete the data.

---

## Data Breach Notification

In the event of a personal data breach that is likely to result in a risk to the rights and freedoms of natural persons, we will:

- Notify the relevant supervisory authority (where required) within 72 hours of becoming aware of the breach, in accordance with GDPR Article 33
- Notify affected users without undue delay, in accordance with GDPR Article 34, where the breach is likely to result in a high risk to their rights and freedoms

Because we do not store user data on our servers, the practical risk of a breach affecting your personal data is significantly reduced compared to apps that maintain user databases.

---

## Changes to This Policy

When we update this policy, we will:
- Update the "Effective Date" at the top
- Notify you via an in-app notice the next time you open the app
- Keep older versions accessible by request

Material changes that affect how your data is handled will be highlighted in the in-app notice.

---

## Contact

**Data Controller:**
One Stop Lawn, LLC
South Carolina, USA

**Privacy questions or data subject requests:**
Email: support@onestoplawnapp.com

**For questions about Anthropic's data handling:**
Contact Anthropic directly at https://www.anthropic.com/legal/privacy

---

## Version History

- **1.9 (September 2, 2026):** Events now carry a random per-launch session identifier, described above. It is not stored on your device and cannot connect two app launches, so the store privacy declarations are unchanged; the previous wording that events could not be linked to each other has been corrected, since events within a single launch now can be.
- **1.6 (August 22, 2026 — this version):** The app now records a small set of anonymous usage events; this policy describes exactly what they contain and what they do not. Removed the reference to a "Send anonymous diagnostics" setting — that control has been removed from the app, because the events carry no identifier, cannot be linked to a person, and are not used for tracking. Added Supabase to the third-party services table. Restated the cookies section to make clear these events set no identifier. Note: this file had drifted behind privacy.html; the HTML was treated as authoritative and this version brings the two back in line.
- **1.0 (June 16, 2026 — release version):** Set app version to 1.0 for launch. Added RevenueCat and App Store / Google Play billing to third-party services for subscription management. Clarified that Open-Meteo provides soil temperature and rainfall data.
- **May 17, 2026 (this version):** Added GDPR-specific sections — lawful basis, full user rights, international data transfers, automated decision-making disclosure, EU representative status, data breach notification, cookies/local storage disclosure. Added cloud backup disclosure (iCloud / Google Drive). Strengthened Children's Privacy section for EU age-of-consent variations. Added CCPA/CPRA section for California residents.
- **v200 (May 4, 2026):** Added Photo and Image Handling section, EXIF metadata disclosure, updated third-party services table.
