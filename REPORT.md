Before diving into the details, I should mention that this project is built using Remix, which is a React-based framework (the reasons for choosing Remix are explained).

For this project, I first designed a login page for doctors to access the dashboard. The login requests are sent to https://reqres.in/, so you must enter the provided email and password to successfully log in.

I have used a set of local APIs to simulate and replace the absence of backend services. Additionally, I have optimized them using React Query to enhance performance and efficiency.
this local api's in located in this files: api.doctorProfile.tsx & api.patientProfile.tsx

Some of the buttons are interactive as examples, while others are not, since they are similar in functionality.
Additionally, for the content that appears after clicking the buttons, placeholder text has been used, which can later be replaced with appropriate content.

If you encounter any issues with package installation or logging into the dashboard, pleeeeease feel free to contact me. 🚀


BIOARC Project Report
Introduction
The Bioarc project is a React-based web application designed for medical management systems. It leverages Remix as the framework and Chakra UI for the user interface. The main objective of this project is to provide an integrated, efficient, and user-friendly platform for doctors and medical staff to manage patients, appointments, and video calls seamlessly.

Project Structure
Bioarc follows a component-driven architecture, optimizing both performance and code reusability. Below is an overview of the key technologies used and the reasoning behind their selection:

1️⃣ Technologies and Their Advantages
🔹 Remix vs. React/Next.js
Why choose Remix?

Enhanced Server-Side Management – Remix employs nested routing with loaders and actions, enabling fine-grained data handling at each route level.
Superior Optimization – Its resource preloading system outperforms Next.js, improving page performance.
Granular Error Handling – Errors can be handled at the component level, rather than globally at the page level.
Progressive Loading – Utilizes defer and Suspense for incremental data loading.
More Efficient Tree-Shaking – Optimized bundle size and removal of unused code.
🔹 Chakra UI vs. Other UI Libraries (Material UI, Tailwind CSS)
Why choose Chakra UI?

JSX-Compatible API – Allows direct styling in props, eliminating the need for separate CSS files.
Advanced Design System – Built-in utilities for spacing, typography, and responsive breakpoints.
Accessibility-Focused – Full WAI-ARIA support, ensuring a11y compliance.
Dark/Light Mode – Native support for theme switching.
Performance-Optimized – Utilizes Emotion (CSS-in-JS) for faster styling execution.
RTL Compatibility – Seamless support for right-to-left languages (e.g., Persian).
🔹 Zustand vs. Redux
Why choose Zustand?

Simpler API – A significantly shorter learning curve compared to Redux.
Minimal Boilerplate – Requires much less setup and configuration than Redux and RTK.
Optimized Performance – A lightweight (~1KB) library with targeted re-renders.
Seamless React Hooks Integration – Designed for React Hooks, making state management intuitive.
Redux DevTools Support – Provides DevTools integration without the complexity of Redux.
Standalone Usability – Zustand stores can function outside React components.
🔹 React Query
Why use React Query?

Server State Management – Separates client-side and server-side states effectively.
Smart Caching – Automatic data refetching and invalidation when needed.
Built-in Status Management – Handles loading, error, and success states effortlessly.
Pagination & Infinite Scroll – Native support for dynamic data fetching.
Optimistic Updates – Previews UI updates before the backend operation completes.
🔹 i18next for Localization
Why use i18next?

Full Persian/English Support – Handles text direction (RTL/LTR) and localized formatting for dates and numbers.
Lazy Loading – Progressive translation loading to improve performance.
Advanced Formatting – Includes variables, pluralization, and dynamic content insertion.
Modular System – Allows separation of translations into different modules.
🔹 TypeScript
Why use TypeScript?

Type Safety – Prevents runtime errors by enforcing static type checking.
Improved Code Completion – Provides IntelliSense support in IDEs.
Refactoring-Friendly – Detects all impacted areas when modifying structures.
Self-Documenting Code – Generates automatic type definitions, serving as documentation.
2️⃣ Authentication System
Bioarc implements a multi-layered authentication mechanism to ensure security:

🔹 Server-Side Session Management
Uses sessions.server.ts to manage session cookies securely.
Stores user session data on the server instead of local storage.
Implements remix-auth for authentication strategies.
🔹 Route Protection
Loaders check authentication state before rendering protected pages.
Unauthorized users are redirected to the login page.
Role-based access control differentiates doctors from patients.
🔹 JWT-Based Authentication
Utilizes JWT tokens for secure API communication.
Refresh token strategy ensures users remain logged in without re-authentication.
Tokens are stored securely in HTTP-only cookies.
🔹 Two-Factor Authentication (2FA) Support
Optional 2FA activation for enhanced security.
Verification codes sent via SMS to validate user identity.
3️⃣ Font Optimization
Since Persian fonts can impact performance, Bioarc optimizes font loading using:

🔹 WOFF2 Format
Uses WOFF2 instead of TTF, reducing size by up to 30%.
Loads only necessary characters using subset fonts.
🔹 Optimized Loading Strategy
Utilizes the <link rel="preload"> tag for early font loading.
Uses font-display: swap; to prevent blank text before fonts load.
🔹 Preventing Layout Shifts (FOUT)
Uses size-adjust and ascent-override to ensure stable text rendering.
Implements the CSS Font Loading API for controlled loading.
🔹 Self-Hosted Fonts
Stores fonts locally instead of relying on external CDNs.
Reduces DNS lookups and external network requests.
4️⃣ Key Components
🔹 Doctor Panel Components
DoctorSideMenu – Navigation menu optimized with memoization and loading skeletons.
DoctorTopHeader – Displays doctor profile, live clock, and UI localization toggles.
PatientHistory – Lists appointments, prescriptions, and tests with filtering options.
CallInformation – Handles patient calls, allowing hold, transfer, mute, and a call timer.
InsuranceInformation – Displays insurance details and validity verification.
🔹 Common Components
AppModal – A reusable modal component for various sections.
MyLayout – The main layout wrapper, handling overall page structure.
5️⃣ Performance & UX Optimizations
🔹 Performance Enhancements
✅ Uses React.memo to prevent unnecessary re-renders.
✅ Optimizes expensive calculations with useMemo and useCallback.
✅ Lazy loads heavy components to speed up initial load time.
✅ Used from vite as a bundler for files in project

🔹 User Experience Improvements
✅ Implements skeleton loaders for a smoother UI.
✅ Detects mobile screens using isMobile for better responsiveness.
✅ Minimizes unnecessary state updates for a snappier experience.

🔹 Server-Side Optimizations
✅ Uses cache headers to reduce network requests.
✅ Detects mobile devices at the server level for layout adjustments.
✅ Dynamically imports components to improve performance.

🚀 Final Thoughts
The Bioarc project has been carefully designed with performance, security, and user experience in mind. By leveraging Remix, Zustand, React Query, and Chakra UI, it delivers an efficient and scalable solution for medical management.