# Abdullah Abu Saghirah — Developer Portfolio + Admin Panel

This is a complete, deploy-ready developer portfolio built with Next.js, Firebase, and Tailwind CSS. It features a public-facing portfolio site with full RTL support for Arabic, and a secure admin panel for content management.

## Features

- **Public Portfolio**: A modern, single-page portfolio showcasing projects, skills, experience, and education.
- **Admin Panel**: A secure dashboard (`/admin`) for managing all site content in real-time.
- **Bilingual Support**: Default Arabic (RTL) layout with a toggle for English (LTR). Content is stored and served in both languages.
- **Firebase Backend**: Utilizes Firebase Authentication and Firestore for user management and a real-time database.
- **Cloudinary for Images**: Integrated with Cloudinary for robust image hosting, using client-side unsigned uploads.
- **Responsive & Modern UI**: Built with Tailwind CSS for a mobile-first, responsive, and aesthetically pleasing design using ShadCN components.
- **SEO Optimized**: Includes AI-powered generation of meta tags, Open Graph data, and JSON-LD schemas for enhanced search engine visibility.
- **Real-time Updates**: Content changes made in the admin panel are reflected instantly on the public site thanks to Firestore's real-time capabilities.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Authentication & Firestore)
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Language**: TypeScript
- **Form Management**: React Hook Form with Zod for validation
- **Icons**: Lucide React

---

## Project Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install Dependencies

Install the required npm packages.

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project by copying the example file.

```bash
cp .env.example .env.local
```

Now, open `.env.local` and fill in your credentials.

#### a. Firebase Credentials

1.  Go to the [Firebase Console](https://console.firebase.google.com/).
2.  Create a new project or select an existing one.
3.  Go to **Project settings** > **General**.
4.  Under "Your apps", click the **Web** icon (`</>`) to add a web app.
5.  Register your app and you will find the `firebaseConfig` object. Copy the values into your `.env.local` file.

```ini
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

#### b. Cloudinary Credentials

1.  Go to your [Cloudinary Dashboard](https://cloudinary.com/console).
2.  Your **Cloud Name** is displayed at the top.
3.  Navigate to **Settings** (gear icon) > **Upload**.
4.  Scroll down to **Upload presets**. Click **Add upload preset**.
5.  Set **Signing Mode** to **Unsigned**. You can leave other settings as default.
6.  Take note of the **Upload preset name**.
7.  Update your `.env.local` file:

```ini
# .env.local
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=...
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=... # Your new unsigned preset name
```

### 4. Configure Firestore

#### a. Create Firestore Database

1.  In the Firebase Console, go to **Firestore Database**.
2.  Click **Create database**.
3.  Start in **production mode**.
4.  Choose a location for your database.

#### b. Set Up Security Rules

1.  Go to the **Rules** tab in the Firestore section.
2.  Copy the contents of the `firestore.rules` file from this repository.
3.  Paste them into the editor and click **Publish**.

#### c. Create Admin User

1.  In the Firebase Console, go to **Authentication**.
2.  Go to the **Sign-in method** tab and enable **Email/Password** and optionally **Google**.
3.  Go to the **Users** tab and click **Add user**. Create your first admin user account.
4.  Copy the **User UID** of the newly created user.
5.  Go back to **Firestore Database**.
6.  Create a collection named `admins`.
7.  Click **Add document**. The **Document ID** must be the **User UID** you copied.
8.  Add a field:
    -   `role` (Type: string, Value: `admin`)
9.  Click **Save**.

Your first user now has admin privileges.

### 5. Run the Development Server

You are now ready to run the application locally.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public portfolio.
To access the admin panel, navigate to [http://localhost:3000/login](http://localhost:3000/login) and sign in with the admin account you created.

---

## Deployment

You can deploy this project to any platform that supports Next.js, such as Vercel, Netlify, or Firebase App Hosting.

### General Steps

1.  Push your code to a Git repository (e.g., GitHub).
2.  Choose a hosting provider and link your repository.
3.  Configure the environment variables in your hosting provider's dashboard. Use the same keys and values from your `.env.local` file. **Do not commit your `.env.local` file to Git.**
4.  The build command is `npm run build` and the output directory is typically `.next`.

### Security Checklist

-   **NEVER** commit `.env.local` or any file with secrets to your Git repository.
-   Use the environment variable management system provided by your hosting service to store secrets.
-   If you accidentally leak a key, rotate it immediately.
-   The `firestore.rules` are configured to be secure, but always review them before deploying to production.

---

## Using the Admin Panel

-   **Login**: Access the login page at `/login`.
-   **Dashboard**: An overview of your site's content.
-   **Settings**: Manage general site information like your name, tagline, about section, and social media links.
-   **Projects**: Add, edit, and delete portfolio projects. Upload images directly to Cloudinary from this interface.
-   **Skills, Experience, Education**: Manage the respective sections of your portfolio.
-   **Messages**: View and manage messages sent through the contact form.
-   **Generate Metadata**: Use the AI-powered tool within the Settings or Projects forms to generate SEO-friendly metadata.
# Portfolio-Pro
