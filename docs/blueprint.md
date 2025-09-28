# **App Name**: Portfolio Pro

## Core Features:

- RTL/LTR Toggle: Allows users to switch the site's layout between right-to-left (Arabic) and left-to-right (English) directions, with content in the selected language.
- Admin Panel Authentication: Secure admin panel accessible only via Firebase Authentication (email/password) with admin role check in Firestore. Google login optional.
- Content Management: Admin panel for creating, reading, updating, and deleting site content (hero text, about section, projects, skills, experience, education).
- Image Upload to Cloudinary: Allows administrators to upload images to Cloudinary using client-side unsigned uploads and store the image URLs in Firestore.
- Real-time Content Updates: Uses Firestore `onSnapshot` listeners to provide real-time updates of content on the public-facing website.
- Contact Form: Allows users to submit messages via a contact form, which are then stored in the 'messages' collection in Firestore.
- Metadata Generation: AI-powered tool that suggests SEO-friendly meta descriptions, Open Graph tags, and JSON-LD Person schema based on the content.

## Style Guidelines:

- Primary color: Deep Indigo (#4F46E5) to evoke professionalism and modernity.
- Background color: Very light gray (#F9FAFB), close to white, for a clean and modern feel.
- Accent color: Vibrant Violet (#8B5CF6) for interactive elements and highlights, providing a sense of energy and sophistication.
- Body: 'PT Sans', a humanist sans-serif providing a modern yet welcoming feel. Headlines: 'Space Grotesk' for titles, because of its techy and scientific feel.
- Use open-source Heroicons for a consistent and clean aesthetic.
- Mobile-first, responsive layout using Tailwind CSS grid and flexbox.
- Subtle fade-in animations for content loading and transitions.