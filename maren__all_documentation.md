# Maren 

## Project Description
I'm Creating a SAAS  website for a government facility. in this project, my target audience are the HR and Employee. i want to reduce the steps that they take to finish procedures and also make it digital rather than paper based that they are using now. i have 3 main goals that i want to achieve, 1. they are currently using papers to save there employees information i want to make a Digital DATABASE that have filter and search engine with sorting and make it easy to use and when an employee is clicked it would take me to a specific page to show that employee's personal info. 2. i want to make digitalize the process of hiring employees inside hiring from one department to another. the hr posts an announcement either by dropping the pdf that hold the announcement or by filling out a form that would have all the necessary info about that job, and sometimes it can be multiple jobs. what i want to do is that they would fill a form and when they submit it, it would go to the announcement page where all the announcements show there with the option to preview and to see the applied candidates. then the employee would be able to see the announcement in the emp pov of the website, they would be able to fill a form and upload there cv along with it. then the system would match the job requirements with the cv the emp entered. then it would show all the approved for interview employees to the HR, the HR would contact or an email or a notification is sent to the employees via the platform that they should come to the interview. There would be a page or even in the announcement card the HR can give a QR code to multiple interviewers, and that QR code should be discarded after like an hour or so i don't know yet, that QR code will give the interviewer the ability to inter the evaluation page, where he will get a from to evaluate the candidates, and then all the interviewers scores should output the average score out of 100. then there would be a page for the HR where they can see all the candidates with there scores, and keep in mind there would be a lot of different jobs so the HR would like to filter and sort how ever they want, also in the output the HR wants to see all the jobs separately with the highest score candidate and also a table with all the candidates per job, and they would have the  ability to download the tables as an excel file. 3. they would like to give the employee the ability to download pdf files, like there money transcript and other stuff that needs the HR's help to generate. they want to automate that digitally.

## Product Requirements Document
1. Introduction
1.1 Project Name
"Maren"

1.2 Purpose
The primary purpose of the "Maren" SaaS website is to digitalize and streamline key Human Resources (HR) and employee-related procedures within a government facility. This aims to significantly reduce manual steps, paper-based processes, and the time currently spent on administrative tasks, thereby improving efficiency and user experience for both HR personnel and employees.

1.3 Scope
The initial scope of the "Maren" project encompasses three core functionalities:
1.  Development of a digital, searchable employee database.
2.  Digitalization of the internal employee hiring and transfer process, from announcement to candidate evaluation.
3.  Automation of common employee document generation and download.
This document details the requirements for achieving these objectives, covering functional, non-functional, and technical specifications.

1.4 Target Audience
The primary target audience for the "Maren" website consists of:
*   HR Department Personnel: Responsible for managing employee data, posting job announcements, reviewing candidates, managing interviews, and generating reports.
*   Employees: Seeking to access their personal information, apply for internal job opportunities, and download necessary documents.
*   Interviewers (temporary users): Granted temporary access to evaluate candidates during the hiring process.

2. Project Goals
2.1 Goal 1: Digital Employee Database
To establish a secure, digital database for employee information, replacing current paper-based records. This database must offer efficient search, filtering, and sorting capabilities, allowing HR to quickly access and view detailed employee profiles.

2.2 Goal 2: Digitalized Internal Hiring Process
To transform the current 8-10 month paper-based internal hiring and transfer process into a fully digital, streamlined workflow. This includes job announcement creation, employee application, automated CV matching, interview scheduling, interviewer evaluation, and comprehensive reporting for HR.

2.3 Goal 3: Automated Document Generation
To enable employees to digitally request and download essential PDF documents (e.g., money transcripts, employment verification letters) that currently require HR intervention and take weeks or months to process. This automation aims to reduce processing time to seconds.

3. User Roles and Profiles
3.1 HR Department User
*   **Access:** Dedicated HR portal (orange with white gradient theme).
*   **Responsibilities:**
    *   Manage employee digital database (view, search, filter, sort employee profiles).
    *   Post and manage job announcements (upload PDF or fill forms, single/multiple jobs).
    *   View all job announcements with options to preview and see applied candidates.
    *   Review candidate applications, including uploaded CVs.
    *   Access and utilize the automated CV matching system.
    *   View shortlisted candidates approved for interviews.
    *   Initiate communication/notifications to candidates regarding interviews.
    *   Generate and manage temporary QR codes for interviewers.
    *   Monitor and review interviewer evaluation scores (average, per job, filter/sort).
    *   Download candidate evaluation tables (Excel).
    *   Manage user accounts and access controls (implied by "HR would have there own POV").
    *   Configure basic filtering criteria for reporting (e.g., job title, department, status, score range).

3.2 Employee User
*   **Access:** Dedicated Employee portal (blue with white gradient theme).
*   **Responsibilities:**
    *   View internal job announcements.
    *   Apply for jobs by filling a form and uploading their CV.
    *   Receive notifications or emails regarding interview invitations via the platform.
    *   Download personal PDF documents (money transcript, employment verification letters, pay stubs, leave summaries) on demand.
    *   Manage their profile and change password.

3.3 Interviewer (Temporary Role)
*   **Access:** Temporary, secure access via QR code scan (no sidebar, specific evaluation page).
*   **Responsibilities:**
    *   Access the candidate evaluation form after scanning a QR code and logging in.
    *   Evaluate candidates based on a provided form (user-provided template).
    *   Electronically sign the evaluation form upon submission.
    *   Submitting the form finalizes their evaluation, preventing further changes for that candidate.

4. Functional Requirements
4.1 Employee Digital Database Module
4.1.1 Employee Profile Management
*   **REQ-DB-001:** The system shall store employee personal and professional information digitally.
*   **REQ-DB-002:** The system shall display individual employee profiles on a dedicated page when clicked from the database listing.
*   **REQ-DB-003:** Employee profiles shall initially include common columns (up to 5) as defined during the initial setup (e.g., Employee ID, Name, Department, Job Title, Contact Info). These columns are subject to later modification based on HR's needs.

4.1.2 Search, Filter, and Sort
*   **REQ-DB-004:** The system shall provide a search engine for employee records (e.g., by name, ID).
*   **REQ-DB-005:** The system shall allow HR users to filter employee data (e.g., by department, job title, status).
*   **REQ-DB-006:** The system shall allow HR users to sort employee data (e.g., by name alphabetically, by employee ID numerically).
*   **REQ-DB-007:** The filtering and sorting criteria shall be easily configurable and extensible by HR as needed.

4.1.3 Data Import
*   **REQ-DB-008:** The system shall support the initial import of approximately 1000 existing employee records in JSON format.

4.2 Internal Hiring Module
4.2.1 HR Job Announcement Management
4.2.1.1 Post Job Announcement
*   **REQ-HRH-001:** HR shall be able to post new job announcements.
*   **REQ-HRH-002:** HR shall have the option to post announcements by uploading a PDF document containing the announcement details.
*   **REQ-HRH-003:** HR shall have the option to post announcements by filling out a structured form that captures all necessary job information (e.g., job title, department, description, requirements, responsibilities).
*   **REQ-HRH-004:** The form-based posting shall support the creation of multiple job announcements simultaneously if applicable.
*   **REQ-HRH-005:** Upon submission, the announcement shall be published to a dedicated "Announcement Page" accessible to both HR and employees.

4.2.1.2 View and Manage Announcements
*   **REQ-HRH-006:** HR shall have a dedicated "Announcement Page" displaying all active job announcements.
*   **REQ-HRH-007:** Each announcement on the page shall have an option to preview its content.
*   **REQ-HRH-008:** Each announcement shall have an option to view a list of candidates who have applied for that specific job.

4.2.1.3 Candidate Application Review
*   **REQ-HRH-009:** HR shall be able to view details of applied candidates, including their submitted application form and uploaded CVs.

4.2.1.4 CV Matching and Shortlisting
*   **REQ-HRH-010:** The system shall automatically match job requirements with employee CVs based on predefined logic (years of experience, specialization, keyword matching).
*   **REQ-HRH-011:** The system shall present HR with a list of approved candidates for interviews based on the matching results.

4.2.1.5 Interview Management (Scheduling & Notifications)
*   **REQ-HRH-012:** HR shall be able to notify approved candidates for interviews via the platform, potentially triggering an email or in-app notification.

4.2.1.6 Interviewer QR Code Generation & Management
*   **REQ-HRH-013:** HR shall be able to generate unique QR codes for multiple interviewers for a specific job/candidate set.
*   **REQ-HRH-014:** Each QR code shall be associated with a specific interview evaluation form instance.
*   **REQ-HRH-015:** QR codes shall have a predefined expiration time (e.g., 24 hours), after which they become invalid.
*   **REQ-HRH-016:** HR shall be able to track QR code usage and expiration status.

4.2.1.7 Interview Evaluation Reporting
*   **REQ-HRH-017:** HR shall have a dedicated page to view all candidates with their interview scores.
*   **REQ-HRH-018:** The system shall display all jobs separately.
*   **REQ-HRH-019:** For each job, the highest scoring candidate shall be highlighted.
*   **REQ-HRH-020:** A table showing all candidates per job with their scores shall be available.
*   **REQ-HRH-021:** The system shall allow HR to filter and sort candidates and jobs based on various criteria (e.g., job title, score range, candidate name).
*   **REQ-HRH-022:** HR shall have the ability to download evaluation tables as Excel files.

4.2.2 Employee Job Application Workflow
4.2.2.1 View Job Announcements
*   **REQ-EMP-001:** Employees shall be able to view internal job announcements on their dedicated portal.

4.2.2.2 Apply for Jobs
*   **REQ-EMP-002:** Employees shall be able to apply for jobs by filling out an application form.
*   **REQ-EMP-003:** Employees shall be able to upload their CVs as part of the application process.

4.2.2.3 Receive Interview Notifications
*   **REQ-EMP-004:** Employees shall receive notifications/messages within the platform (and potentially via email) when invited for an interview.

4.2.3 Interviewer Evaluation Workflow
*   **REQ-INT-001:** Interviewers shall scan a QR code to access the evaluation page.
*   **REQ-INT-002:** Upon scanning, interviewers must log in with their credentials to access the evaluation form.
*   **REQ-INT-003:** The evaluation page shall present a form (as provided by the user) for evaluating candidates.
*   **REQ-INT-004:** Each evaluation form shall have an electronic signature feature that interviewers must use before submitting.
*   **REQ-INT-005:** Once an evaluation form is electronically signed and submitted, it cannot be edited or rescinded.
*   **REQ-INT-006:** The system shall calculate an average score (out of 100) for each candidate based on all submitted interviewer scores for that candidate.

4.3 Automated Document Generation Module
4.3.1 Document Types
*   **REQ-DOC-001:** The system shall automate the generation of the following PDF documents:
    *   Money Transcript
    *   Employment Verification Letters
    *   Pay Stubs
    *   Leave Summaries

4.3.2 Document Request and Download
*   **REQ-DOC-002:** Employees shall be able to request and immediately download generated PDF files from their portal without HR intervention.

5. Non-Functional Requirements
5.1 User Experience (UX) and User Interface (UI)
5.1.1 Design Theme & Color Palette
*   **NFR-UI-001:** The HR department portal shall utilize an "orange with white" theme with gradient colors.
*   **NFR-UI-002:** The employee portal shall utilize a "blue with white" theme with gradient colors.

5.1.2 Language Support
*   **NFR-UI-003:** The default language of the entire website shall be Arabic (RTL).
*   **NFR-UI-004:** The website shall provide an option to switch the language from Arabic (AR) to English (EN).

5.1.3 Responsiveness
*   **NFR-UI-005:** The website shall be fully responsive and optimized for seamless viewing and interaction across desktop, mobile phone, and tablet devices.

5.1.4 Component Library & Animations
*   **NFR-UI-006:** Shadcn/ui shall be used for UI components.
*   **NFR-UI-007:** Animations shall be subtle, implemented using motion, focusing on enhancing user experience rather than being overly prominent.
*   **NFR-UI-008:** The overall user experience shall be smooth and intuitive, aiming to reduce friction and steps for users.

5.1.5 Dark/Light Mode
*   **NFR-UI-009:** The website shall include a dark/light mode functionality accessible throughout the platform.

5.1.6 Sidebar Navigation
*   **NFR-UI-010:** A consistent sidebar navigation shall be present on all pages, except for the QR code scanning page and the interviewer evaluation page.

5.2 Security
5.2.1 Authentication & Authorization
*   **NFR-SEC-001:** The system shall have a dedicated login page requiring a user's government email and password.
*   **NFR-SEC-002:** Access control shall be implemented to ensure HR users can only access HR-specific functionalities and Employee users can only access employee-specific functionalities.
*   **NFR-SEC-003:** User accounts shall be pre-existing within the system; users will not create their own accounts.

5.2.2 Password Recovery
*   **NFR-SEC-004:** A "Forgot Password" option shall be available on the login page.
*   **NFR-SEC-005:** Upon selecting "Forgot Password", users must enter their government email.
*   **NFR-SEC-006:** A One-Time Password (OTP) shall be sent to the user's government email.
*   **NFR-SEC-007:** Users must enter the received OTP on a dedicated page.
*   **NFR-SEC-008:** Correct OTP entry shall directly log the user into their account without requiring an additional button press.
*   **NFR-SEC-009:** Users shall have the option to change their password from their profile section within the website.

5.2.3 Data Security
*   **NFR-SEC-010:** Sensitive configuration details and credentials shall be stored in environment files (.env).
*   **NFR-SEC-011:** Future security enhancements beyond initial measures will be addressed in later phases.

5.2.4 QR Code Security
*   **NFR-SEC-012:** The QR code generated for interviewers shall expire automatically after 24 hours.
*   **NFR-SEC-013:** Scanning the QR code shall redirect the interviewer to a login page requiring their credentials before accessing the evaluation form.

5.2.5 Electronic Signatures
*   **NFR-SEC-014:** Interviewer evaluation forms shall require an electronic signature upon submission.
*   **NFR-SEC-015:** Once electronically signed and submitted, an evaluation cannot be reversed or modified.

5.3 Performance and Scalability
*   **NFR-PERF-001:** Performance and scalability are not primary concerns for the initial phase of development. Focus should be on functionality and user experience.

5.4 Technical Stack
*   **NFR-TECH-001:** The frontend shall be developed using Vite React.jsx.
*   **NFR-TECH-002:** The backend shall be developed using Node.js and JavaScript.
*   **NFR-TECH-003:** Styling shall be implemented using CSS Tailwind.
*   **NFR-TECH-004:** Client-side navigation shall be managed using Browser Router.
*   **NFR-TECH-005:** The database shall be MongoDB.
*   **NFR-TECH-006:** The project will adhere to the MERN stack (MongoDB, Express, React, Node.js) architecture.

5.5 Data Management
*   **NFR-DATA-001:** The database schema for employee information will initially include up to 5 common columns and be designed for future extensibility.

6. Assumptions and Constraints
6.1 Assumptions
*   **ASM-001:** Initial employee data (approx. 1000 records) will be provided in JSON format for import.
*   **ASM-002:** Specific content and structure for the interviewer evaluation form will be provided separately.
*   **ASM-003:** The initial definition of "most useful filtering criteria" for HR reporting will be a standard set (e.g., job title, department, status, score range) and can be modified later.
*   **ASM-004:** Dummy data will be used during development for testing purposes.
*   **ASM-005:** Specific PDF templates for automated generation (money transcript, employment verification, pay stubs, leave summaries) will be provided for integration.

6.2 Constraints
*   **CON-001:** The project must adhere to the specified technology stack (MERN: Vite React.jsx, Node.js, JavaScript, CSS Tailwind, Browser Router, MongoDB).
*   **CON-002:** QR codes must be for interviewers only and require login for access to the evaluation page.
*   **CON-003:** The system must not require users to create their own accounts; accounts are pre-provisioned.
*   **CON-004:** The system must be primarily in Arabic (RTL) with an English (LTR) language toggle.

7. Out of Scope (for this phase)
7.1 Complex Reporting Customizations
Highly customized or dynamic report generation beyond the specified filtering, sorting, and Excel downloads for interview evaluations are outside the scope of this initial phase.

7.2 External System Integrations
Integration with any external systems, payroll software, or HRIS platforms is not part of this project phase.

7.3 Hosting & Advanced Scalability Planning
Specific hosting environment setup and detailed long-term scalability planning are not in scope for this initial development phase.

## Technology Stack
Maren - Technology Stack Document

**1. Introduction**
This document outlines the recommended technology stack for the "Maren" project, a Software as a Service (SaaS) platform designed for a government facility. The primary goal of Maren is to digitalize existing paper-based HR and employee procedures, significantly reducing processing times and enhancing user experience for both HR personnel and employees. This stack is chosen to meet the project's requirements for functionality, security, performance, maintainability, and user experience, while adhering to the specified timeline and budget constraints.

**2. Core Technology Stack**

The project will leverage the MERN (MongoDB, Express.js, React, Node.js) stack, providing a robust, full-stack JavaScript solution.

*   **Frontend:** React.js
*   **Backend:** Node.js with Express.js
*   **Database:** MongoDB

**3. Detailed Technology Stack**

**3.1. Frontend Technologies**

*   **Framework:** React.js (via Vite for fast development setup)
    *   **Justification:** React's component-based architecture is ideal for building complex, scalable, and maintainable user interfaces. Vite offers an incredibly fast development server and build process, accelerating development.
*   **Language:** JavaScript (ES6+) / JSX
    *   **Justification:** Standard for React development, enabling a unified language across the full stack (MERN).
*   **Styling:** Tailwind CSS
    *   **Justification:** A utility-first CSS framework that allows for rapid UI development, highly customizable designs, and ensures responsiveness across desktop, tablet, and mobile devices. It facilitates the specific gradient color themes (orange/white for HR, blue/white for Employee) and dark/light mode functionality.
*   **UI Component Library:** shadcn/ui
    *   **Justification:** Provides a set of beautiful, accessible, and customizable React components built on Tailwind CSS. It allows for consistent UI elements without overdoing design, aligning with the requirement for subtle and user-focused aesthetics.
*   **Animation Library:** Framer Motion
    *   **Justification:** Enables the implementation of subtle, smooth animations to enhance user experience and flow, as requested, without creating an overly flashy interface.
*   **Routing:** React Router DOM (Browser Router)
    *   **Justification:** Standard library for declarative routing in React applications, essential for navigation between different sections and pages (e.g., employee details, job announcements, evaluation forms).
*   **Internationalization:** i18next (React-i18next integration)
    *   **Justification:** Essential for supporting Arabic (RTL) and English (LTR) languages, including dynamic language switching functionality.
*   **State Management:** React Context API / Zustand
    *   **Justification:** For managing global application state efficiently, particularly for user authentication status, theme preferences, and localized content. Zustand is a lightweight alternative to Redux, offering simplicity and performance for common state management needs.

**3.2. Backend Technologies**

*   **Runtime Environment:** Node.js
    *   **Justification:** Allows for a unified JavaScript codebase across frontend and backend, enhancing developer productivity. Its non-blocking, event-driven architecture makes it efficient for handling concurrent requests, suitable for a SaaS application.
*   **Web Framework:** Express.js
    *   **Justification:** A minimalist and flexible Node.js web application framework that provides a robust set of features for building RESTful APIs, handling routing, and middleware, crucial for serving data to the React frontend.
*   **Language:** JavaScript (ES6+)
    *   **Justification:** Consistency with the frontend, leveraging the full-stack JavaScript benefits.

**3.3. Database**

*   **Database System:** MongoDB
    *   **Justification:** A NoSQL document database. Its flexible schema is well-suited for HR and employee data, which might evolve over time. It offers high scalability and performance, accommodating the estimated 1000 existing employee records and future growth. It integrates seamlessly with Node.js applications.
*   **ODM (Object Data Modeling):** Mongoose
    *   **Justification:** Provides an elegant way to interact with MongoDB, offering schema validation, data type casting, and powerful query capabilities, streamlining backend development.

**4. Key Libraries and Tools**

**4.1. Authentication & Authorization**

*   **JSON Web Tokens (JWT):**
    *   **Justification:** For secure, stateless authentication. Users receive a token upon successful login, which is then used to authenticate subsequent requests, ensuring secure access to HR and Employee POVs.
*   **Bcrypt.js:**
    *   **Justification:** For securely hashing user passwords before storing them in the database, protecting against data breaches.
*   **Nodemailer:**
    *   **Justification:** For sending transactional emails, specifically for OTP (One-Time Password) delivery during the "Forgot Password" process and potentially for notifications (e.g., interview invitations). Integration with a corporate SMTP service will be handled.
*   **Passport.js (Optional but Recommended):**
    *   **Justification:** A flexible authentication middleware for Node.js. While custom JWT logic can be built, Passport.js simplifies handling different authentication strategies (local for email/password, potentially others in the future).

**4.2. File Handling & Storage**

*   **Multer:**
    *   **Justification:** A Node.js middleware for handling `multipart/form-data`, primarily used for uploading employee CVs and HR-posted PDF announcements.
*   **Cloud Storage (e.g., AWS S3 or Local Secure Storage):**
    *   **Justification:** For secure and scalable storage of uploaded CVs and PDF documents. Given the government context, a highly secure, potentially on-premise or compliant cloud solution will be selected for production, while development might use a simpler local file system.
*   **PDF Generation Library (e.g., Puppeteer, PDFKit):**
    *   **Justification:** For automating the generation of PDF files (money transcripts, employment verification letters, pay stubs, leave summaries) based on dynamic data, fulfilling the request for digital document automation.
*   **Excel Export Library (e.g., ExcelJS):**
    *   **Justification:** To enable HR personnel to download filtered and sorted candidate tables as Excel files, facilitating external reporting and analysis.

**4.3. Hiring & Evaluation Automation**

*   **Custom CV Matching Logic:**
    *   **Justification:** Backend logic implemented in Node.js to parse CV content and match candidates against job requirements based on keywords, years of experience, and specialization.
*   **QR Code Generation Library (e.g., `qrcode`):**
    *   **Justification:** For generating dynamic QR codes for interviewers, enabling secure access to evaluation forms.
*   **Electronic Signature Component:**
    *   **Justification:** Frontend component (e.g., a drawing pad or typed signature input) to capture electronic signatures from interviewers on the evaluation form, with backend validation and storage.

**4.4. Security & Configuration**

*   **Dotenv:**
    *   **Justification:** For securely managing environment variables (e.g., database connection strings, API keys, JWT secrets) in `.env` files, keeping sensitive information out of the codebase.
*   **Helmet.js:**
    *   **Justification:** A collection of middleware for setting various HTTP headers to help secure Express apps by mitigating common web vulnerabilities.
*   **CORS (Cross-Origin Resource Sharing) Middleware:**
    *   **Justification:** To manage access from different origins, ensuring the frontend can securely communicate with the backend API.

**4.5. Development & Operations Tools**

*   **Git:**
    *   **Justification:** Standard version control system for collaborative development, code management, and tracking changes.
*   **ESLint & Prettier:**
    *   **Justification:** For maintaining code quality, consistency, and adherence to best practices across the development team.

**5. Justifications and Benefits of the Chosen Stack**

*   **Full-Stack JavaScript (MERN):** Allows developers to work with a single language across the entire application, simplifying context switching, accelerating development cycles, and improving code consistency.
*   **Rapid Development:** Vite and React provide a fast and efficient frontend development experience, while Node.js and Express enable quick API creation. This aligns with the need to address significant pain points (e.g., 8-10 month hiring process) efficiently.
*   **Scalability & Performance:** Node.js's asynchronous nature and MongoDB's flexible, scalable architecture are well-suited for handling a growing number of users and data, ensuring the platform can scale with the government facility's needs.
*   **Rich User Experience (UX):** React, Tailwind CSS, shadcn/ui, and Framer Motion provide the tools to create a highly responsive, visually appealing, and intuitive user interface with subtle animations and specific branding (HR orange/white, Employee blue/white, gradients). RTL support for Arabic and dynamic language switching ensure broad accessibility.
*   **Security Focus:** Built-in security features with JWT, Bcrypt, Dotenv, and planned secure storage address the sensitive nature of government data. The QR code security mechanisms (login, electronic signature, expiry) ensure controlled access to interview evaluation.
*   **Digitalization & Automation:** The stack supports the core goals of digitalizing paper processes. Automated PDF generation and Excel export significantly reduce manual effort and processing times for HR and employees. CV matching automates a critical part of the hiring workflow.
*   **Maintainability:** The modular nature of React components, combined with clear API separation in Express.js, promotes a highly maintainable and organized codebase, crucial for long-term project viability.

**6. Future Considerations**

While not the immediate focus, future considerations will include:
*   **Deployment & Hosting:** Strategies for secure deployment and hosting suitable for a government facility's requirements (e.g., on-premise, private cloud, specific compliance standards).
*   **Advanced Security Audits:** Comprehensive security audits and penetration testing to ensure the highest level of data protection.
*   **Performance Optimization:** Further optimizations for large data sets, complex queries, and high concurrency as user volume increases.

## Project Structure
PROJECTSTRUCTURE

This document outlines the detailed file and folder organization for the "Maren" SAAS application. The structure is designed to promote modularity, separation of concerns, maintainability, and scalability, aligning with the MERN stack architecture and the specific requirements for HR, Employee, and Interviewer portals.

```
maren-saas/
├── client/
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   │   └── logo.png
│   │   │   ├── icons/
│   │   │   │   └── (SVG icons, e.g., dashboard, user, announcement)
│   │   │   └── fonts/
│   │   │       └── (Custom Arabic fonts if needed)
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   └── (Shadcn/UI components - auto-generated, e.g., button.jsx, input.jsx, dialog.jsx)
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Spinner.jsx
│   │   │   ├── layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── SidebarHR.jsx
│   │   │   │   └── SidebarEmployee.jsx
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── ForgotPasswordForm.jsx
│   │   │   │   └── OtpInputForm.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── HRDashboardCards.jsx
│   │   │   │   └── EmployeeDashboardWidgets.jsx
│   │   │   ├── employee/
│   │   │   │   ├── EmployeeCard.jsx
│   │   │   │   ├── EmployeeDetails.jsx
│   │   │   │   └── EmployeeListTable.jsx
│   │   │   ├── announcement/
│   │   │   │   ├── JobAnnouncementCard.jsx
│   │   │   │   ├── JobAnnouncementForm.jsx
│   │   │   │   └── AnnouncementPreview.jsx
│   │   │   ├── application/
│   │   │   │   ├── ApplicationForm.jsx
│   │   │   │   └── AppliedCandidatesTable.jsx
│   │   │   ├── interview/
│   │   │   │   ├── InterviewEvaluationForm.jsx
│   │   │   │   ├── InterviewerQRCodeDisplay.jsx
│   │   │   │   └── InterviewScoresTable.jsx
│   │   │   ├── pdf-generator/
│   │   │   │   ├── PDFRequestForm.jsx
│   │   │   │   └── PDFDownloadButton.jsx
│   │   │   └── reporting/
│   │   │       ├── HRJobReports.jsx
│   │   │       ├── CandidateScoresTable.jsx
│   │   │       └── FilterSortControls.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── ThemeContext.jsx
│   │   │   └── LanguageContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.jsx
│   │   │   ├── useTheme.jsx
│   │   │   ├── useLanguage.jsx
│   │   │   └── useFormValidation.jsx
│   │   ├── lib/
│   │   │   ├── api.js
│   │   │   ├── utils.js
│   │   │   ├── constants.js
│   │   │   └── validationSchemas.js
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.jsx
│   │   │   │   ├── ForgotPasswordPage.jsx
│   │   │   │   └── OtpVerificationPage.jsx
│   │   │   ├── hr/
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── EmployeeDatabasePage.jsx
│   │   │   │   ├── EmployeeDetailsPage.jsx
│   │   │   │   ├── JobAnnouncementsPage.jsx
│   │   │   │   ├── CreateJobAnnouncementPage.jsx
│   │   │   │   ├── JobApplicantsPage.jsx
│   │   │   │   ├── InterviewerScoresPage.jsx
│   │   │   │   ├── PDFRequestsPage.jsx
│   │   │   │   └── HRProfilePage.jsx
│   │   │   ├── employee/
│   │   │   │   ├── DashboardPage.jsx
│   │   │   │   ├── JobAnnouncementsPage.jsx
│   │   │   │   ├── ApplyForJobPage.jsx
│   │   │   │   ├── PDFRequestFormPage.jsx
│   │   │   │   └── EmployeeProfilePage.jsx
│   │   │   ├── interview/
│   │   │   │   └── EvaluationPage.jsx (No sidebar)
│   │   │   └── NotFoundPage.jsx
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx
│   │   │   ├── HRRoutes.jsx
│   │   │   ├── EmployeeRoutes.jsx
│   │   │   └── InterviewerRoutes.jsx
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── theme.css
│   │   │   └── animations.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── employeeController.js
│   │   │   ├── announcementController.js
│   │   │   ├── applicationController.js
│   │   │   ├── interviewController.js
│   │   │   └── pdfController.js
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validationMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Employee.js
│   │   │   ├── Announcement.js
│   │   │   ├── Application.js
│   │   │   ├── InterviewEvaluation.js
│   │   │   ├── QRCodeToken.js
│   │   │   └── PDFRequest.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── employeeRoutes.js
│   │   │   ├── announcementRoutes.js
│   │   │   ├── applicationRoutes.js
│   │   │   ├── interviewRoutes.js
│   │   │   └── pdfRoutes.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── cvMatchingService.js
│   │   │   ├── pdfGenerationService.js
│   │   │   └── qrCodeService.js
│   │   ├── utils/
│   │   │   ├── emailSender.js
│   │   │   ├── jwt.js
│   │   │   ├── passwordHasher.js
│   │   │   └── fileUpload.js
│   │   ├── app.js
│   │   └── server.js
│   ├── .env.development
│   ├── .env.production
│   ├── package.json
│   └── nodemon.json
├── docs/
│   └── projectStructure.md (This document)
├── scripts/
│   └── seedDb.js
├── .env.example
├── .gitignore
└── README.md
```

### Explanation of Directories and Files:

**`maren-saas/` (Root Directory)**
*   The top-level folder for the entire project.
*   `client/`: Contains all frontend-related code (React.js/Vite).
*   `server/`: Contains all backend-related code (Node.js/Express).
*   `docs/`: Stores project documentation, including specifications, design documents, and this project structure.
*   `scripts/`: Holds various utility scripts for development, such as database seeding.
*   `.env.example`: A template file listing all required environment variables for both client and server, without their actual values.
*   `.gitignore`: Specifies files and directories that Git should ignore (e.g., `node_modules`, `.env` files).
*   `README.md`: Provides a general overview of the project, setup instructions, and how to run the application.

---

### `client/` (Frontend - Vite React.js)

This directory holds the entire user interface and client-side logic.

*   **`public/`**:
    *   `vite.svg`: Default Vite logo, can be replaced with project favicon/logo.
    *   Contains static assets that are served directly without being processed by Vite's build pipeline.

*   **`src/`**: The core source code for the React application.
    *   **`assets/`**: Centralized storage for static media files.
        *   `images/`: Project logos, illustrations, or any other images.
        *   `icons/`: SVG icons used throughout the application.
        *   `fonts/`: Custom font files for consistent branding.
    *   **`components/`**: Reusable UI components. Organized for clarity and reusability.
        *   **`ui/`**: Dedicated directory for Shadcn/UI components. These are often generated by a CLI and are specifically designed for consistent UI elements.
        *   **`common/`**: Generic, widely used components that are not tied to specific features (e.g., buttons, modals, loaders, spinners).
        *   **`layout/`**: Components defining the overall page structure (Header, Footer, and separate Sidebar components for HR and Employee views, allowing for distinct navigation and theming).
        *   **`auth/`**: Components related to user authentication flows (login, forgot password, OTP input).
        *   **`dashboard/`**: Components specific to the dashboard views for both HR and Employee portals.
        *   **`employee/`**: Components for managing and displaying employee information (e.g., individual employee cards, detailed views, employee lists).
        *   **`announcement/`**: Components for creating, displaying, and managing job announcements.
        *   **`application/`**: Components for handling job applications (e.g., application forms, tables for applied candidates).
        *   **`interview/`**: Components for the interview process, including evaluation forms, QR code display, and aggregated scores.
        *   **`pdf-generator/`**: Components related to requesting and downloading automated PDF files.
        *   **`reporting/`**: Components for HR-specific reporting, including job reports, candidate scores, and filtering/sorting controls.
    *   **`context/`**: Manages global state using React Context API.
        *   `AuthContext.jsx`: Manages user authentication status and user data.
        *   `ThemeContext.jsx`: Controls dark/light mode and dynamic HR/Employee theme colors (orange/white and blue/white gradients).
        *   `LanguageContext.jsx`: Manages the application language (Arabic/English) and RTL/LTR direction.
    *   **`hooks/`**: Custom React Hooks to encapsulate reusable logic (e.g., `useAuth` for authentication-related logic, `useTheme` for theme switching, `useLanguage` for language toggling, `useFormValidation` for form validation).
    *   **`lib/`**: Utility functions and helper modules.
        *   `api.js`: Configures and exports an Axios instance for API calls, potentially with interceptors for authentication tokens.
        *   `utils.js`: General utility functions (e.g., date formatting, data transformation, specific RTL rendering helpers).
        *   `constants.js`: Stores application-wide constants, enums (e.g., user roles, PDF types), and configuration values.
        *   `validationSchemas.js`: Defines validation schemas (e.g., using Zod or Yup) for client-side form input.
    *   **`pages/`**: Top-level components that represent full pages in the application, directly corresponding to routes. Organized by user role to reflect distinct user experiences.
        *   `auth/`: Pages for authentication flows.
        *   `hr/`: All pages accessible to HR users, including dashboards, employee database, job management, and PDF requests.
        *   `employee/`: All pages accessible to employees, including dashboards, job applications, and PDF requests.
        *   `interview/`: Specifically, `EvaluationPage.jsx` is for interviewers, designed to be a standalone page without the standard sidebar, as per requirements.
        *   `NotFoundPage.jsx`: A fallback page for invalid routes.
    *   **`routes/`**: Defines the application's routing structure using `react-router-dom` (Browser Router).
        *   `AppRoutes.jsx`: The main router configuration that orchestrates all routes.
        *   `HRRoutes.jsx`: Defines routes specific to the HR portal, likely protected.
        *   `EmployeeRoutes.jsx`: Defines routes specific to the Employee portal, likely protected.
        *   `InterviewerRoutes.jsx`: Defines routes for interviewers, including the QR code based evaluation page.
    *   **`styles/`**: Manages all styling concerns using Tailwind CSS.
        *   `index.css`: The main CSS file, importing Tailwind's base, components, and utilities, along with custom global styles.
        *   `theme.css`: Defines custom CSS variables and classes for the HR (orange/white) and Employee (blue/white) gradient themes, and handles dark/light mode styling.
        *   `animations.css`: Contains custom CSS for subtle animations and transitions, complementing Framer Motion for a smooth user experience.
    *   **`App.jsx`**: The root component of the React application, where contexts, routing, and global layout are initialized.
    *   **`main.jsx`**: The entry point for the Vite React application, responsible for rendering `App.jsx` into the DOM.
*   **`.env.development`, `.env.production`**: Environment-specific configuration files (ignored by Git) for different deployment stages.
*   **`package.json`**: Lists frontend dependencies and scripts (e.g., `start`, `build`).
*   **`vite.config.js`**: Vite specific configuration for building and serving the React application.
*   **`tailwind.config.js`**: Tailwind CSS configuration, including custom colors, fonts, and plugins (e.g., for RTL support).
*   **`postcss.config.js`**: PostCSS configuration, used by Tailwind CSS for processing CSS.

---

### `server/` (Backend - Node.js/Express)

This directory contains all the server-side logic, API endpoints, and database interactions.

*   **`src/`**: The core source code for the Node.js application.
    *   **`config/`**: Configuration files for the server environment and database.
        *   `db.js`: Handles the connection to the MongoDB database using Mongoose.
        *   `env.js`: Utility for loading environment variables securely from `.env` files.
    *   **`controllers/`**: Contains the business logic for handling incoming HTTP requests. Each controller groups related actions for a specific resource or feature.
        *   `authController.js`: Handles user authentication (login, forgot password, OTP verification).
        *   `userController.js`: Manages general user profile updates and settings.
        *   `employeeController.js`: Manages HR-specific operations on employee data (CRUD for the digital database).
        *   `announcementController.js`: Manages job announcements (creation, viewing, updating, deleting).
        *   `applicationController.js`: Manages job applications (submission, viewing applied candidates).
        *   `interviewController.js`: Handles interviewer evaluations, QR code validation, and score aggregation.
        *   `pdfController.js`: Manages requests for automated PDF generation.
    *   **`middlewares/`**: Functions that execute before or after route handlers to perform tasks like authentication, authorization, or error handling.
        *   `authMiddleware.js`: Verifies JWT tokens and handles role-based access control (HR, Employee, Interviewer roles).
        *   `errorHandler.js`: Centralized error handling middleware for consistent error responses.
        *   `validationMiddleware.js`: Middleware for validating request bodies, parameters, and queries against defined schemas.
    *   **`models/`**: Defines Mongoose schemas, representing the structure of data stored in MongoDB.
        *   `User.js`: Base user model with roles (`HR`, `Employee`, `Interviewer`), email, and password.
        *   `Employee.js`: Detailed employee information (for the HR database), linked to a `User` if the employee is also a platform user.
        *   `Announcement.js`: Schema for job announcements posted by HR.
        *   `Application.js`: Schema for employee job applications, including CV links.
        *   `InterviewEvaluation.js`: Stores interviewers' evaluations and scores for candidates.
        *   `QRCodeToken.js`: Manages unique tokens for interviewer QR codes, including expiry.
        *   `PDFRequest.js`: Tracks requests for automated PDF documents.
    *   **`routes/`**: Defines the API endpoints and routes requests to the appropriate controllers. Organized by resource/feature.
        *   `authRoutes.js`: Endpoints for login, forgot password, OTP verification.
        *   `userRoutes.js`: General user profile endpoints.
        *   `employeeRoutes.js`: API for HR to manage employee data.
        *   `announcementRoutes.js`: API for job announcements.
        *   `applicationRoutes.js`: API for job applications.
        *   `interviewRoutes.js`: API for interview evaluations and QR code validation.
        *   `pdfRoutes.js`: API for requesting and managing PDF generation.
    *   **`services/`**: Encapsulates complex business logic that might be shared across multiple controllers or interacts with external tools.
        *   `authService.js`: Logic for OTP generation, sending emails for password reset, etc.
        *   `cvMatchingService.js`: Implements the logic for matching job requirements (years of experience, specialization, keywords) with uploaded CVs.
        *   `pdfGenerationService.js`: Handles the actual generation of PDF files (money transcript, employment verification, pay stubs, leave summaries) using templates and data.
        *   `qrCodeService.js`: Manages the generation, expiry, and validation of QR code tokens for interviewers.
    *   **`utils/`**: Helper functions used across the server.
        *   `emailSender.js`: Utility for sending emails (e.g., OTPs, interview invitations).
        *   `jwt.js`: Utility for generating and verifying JSON Web Tokens for authentication.
        *   `passwordHasher.js`: Handles password hashing and comparison using bcrypt.
        *   `fileUpload.js`: Configures Multer for handling file uploads (e.g., employee CVs, PDF announcements).
    *   **`app.js`**: The main Express application setup, including middleware configuration (CORS, body-parser) and route registration.
    *   **`server.js`**: The entry point for the Node.js server, responsible for starting the Express application and connecting to the database.
*   **`.env.development`, `.env.production`**: Environment-specific configuration files for the backend.
*   **`package.json`**: Lists backend dependencies and scripts (e.g., `start`, `dev`).
*   **`nodemon.json`**: Configuration for Nodemon, used for automatic server restarts during development.

---

### `docs/`

*   **`projectStructure.md`**: This document, detailing the file and folder organization.

---

### `scripts/`

*   **`seedDb.js`**: A script to populate the database with initial dummy data for development and testing purposes. This is crucial for getting started quickly.

---

This comprehensive structure provides a clear roadmap for developing the "Maren" SAAS application, ensuring a robust, maintainable, and scalable solution for the government facility.

## Database Schema Design
SCHEMADESIGN

This section details the database schema design for the "Maren" project, outlining the data models, relationships, and the overall database structure using MongoDB. The design prioritizes efficient data storage, retrieval, and scalability to support the project's three main goals: digital employee management, automated internal hiring, and digital PDF generation.

**Database Name:** `Maren_DB` (Placeholder, can be configured via environment variables)

**Database Technology:** MongoDB (NoSQL, Document-Oriented)

---

**1. Collection: `users`**
*   **Purpose:** Stores core user authentication and role information for all system participants (HR, Employees, Interviewers).
*   **Fields:**
    *   `_id`: String (Primary Key, Civil ID - Used as unique identifier for login and linking with employee records)
    *   `email`: String (Required, Unique, Indexed for quick lookup and login. Represents the government email.)
    *   `password`: String (Required, Stores hashed password for security.)
    *   `role`: String (Required, User role: "HR", "Employee", "Interviewer")
    *   `otpCode`: String (Optional, Temporary field to store OTP for password reset functionality.)
    *   `otpExpiresAt`: Date (Optional, Timestamp indicating when `otpCode` expires.)
    *   `isActive`: Boolean (Default: true, Indicates if the user account is active)
    *   `lastLogin`: Date (Optional, Timestamp of user's last login)
    *   `createdAt`: Date (Timestamp for when the user record was created.)
    *   `updatedAt`: Date (Timestamp for the last time the user record was updated.)

---

**2. Collection: `employees`**
*   **Purpose:** Stores detailed personal and professional information for all employees. This collection uses Arabic field names to match the government system requirements.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key, Auto-generated MongoDB ObjectId)
    *   `الرقم_المدني`: String (Required, Unique, Indexed. Civil ID - Links to `users._id` for authentication. A unique identifier for each employee within the government facility.)
    *   `الاسم`: String (Required, Indexed for search/filter. Employee's full name.)
    *   `موقع_العمل`: [String] (Required, Array of workplace locations where the employee can work.)
    *   `الوظيفة`: String (Required, Job title/position.)
    *   `الجنس`: String (Required, Enum: "ذكر" (Male), "أنثى" (Female).)
    *   `تاريخ_الميلاد`: String (Required, Date of birth in dd/mm/yyyy format.)
    *   `الدرجة`: String (Required, Employee's grade level.)
    *   `منطقة_العمل`: String (Required, Work area/region.)
    *   `مقر_العمل`: String (Required, Work headquarters/location.)
    *   `تاريخ_التعيين`: String (Required, Hire date in dd/mm/yyyy format.)
    *   `المجموعة_النوعية_للوظائف`: String (Required, Job category group.)
    *   `تاريخ_شغل_الدرجة`: String (Required, Date when current grade was assigned.)
    *   `تاريخ_شغل_الوظيفة`: String (Required, Date when current position was assigned.)
    *   `createdAt`: Date (Timestamp for when the employee record was created.)
    *   `updatedAt`: Date (Timestamp for the last time the employee record was updated.)

---

**3. Collection: `jobAnnouncements`**
*   **Purpose:** Stores details of all internal job postings by HR.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `jobTitle`: String (Required, Indexed. The title of the job being advertised.)
    *   `department`: String (Required, Indexed. The department offering the job.)
    *   `description`: String (Required, Full detailed description of the job.)
    *   `requirements`: [String] (Required, Array of key requirements for the job, used in CV matching logic and display.)
    *   `qualifications`: [String] (Required, Array of desired qualifications for the job.)
    *   `applicationDeadline`: Date (Required, The last date for submitting applications.)
    *   `postedBy`: ObjectId (Required, References `users._id` where `users.role` is "HR". Indicates which HR user posted the announcement.)
    *   `postedDate`: Date (Required, Indexed. Date when the announcement was posted.)
    *   `status`: String (Required, Indexed. Enum: "Draft", "Open", "Closed", "Archived".)
    *   `pdfAttachmentUrl`: String (Optional, URL to an uploaded PDF version of the announcement.)
    *   `numberOfOpenings`: Number (Optional, Integer indicating how many positions are open for this job.)
    *   `createdAt`: Date
    *   `updatedAt`: Date

---

**4. Collection: `jobApplications`**
*   **Purpose:** Tracks individual employee applications for job announcements and their progress through the hiring pipeline.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `jobId`: ObjectId (Required, Indexed, References `jobAnnouncements._id`.)
    *   `employeeId`: ObjectId (Required, Indexed, References `employees._id`.)
    *   `applicationDate`: Date (Required, Indexed. Date when the employee submitted the application.)
    *   `status`: String (Required, Indexed. Enum: "Applied", "Under Review", "Shortlisted", "Interview Scheduled", "Interviewed", "Hired", "Rejected". Used for filtering and progress tracking.)
    *   `appliedCvUrl`: String (Required, URL to the specific CV uploaded by the employee for this application.)
    *   `coverLetter`: String (Optional, Text of the cover letter submitted with the application.)
    *   `matchingScore`: Number (Required, Calculated score (0-100) from the CV matching logic against job requirements.)
    *   `interviewApproved`: Boolean (Default: `false`. Set to `true` by HR if the candidate is approved for an interview.)
    *   `averageInterviewScore`: Number (Optional, Stores the average score (0-100) from all `interviewEvaluations` for this application.)
    *   `overallRank`: Number (Optional, Derived composite score for HR sorting candidates across jobs.)
    *   `createdAt`: Date
    *   `updatedAt`: Date
*   **Indexes:**
    *   `jobId`, `employeeId` (Compound unique index to ensure an employee can only apply once per job.)
    *   `status`
    *   `matchingScore`
    *   `interviewApproved`

---

**5. Collection: `interviewSessions`**
*   **Purpose:** Manages the generation and expiration of unique QR codes for interviewer access to evaluation forms. Each entry represents a unique interview slot or evaluation link for a specific candidate.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `jobApplicationId`: ObjectId (Required, Indexed, References `jobApplications._id`. Links the session to a specific candidate's application.)
    *   `qrCodeString`: String (Required, Unique, Indexed. The unique string used to generate the QR code.)
    *   `expiresAt`: Date (Required, Indexed. Timestamp indicating when the QR code and session become invalid (e.g., 24 hours from generation).)
    *   `generatedBy`: ObjectId (Required, References `users._id` where `users.role` is "HR". The HR user who generated this session.)
    *   `interviewDate`: Date (Optional, Scheduled date for the interview.)
    *   `interviewTime`: String (Optional, Scheduled time for the interview, e.g., "10:00 AM".)
    *   `location`: String (Optional, Physical location of the interview.)
    *   `createdAt`: Date
    *   `updatedAt`: Date

---

**6. Collection: `interviewEvaluations`**
*   **Purpose:** Stores individual interviewer evaluations for candidates.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `jobApplicationId`: ObjectId (Required, Indexed, References `jobApplications._id`.)
    *   `interviewerId`: ObjectId (Required, Indexed, References `users._id` where `users.role` is "Interviewer".)
    *   `evaluationFormContent`: Object (Required, Flexible JSON object to store the dynamic evaluation form's questions and the interviewer's answers/ratings.)
    *   `score`: Number (Required, Score given by this specific interviewer, out of 100.)
    *   `comments`: String (Optional, Textual comments from the interviewer.)
    *   `evaluationDate`: Date (Required, Date when the evaluation was submitted.)
    *   `electronicSignature`: String (Required, Stores the interviewer's electronic signature (e.g., name or unique ID) as confirmation.)
    *   `isSubmitted`: Boolean (Required, Default: `false`. Set to `true` once the form is submitted, preventing further edits.)
    *   `createdAt`: Date
    *   `updatedAt`: Date
*   **Indexes:**
    *   `jobApplicationId`, `interviewerId` (Compound unique index to ensure each interviewer can submit only one evaluation per candidate per job application.)

---

**7. Collection: `documents`**
*   **Purpose:** Stores records of digital PDF files generated for employees (e.g., money transcripts, employment verification letters).
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `employeeId`: ObjectId (Required, Indexed, References `employees._id`.)
    *   `documentType`: String (Required, Indexed. Enum: "money_transcript", "employment_verification", "pay_stub", "leave_summary".)
    *   `documentName`: String (Required, User-friendly name for the document, e.g., "Money Transcript - January 2024".)
    *   `generatedDate`: Date (Required, Date when the PDF was generated.)
    *   `pdfUrl`: String (Required, URL to the stored generated PDF file.)
    *   `dataUsedForGeneration`: Object (Optional, JSON object containing specific contextual data used to generate this particular document instance, e.g., `{ period: "Jan 2024", grossPay: 5000 }` for a pay stub, allowing for traceability.)
    *   `createdAt`: Date
    *   `updatedAt`: Date

---

**Relationships (High-Level Overview for MongoDB):**
MongoDB, being a NoSQL database, doesn't enforce strict relational integrity at the database level like SQL. Relationships are managed at the application level by embedding or referencing `ObjectId`s.

*   **One-to-One:**
    *   `users` and `employees`: An `employee` record's `الرقم_المدني` (Civil ID) links to `users._id` for authentication. This allows employees to login using their Civil ID.
*   **One-to-Many:**
    *   An HR `user` can post many `jobAnnouncements`. (`jobAnnouncements.postedBy` references `users._id`)
    *   An `employee` can submit many `jobApplications`. (`jobApplications.employeeId` references `employees._id`)
    *   A `jobAnnouncement` can receive many `jobApplications`. (`jobApplications.jobId` references `jobAnnouncements._id`)
    *   A `jobApplication` can have multiple `interviewEvaluations` (from different interviewers) and one `interviewSession` (QR code).

**Authentication Flow:**
*   Users login using their Civil ID (which is stored as `users._id`)
*   The system validates credentials against the `users` collection
*   For employees, the system can fetch additional details from the `employees` collection using the Civil ID (`الرقم_المدني`)
*   This design allows for seamless authentication while maintaining detailed employee information in a separate collection
    *   An `employee` can have many generated `documents`. (`documents.employeeId` references `employees._id`)
    *   A `user` with the "Interviewer" role can perform many `interviewEvaluations`. (`interviewEvaluations.interviewerId` references `users._id`)

**Indexing Strategy:**
Indexes are crucial for performance in MongoDB.
*   **Unique Indexes:** Enforce uniqueness where needed (e.g., `users.email`, `employees.employeeId`, `interviewSessions.qrCodeString`, `jobApplications` (compound `jobId` & `employeeId`), `interviewEvaluations` (compound `jobApplicationId` & `interviewerId`)).
*   **Single Field Indexes:** For fields frequently used in queries, filters, or sorting (e.g., `users.role`, `employees.department`, `jobAnnouncements.status`, `jobApplications.status`, `documents.documentType`, `employees.yearsOfExperience`, `employees.specialization`, `jobAnnouncements.postedDate`, `jobApplications.applicationDate`, `interviewSessions.expiresAt`).
*   **Compound Indexes:** For queries that frequently filter or sort on multiple fields together (e.g., filtering `jobApplications` by `jobId` and then by `status` or `matchingScore`).

**Data Volume & Security Notes:**
*   Estimated `employees` volume: ~1000 records. MongoDB is well-suited for this scale and higher.
*   Security: Passwords will be hashed. Sensitive data access will be controlled at the application layer based on user roles (`HR` vs. `Employee` POVs). Environment variables will be used for database connection strings and other sensitive configurations.

## User Flow
User Flow Document - Maren

This document outlines the primary user journeys and interaction patterns for the Maren SAAS platform, catering to both HR and Employee personas. The goal is to digitalize and streamline paper-based procedures, focusing on efficiency, accessibility, and an intuitive user experience.

GLOBAL SYSTEM INTERACTIONS:

1.  LOGIN & AUTHENTICATION
    *   **Persona:** HR User, Employee User, Interviewer (temporary access)
    *   **Goal:** Securely access their respective dashboards and functionalities.
    *   **Pre-conditions:** User has a government email and a system-assigned account.
    *   **Steps:**
        1.  User accesses the Maren website URL.
        2.  System displays the **Login Page**.
        3.  User enters their "Government Email" and "Password".
        4.  User clicks the "Login" button.
        5.  **System Action:** Authenticates credentials.
        6.  **Success:** System redirects user to their respective Dashboard (HR Dashboard for HR, Employee Dashboard for Employee).
        7.  **Failure:** System displays an error message (e.g., "Invalid credentials").
    *   **Interaction Patterns:**
        *   Clean login form with input fields, labels, and a clear call-to-action button.
        *   Language toggle (AR/EN) and Dark/Light mode toggle accessible on this page.
        *   Subtle animations on input focus and button hover.
    *   **Wireframe Notes:**
        *   **Login Page:** Brand logo, title "تسجيل الدخول" (Login), input fields for "البريد الإلكتروني الحكومي" (Government Email) and "كلمة المرور" (Password), "تسجيل الدخول" (Login) button, "هل نسيت كلمة المرور؟" (Forgot Password?) link, language switcher, theme switcher.

2.  FORGOT PASSWORD & ACCOUNT RECOVERY
    *   **Persona:** HR User, Employee User
    *   **Goal:** Regain access to their account by resetting their password.
    *   **Pre-conditions:** User has forgotten their password.
    *   **Steps:**
        1.  From the Login Page, user clicks "Forgot Password?".
        2.  System displays the **Forgot Password Page**.
        3.  User enters their "Government Email" associated with their account.
        4.  User clicks "Send OTP".
        5.  **System Action:** Sends an OTP to the entered government email address.
        6.  System displays an **OTP Entry Page**.
        7.  User retrieves the OTP from their email and enters it into the provided field.
        8.  **System Action:** Automatically verifies the OTP upon full entry (no explicit button press required).
        9.  **Success:** If OTP is correct, system directly logs the user into their account (without requiring a new password setup page here for initial access).
        10. **Failure:** If OTP is incorrect, system displays an error message.
        11. User can then navigate to their Profile section to change their password manually.
    *   **Interaction Patterns:**
        *   Email input field, button to send OTP.
        *   Dedicated OTP input field with automatic submission.
        *   Loading/spinner feedback while OTP is sent/verified.
    *   **Wireframe Notes:**
        *   **Forgot Password Page:** Header "استعادة كلمة المرور" (Password Recovery), input field for "البريد الإلكتروني الحكومي" (Government Email), "إرسال رمز التحقق" (Send OTP) button.
        *   **OTP Entry Page:** Header "أدخل رمز التحقق" (Enter OTP), input fields for OTP (e.g., 6 separate boxes), text "لقد أرسلنا رمز التحقق إلى بريدك الإلكتروني الحكومي".

3.  GENERAL NAVIGATION & UI ELEMENTS
    *   **Persona:** All Users
    *   **Goal:** Navigate the platform efficiently, personalize view settings.
    *   **Interaction Patterns:**
        *   **Sidebar (HR & Employee POVs):** Appears on all pages except the QR code page and evaluation page. RTL positioning (right side). Smooth, subtle animations on hover and click for navigation items. Responsive for mobile (collapsible/hamburger menu).
        *   **Header Bar:** Consistent across all main pages. Includes user profile access, language toggle (AR/EN), Dark/Light mode toggle, and potentially notifications.
        *   **Language & Theme Switchers:** Icons in the header (and login page). Smooth transition between modes/languages. RTL for Arabic, LTR for English.
        *   **Responsiveness:** All pages are designed for desktop, tablet, and mobile. Tables will adapt (horizontal scroll or column visibility toggle). Forms will stack vertically on smaller screens.
        *   **Shadcn/UI & Tailwind CSS:** Consistent component styling, subtle animations using motion. Orange/white gradient theme for HR, Blue/white gradient theme for Employee.

USER FLOWS:

I. DIGITAL EMPLOYEE DATABASE (HR Persona)

**User Flow 1.1: HR - Access & Browse Employee Database**
*   **Persona:** HR User
*   **Goal:** Efficiently find, filter, sort, and view employee information.
*   **Pre-conditions:** HR user logged in.
*   **Steps:**
    1.  HR logs in and lands on the HR Dashboard.
    2.  HR navigates to "قاعدة بيانات الموظفين" (Employee Database) from the sidebar.
    3.  **System Action:** Displays the **Employee Database Page** with a table of all employees (estimated 1000 records).
    4.  HR uses the "بحث" (Search) bar to type an employee's name or ID.
    5.  **System Action:** Dynamically filters the table results as HR types.
    6.  HR uses "تصفية" (Filter) options (e.g., "القسم" - Department, "الحالة" - Status, "المسمى الوظيفي" - Job Title) to narrow down results.
    7.  HR uses "فرز" (Sort) options (e.g., "الاسم" - Name A-Z, "المعرف" - ID Asc/Desc, "تاريخ التوظيف" - Date Hired) by clicking column headers.
    8.  HR clicks on an employee's row in the table.
    9.  **System Action:** Navigates to the **Employee Details Page** for that specific employee.
*   **Interaction Patterns:**
    *   Live search with immediate results.
    *   Dropdowns for filter criteria (multi-select where applicable).
    *   Toggle icons on column headers for sorting (asc/desc).
    *   Table rows with hover states, indicating clickability.
    *   Pagination controls for large datasets.
*   **Wireframe Notes:**
    *   **Employee Database Page:** Header "قاعدة بيانات الموظفين", search bar, filter/sort dropdowns/buttons above the table. Table columns: "معرف الموظف" (Employee ID), "الاسم" (Name), "القسم" (Department), "المسمى الوظيفي" (Job Title), "الحالة" (Status). Pagination.

**User Flow 1.2: HR - View Individual Employee Details**
*   **Persona:** HR User
*   **Goal:** Access comprehensive information for a single employee.
*   **Pre-conditions:** HR user on Employee Database page, has clicked an employee row.
*   **Steps:**
    1.  From the Employee Database table, HR clicks on an employee's row.
    2.  **System Action:** Loads the **Employee Details Page** for the selected employee.
    3.  HR views various sections of the employee's personal information (e.g., "معلومات الاتصال" - Contact Info, "تاريخ التوظيف" - Employment History, "جهات الاتصال في حالات الطوارئ" - Emergency Contacts).
    4.  HR can navigate back to the Employee Database list using a "رجوع" (Back) button or breadcrumbs.
*   **Interaction Patterns:**
    *   Smooth page transition.
    *   Information displayed in well-organized sections or cards (read-only).
*   **Wireframe Notes:**
    *   **Employee Details Page:** Header with employee's name, dedicated sections/cards for different categories of information (e.g., "معلومات شخصية" - Personal Info, "تفاصيل التوظيف" - Employment Details). "رجوع" (Back) button.

II. DIGITALIZED INTERNAL HIRING PROCESS

**User Flow 2.1: HR - Post a New Job Announcement**
*   **Persona:** HR User
*   **Goal:** Create and publish one or multiple internal job openings.
*   **Pre-conditions:** HR user logged in.
*   **Steps:**
    1.  HR navigates to "إدارة التوظيف" (Hiring Management) -> "نشر إعلان جديد" (Post New Announcement) from the sidebar.
    2.  **System Action:** Displays the **Create Job Announcement Page**.
    3.  HR chooses between:
        *   **Option A: Upload PDF:** Clicks "تحميل ملف PDF" (Upload PDF) button, selects a PDF file. System displays a preview.
        *   **Option B: Fill Form:** Selects "تعبئة نموذج" (Fill Form). System presents a form. HR fills in "المسمى الوظيفي" (Job Title), "القسم" (Department), "وصف الوظيفة" (Job Description), "المتطلبات" (Requirements - e.g., Years of Experience, Specialization, Keywords), "الموعد النهائي للتقديم" (Application Deadline), "عدد الشواغر" (Number of Vacancies), etc.
    4.  HR can click "إضافة وظيفة أخرى" (Add Another Job) to add more job announcements within the same session (repeats step 3 options).
    5.  HR clicks "إرسال الإعلان(ات)" (Submit Announcement(s)).
    6.  **System Action:** Processes submission, validates data, publishes announcements.
    7.  **Success:** System redirects HR to the **Job Announcements Overview Page** with a success notification.
*   **Interaction Patterns:**
    *   Clear toggle/tabs for PDF upload vs. form fill.
    *   Drag-and-drop area for PDF, with file selection fallback.
    *   Real-time PDF preview.
    *   Form fields with validation feedback (e.g., required fields, date pickers).
    *   Dynamic "Add Another Job" button for multi-job posting.
    *   Submission button with loading spinner and success state.
    *   Toast notifications for success/failure.
*   **Wireframe Notes:**
    *   **Create Job Announcement Page:** Header "إنشاء إعلان وظيفة جديد", toggle for "تحميل ملف PDF" / "تعبئة نموذج". PDF upload area with preview. Form fields for job details. "إضافة وظيفة أخرى" button. "إرسال الإعلان(ات)" button.

**User Flow 2.2: HR - Manage Job Announcements & View Applicants**
*   **Persona:** HR User
*   **Goal:** Oversee all job announcements, preview details, manage applicants, and invite candidates for interviews.
*   **Pre-conditions:** HR user logged in, announcements posted.
*   **Steps:**
    1.  HR navigates to "إدارة التوظيف" (Hiring Management) -> "إعلانات الوظائف" (Job Announcements) from the sidebar.
    2.  **System Action:** Displays the **Job Announcements Overview Page**, listing all announcements as cards/rows.
    3.  HR can "تصفية" (Filter) by Status ("نشط" - Active, "مغلق" - Closed), Department, Date Posted, etc. HR can "فرز" (Sort) the list.
    4.  For each announcement card/row, HR sees: Job Title, Department, Status, Number of Applicants, and Action buttons.
    5.  HR clicks "معاينة" (Preview) on an announcement to see how employees view it.
    6.  HR clicks "عرض المتقدمين" (View Applicants) on an announcement card.
    7.  **System Action:** Navigates to the **Applicant List Page** for that specific job.
    8.  On the Applicant List Page, HR sees a table of all candidates who applied, with their "درجة المطابقة" (Matching Score - based on CV vs. requirements).
    9.  HR can filter/sort candidates (e.g., by Score High-Low, Name).
    10. HR reviews candidate profiles (by clicking on a candidate to view their CV and details) and matching scores.
    11. HR selects "المؤهلون للمقابلة" (Approved for Interview) candidates using checkboxes.
    12. HR clicks "إرسال دعوات المقابلة" (Send Interview Invitations).
    13. **System Action:** Triggers email/in-platform notifications to selected candidates with interview details (date, time, location/virtual link).
*   **Interaction Patterns:**
    *   Cards/rows for announcements, clearly displaying key metrics and action buttons.
    *   Modal or dedicated page for preview.
    *   Applicant table with score, link to CV, and checkboxes for selection.
    *   Confirmation dialog before sending invitations.
*   **Wireframe Notes:**
    *   **Job Announcements Overview Page:** Header "إعلانات الوظائف", filter/sort options. List of announcement cards: "المسمى الوظيفي" (Job Title), "القسم" (Department), "الموعد النهائي" (Deadline), "عدد المتقدمين" (Applicants Count), "معاينة" (Preview) button, "عرض المتقدمين" (View Applicants) button.
    *   **Applicant List Page (per job):** Header "المتقدمون لوظيفة [اسم الوظيفة]", table: "اسم المرشح" (Candidate Name), "البريد الإلكتروني" (Email), "درجة المطابقة" (Matching Score), "الحالة" (Status), "عرض السيرة الذاتية" (View CV) button, checkbox for "المؤهل للمقابلة" (Approved for Interview). "إرسال دعوات المقابلة" (Send Interview Invitations) button.

**User Flow 2.3: Employee - View & Apply for Internal Job Announcement**
*   **Persona:** Employee User
*   **Goal:** Discover and apply for internal job opportunities.
*   **Pre-conditions:** Employee user logged in, announcements active.
*   **Steps:**
    1.  Employee logs in and lands on the Employee Dashboard.
    2.  Employee navigates to "إعلانات الوظائف الداخلية" (Internal Job Announcements) from the sidebar.
    3.  **System Action:** Displays a list of active job announcements (similar to HR's preview).
    4.  Employee clicks on an announcement card/row to view full details.
    5.  **System Action:** Displays the **Job Details Page** for the selected job.
    6.  Employee reviews the job description and requirements.
    7.  Employee clicks "التقديم الآن" (Apply Now) button.
    8.  **System Action:** Displays the **Job Application Form**.
    9.  Employee fills out the form (personal details potentially pre-populated, additional questions).
    10. Employee uploads their CV (PDF/DOCX) using the upload component.
    11. Employee clicks "إرسال الطلب" (Submit Application).
    12. **System Action:** Processes the application, performs CV matching (years of experience, specialization, keywords), stores the application.
    13. **Success:** System displays a confirmation message (e.g., "تم إرسال طلبك بنجاح" - Your application has been submitted successfully).
    14. Employee can later view their application status (e.g., "تم التقديم" - Applied, "قيد المراجعة" - Under Review, "مدعو للمقابلة" - Interview Invited).
*   **Interaction Patterns:**
    *   Cards/rows for announcements, indicating details and application option.
    *   Clear "Apply Now" button.
    *   Application form with standard inputs and robust file upload (drag-and-drop or click).
    *   Submission feedback and confirmation.
*   **Wireframe Notes:**
    *   **Employee Job Announcements Page:** Header "إعلانات الوظائف الداخلية", list/grid of job announcement cards: Job Title, Department, Deadline, "عرض التفاصيل/التقديم" (View Details/Apply) button.
    *   **Job Details Page (Employee POV):** Header with Job Title, sections for Job Description, Requirements. "التقديم الآن" (Apply Now) button.
    *   **Job Application Form:** Header "التقديم لوظيفة [اسم الوظيفة]", form fields for details, CV upload component, "إرسال الطلب" (Submit Application) button.

**User Flow 2.4: Interviewer - Conduct Candidate Evaluation (QR Code Access)**
*   **Persona:** Interviewer (temporary, non-regular system user)
*   **Goal:** Access a specific evaluation form and submit scores for a candidate.
*   **Pre-conditions:** HR has generated and provided a time-limited QR code. Interviewer has the QR code and login credentials.
*   **Steps:**
    1.  Interviewer scans the QR code (printed or digital).
    2.  **System Action:** Redirects to a unique, secure URL (QR code page, no sidebar).
    3.  System prompts the interviewer for login credentials ("البريد الإلكتروني الحكومي" - Gov Email, "كلمة المرور" - Password) for security verification.
    4.  **System Action:** Authenticates the interviewer.
    5.  **Success:** System displays the **Candidate Evaluation Form** specific to the candidate and job linked to the QR code.
    6.  Interviewer fills out the evaluation form based on pre-defined criteria (e.g., communication, technical skills, problem-solving, cultural fit). Each criteria contributes to a total score out of 100.
    7.  Interviewer reviews the form for accuracy.
    8.  Interviewer performs an "التوقيع الإلكتروني" (Electronic Signature) to confirm submission (e.g., typing their name and checking a confirmation box).
    9.  Interviewer clicks "إرسال التقييم" (Submit Evaluation).
    10. **System Action:** Processes the evaluation, stores the score, and marks the QR code as expired (or sets its expiry time to 24 hours from generation, whichever comes first). The QR code is tied to one submission for that interviewer.
    11. **Success:** System displays a confirmation message (e.g., "تم إرسال تقييمك بنجاح" - Your evaluation has been submitted successfully) and prevents further submission or going back from this page.
*   **Interaction Patterns:**
    *   Minimalist, focused UI (no sidebar, no global navigation).
    *   Secure login gate.
    *   Intuitive evaluation form with various input types (sliders, radio buttons, text areas).
    *   Electronic signature component (e.g., text input for name, confirmation checkbox).
    *   "Submit" button with strong visual feedback (spinner, disabled after click).
    *   Immediate redirection or state change to prevent re-submission.
*   **Wireframe Notes:**
    *   **QR Code Login Page:** Simple login form for interviewers.
    *   **Candidate Evaluation Page:** Header "تقييم المرشح لـ [اسم المرشح] - [المسمى الوظيفي]". Evaluation form sections with scoring inputs (e.g., 1-10 scale for various attributes contributing to a total out of 100). Comments section. Electronic signature field. "إرسال التقييم" (Submit Evaluation) button.

**User Flow 2.5: HR - Review Interviewer Scores & Final Candidates**
*   **Persona:** HR User
*   **Goal:** Consolidate interviewer feedback, identify top candidates, and export results.
*   **Pre-conditions:** Interviews conducted, interviewer evaluations submitted.
*   **Steps:**
    1.  HR navigates to "إدارة التوظيف" (Hiring Management) -> "نتائج المقابلات" (Interviewer Scores) from the sidebar.
    2.  **System Action:** Displays the **Interviewer Scores Overview Page**.
    3.  HR sees a list of all jobs with completed interviews. Each job entry shows the "أعلى مرشح نقاطًا" (Highest Scoring Candidate) for that job at a glance.
    4.  HR can filter/sort jobs (e.g., by Department, Status, Date).
    5.  HR clicks on a specific job to view detailed candidate scores.
    6.  **System Action:** Displays the **Candidate Scores per Job Page**.
    7.  On this page, HR sees a table listing all interviewed candidates for that specific job, their individual scores from each interviewer, and the calculated "متوسط الدرجة" (Average Score) out of 100.
    8.  HR can filter/sort candidates within this table (e.g., by Average Score High-Low, Name).
    9.  HR clicks "تنزيل كملف Excel" (Download as Excel) button.
    10. **System Action:** Generates and downloads an Excel file containing the table data for that job.
    11. HR can navigate back to the Interviewer Scores Overview or to other sections.
*   **Interaction Patterns:**
    *   Job cards/rows displaying summary info (highest score candidate).
    *   Detailed table view for candidates per job (columns for each interviewer's score + average).
    *   Filtering/sorting controls for both job list and candidate table.
    *   Clear "Download as Excel" button.
    *   Responsive tables (horizontal scroll on smaller screens).
*   **Wireframe Notes:**
    *   **Interviewer Scores Overview Page:** Header "نتائج المقابلات", filter/sort options. List of Job Cards: "المسمى الوظيفي" (Job Title), "القسم" (Department), "أعلى مرشح نقاطًا" (Highest Score Candidate: Name, Score), "عرض التفاصيل" (View Details) button.
    *   **Candidate Scores per Job Page:** Header "نتائج المرشحين لوظيفة [اسم الوظيفة]", table: "اسم المرشح" (Candidate Name), "درجة المقابل 1" (Interviewer 1 Score), "درجة المقابل 2" (Interviewer 2 Score), ..., "متوسط الدرجة" (Average Score). Filter/Sort options for the table. "تنزيل كملف Excel" (Download as Excel) button.

III. AUTOMATED PDF GENERATION (Employee Persona)

**User Flow 3.1: Employee - Download Automated PDF Documents**
*   **Persona:** Employee User
*   **Goal:** Instantly generate and download personal documents without HR intervention.
*   **Pre-conditions:** Employee user logged in.
*   **Steps:**
    1.  Employee logs in.
    2.  Employee navigates to "مستنداتي" (My Documents) or "مركز التنزيل" (Download Center) from the sidebar.
    3.  **System Action:** Displays the **My Documents Page**, listing available document types (e.g., "كشف الراتب" - Money Transcript, "خطابات إثبات التوظيف" - Employment Verification Letters, "كشوف الرواتب" - Pay Stubs, "ملخص الإجازات" - Leave Summaries) as buttons or cards.
    4.  Employee clicks on the desired document type (e.g., "كشف الراتب" - Money Transcript).
    5.  **System Action:** If parameters are needed (e.g., year for Money Transcript, month/year for Pay Stubs, to/from dates for Leave Summaries), a modal or inline form appears.
    6.  Employee selects the required parameters (e.g., "اختر السنة" - Select Year).
    7.  Employee clicks "إنشاء وتنزيل" (Generate & Download).
    8.  **System Action:** Instantly generates the PDF file based on employee's data and selected parameters.
    9.  **Success:** System automatically triggers a download of the PDF file to the employee's device and displays a success notification.
*   **Interaction Patterns:**
    *   List of document types as clearly labeled buttons/cards.
    *   Intuitive date pickers or dropdowns for parameter selection.
    *   Immediate PDF generation and browser-level download prompt.
    *   Toast notification for success.
*   **Wireframe Notes:**
    *   **My Documents Page:** Header "مستنداتي", grid/list of document type cards/buttons: "كشف الراتب", "خطاب إثبات توظيف", "كشوف الرواتب", "ملخص الإجازات".
    *   **On Document Type Click (e.g., Pay Stubs):** A small modal or section with dropdowns for "السنة" (Year) and "الشهر" (Month), and a "إنشاء وتنزيل" (Generate & Download) button.

## Styling Guidelines
STYLING

1.  Introduction/Overview
"Maren" is a SaaS platform designed for government facility HR and employees, aiming to digitalize and streamline HR procedures. This styling guide outlines the visual language and user experience principles that will ensure a consistent, intuitive, and efficient interface across the application. The design emphasizes clarity, accessibility, and a smooth user journey, tailored specifically for both HR and employee perspectives.

2.  Design Principles
*   **User-Centric Design:** Prioritize ease of use, reduce procedural steps, and enhance overall user experience. The interface should be intuitive, requiring minimal cognitive load.
*   **Clarity & Simplicity:** Focus on clean layouts, clear typography, and a purposeful use of space to present information effectively. Avoid visual clutter.
*   **Consistency:** Maintain a unified visual language, component behavior, and interaction patterns across all sections and user roles to build familiarity and trust.
*   **Responsiveness:** Ensure a seamless experience across various devices, including desktop, tablet, and mobile, with adaptive layouts and optimal usability.
*   **Accessibility:** Design with accessibility in mind, supporting RTL (Arabic) and LTR (English) languages, dark/light mode, and clear visual hierarchy.
*   **Subtle Animation:** Incorporate subtle and meaningful animations to enhance user feedback and create a smooth, engaging experience without distracting or slowing down interactions.
*   **Brand Identity:** Establish distinct visual identities for HR and Employee portals while maintaining overarching brand consistency for "Maren".

3.  Color Palette
The color palette is designed to differentiate between the HR and Employee portals while using gradients to add a modern and dynamic feel.

*   **HR Department Theme:**
    *   **Primary Accent:** Orange (e.g., #FF8C00 - Dark Orange, or similar vibrant, professional shade).
    *   **Secondary Accent:** Complementary shades of orange or a neutral, subtle accent.
    *   **Backgrounds & Surfaces:** Predominantly White (#FFFFFF) to ensure readability and a clean aesthetic.
    *   **Gradients:** Employ subtle orange-to-light-orange or orange-to-white gradients for headers, buttons, and key interactive elements to provide depth and modernity.
        *   _Example Gradient (Orange to White):_ `linear-gradient(to right, #FF8C00, #FFFFFF)`
        *   _Example Gradient (Orange to Darker Orange):_ `linear-gradient(to right, #FF8C00, #E67A00)`

*   **Employee Department Theme:**
    *   **Primary Accent:** Blue (e.g., #007BFF - Dodger Blue, or similar professional and calming shade).
    *   **Secondary Accent:** Complementary shades of blue or a neutral, subtle accent.
    *   **Backgrounds & Surfaces:** Predominantly White (#FFFFFF) for consistency with HR theme's base color, ensuring a clean and accessible interface.
    *   **Gradients:** Utilize subtle blue-to-light-blue or blue-to-white gradients for interactive elements and visual highlights.
        *   _Example Gradient (Blue to White):_ `linear-gradient(to right, #007BFF, #FFFFFF)`
        *   _Example Gradient (Blue to Darker Blue):_ `linear-gradient(to right, #007BFF, #0056B3)`

*   **Neutral & Common Colors (Across Both Themes):**
    *   **Text:** Dark Grey (#333333) for primary text, Lighter Grey (#666666) for secondary text and labels.
    *   **Borders & Dividers:** Light Grey (#CCCCCC) for subtle separation.
    *   **Success:** Green (#28A745)
    *   **Warning:** Yellow/Amber (#FFC107)
    *   **Error/Danger:** Red (#DC3545)
    *   **White:** #FFFFFF (for backgrounds, text in dark mode)
    *   **Black:** #000000 (for specific elements, text in light mode, or dark mode backgrounds)

*   **Dark Mode Palette:**
    *   Invert or adapt the primary and neutral colors for readability and visual comfort in a dark environment.
    *   **Backgrounds:** Dark Grey (#1A1A1A) or Black (#000000).
    *   **Text:** White (#FFFFFF) or very light grey.
    *   **Accents (Orange/Blue):** Retain vibrancy but slightly desaturate if necessary to prevent eye strain.
    *   **Gradients:** Adapt gradient directions or colors to ensure they remain subtle and aesthetically pleasing on dark backgrounds.

4.  Typography
Typography plays a crucial role in readability and information hierarchy, especially given the RTL language requirement.

*   **Font Family:**
    *   For Arabic, a modern, highly legible, and widely supported font such as `Noto Sans Arabic` or `Cairo` should be prioritized.
    *   For Latin characters (English), `Inter` or `Roboto` are suitable choices, known for their versatility and readability.
    *   The font stack should prioritize the Arabic font for RTL, followed by the Latin font for LTR and as a fallback:
        `'Noto Sans Arabic', 'Inter', 'Roboto', sans-serif;`
*   **Font Weights:** Utilize a limited set of weights (e.g., Regular, Medium, Semi-bold, Bold) to define hierarchy without overcomplicating.
*   **Headings (H1, H2, H3, H4, H5, H6):**
    *   Use larger font sizes and bolder weights for main titles and section headings to clearly delineate content.
    *   H1: Major page titles (e.g., "Digital Employee Database") - Largest, Bold.
    *   H2: Main section titles within a page (e.g., "Employee Information," "Announcements") - Large, Semi-bold.
    *   H3: Sub-section titles (e.g., "Personal Details," "Job History") - Medium-large, Medium.
    *   H4-H6: Used for smaller titles, labels, or emphasizing specific information.
*   **Body Text:**
    *   Optimal readability: 16px (desktop), 14-15px (mobile) for primary body text.
    *   Regular weight for general content.
    *   Line height should be sufficient (e.g., 1.5 times the font size) to improve readability, especially for Arabic script.
*   **Labels & Helper Text:** Smaller font sizes (e.g., 12-14px) and lighter weights where appropriate.
*   **RTL/LTR Considerations:**
    *   Text alignment: `text-align: right;` for Arabic content, `text-align: left;` for English.
    *   Directionality: `direction: rtl;` for Arabic, `direction: ltr;` for English.
    *   Mirroring: Ensure UI elements like pagination, progress indicators, and form layouts are mirrored correctly when switching between RTL and LTR.

5.  UI Components
Leveraging `shadcn/ui` as the base component library, with emphasis on subtle customization and smooth user interaction.

*   **General Usage:**
    *   Components should be used consistently across the application.
    *   Prioritize `shadcn/ui` defaults where they align with the design principles, customizing colors (using Tailwind CSS) and subtle styling as needed to match the HR/Employee themes.
    *   Avoid introducing custom components unless absolutely necessary, and ensure they follow the same design language.
*   **Animations & Transitions:**
    *   Implement subtle animations using motion libraries (e.g., Framer Motion) for elements like:
        *   Page transitions (smooth fades or slides).
        *   Hover states on buttons and interactive elements (slight scale or color change).
        *   Form field focus indicators (subtle outline or shadow).
        *   Modal and dialog opening/closing (fade-in/fade-out).
        *   Tab transitions and content loading.
    *   Animations should be quick (e.g., 150-300ms duration) and purposeful, enhancing UX without feeling distracting or slow.
    *   Avoid excessive or flashy animations.
*   **Responsiveness:**
    *   All components must be fully responsive, adapting gracefully to different screen sizes (desktop, tablet, mobile).
    *   Utilize Tailwind CSS's responsive utility classes (`sm:`, `md:`, `lg:`, `xl:`) for layout and sizing adjustments.
    *   Breakpoints should be carefully considered to ensure optimal content presentation and interaction across devices.
    *   Navigation (sidebar) should adapt for mobile (e.g., collapsing into a hamburger menu).

6.  Layout & Grid
A consistent layout system is vital for clarity and navigability.

*   **Sidebar Integration:**
    *   The main navigation sidebar will be a persistent element on the left (LTR) or right (RTL) side of most pages.
    *   It should be present on all main application pages, providing quick access to different sections.
    *   **Exclusions:** The QR code page and the interviewer evaluation page will be full-screen, without the sidebar, to minimize distractions and provide a focused experience.
    *   The sidebar should be responsive, potentially collapsing or becoming a toggleable menu on smaller screens.
*   **Content Areas:**
    *   Main content will occupy the primary central area, dynamically adjusting based on screen size and sidebar presence.
    *   Consistent padding and margins should be applied throughout to ensure visual breathing room.
    *   Utilize a flexible grid system (e.g., CSS Grid or Flexbox with Tailwind) to manage content distribution and responsiveness.
*   **Page Structure:**
    *   **Dashboard/Home:** Overview of key information, quick links.
    *   **Data Tables:** Consistent table styling for employee database, job applications, interview scores (filters, search, sorting prominent).
    *   **Forms:** Clear labeling, input fields, error states, and submission buttons.
    *   **Modals/Dialogs:** Used for secondary actions, confirmations, or detailed views.

7.  Iconography
*   **Source:** Utilize a consistent icon library (e.g., Lucide Icons as typically used with shadcn/ui, or Material Icons) for all UI elements.
*   **Style:** Line icons are preferred for a modern, clean look. Icons should be easily recognizable and complement the overall aesthetic.
*   **Usage:** Icons should be used to enhance comprehension, guide users, and represent actions (e.g., search, filter, download, edit, delete, preview).

8.  Imagery
*   **Photography:** If any, should be professional, relevant to a government/corporate environment, and high-quality.
*   **Illustrations:** Consider minimal, abstract illustrations for empty states or onboarding, aligning with the clean aesthetic and potentially using theme colors.
*   **Performance:** All images should be optimized for web performance to ensure fast loading times.

9.  Accessibility & Internationalization
*   **RTL/LTR Support:**
    *   The entire website must seamlessly switch between RTL (Arabic) and LTR (English).
    *   All layouts, text alignment, progress indicators, and form element ordering must automatically adapt.
    *   Tailwind CSS's `rtl:` and `ltr:` variants should be extensively used where applicable.
*   **Dark/Light Mode:**
    *   A toggle for dark/light mode must be available site-wide, remembering user preference.
    *   All UI elements, colors, and backgrounds must have defined states for both modes to ensure visual integrity and readability.
*   **Contrast:** Ensure sufficient color contrast ratios for text and interactive elements to meet WCAG AA standards.
*   **Keyboard Navigation:** All interactive elements must be fully navigable and operable via keyboard.
*   **Screen Readers:** Implement appropriate ARIA attributes for enhanced screen reader compatibility and semantic understanding of the UI.
*   **Focus Management:** Clear visual focus indicators for interactive elements.
*   **Error States:** Clear and actionable feedback for form validation errors and system messages.
