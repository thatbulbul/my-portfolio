# Portfolio Website

A modern, responsive portfolio website built with Next.js, featuring video backgrounds, smooth animations, and a contact form integrated with Google Sheets.

## 🚀 Features

- **Responsive Design** - Optimized for desktop and mobile devices
- **Video Hero Section** - Separate videos for desktop and mobile views
- **Smooth Animations** - GSAP-powered scroll animations
- **Contact Form** - Integrated with Google Apps Script for form submissions
- **Dark Theme** - Premium dark theme with cyan/blue accents
- **Glassmorphism Effects** - Modern UI with backdrop blur effects
- **Cosmic Background** - Animated particle background

## 🛠️ Tech Stack

- **Framework:** Next.js 16.0.3 (Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (GreenSock Animation Platform)
- **Icons:** Lucide React
- **Deployment:** Vercel-ready

## 📁 Project Structure

```
portfolio-web/
├── app/
│   ├── api/contact/route.ts    # Contact form API endpoint
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── sections/
│   │   ├── hero.tsx            # Hero section with video
│   │   ├── about.tsx           # About section
│   │   ├── projects.tsx        # Projects showcase
│   │   ├── experience.tsx      # Work experience
│   │   └── contact.tsx         # Contact form
│   ├── navigation.tsx          # Navigation bar
│   └── cosmic-scene.tsx        # Background animation
├── public/
│   ├── images/
│   │   ├── Hero.png            # Desktop fallback image
│   │   └── mob-image.png       # Mobile fallback image
│   └── video/
│       ├── hero-video.mp4      # Desktop video
│       └── mob-video.mp4       # Mobile video
└── README.md
```

## 🎨 Sections

1. **Hero** - Full-screen video background with responsive design
2. **About** - Personal introduction and skills showcase
3. **Projects** - Portfolio of work and projects
4. **Experience** - Professional work history
5. **Contact** - Contact form with Google Sheets integration

## 📱 Responsive Features

- **Desktop:** Full-width video with `object-contain`
- **Mobile:** Optimized vertical video with `object-cover`
- **Navigation:** Hamburger menu for all screen sizes
- **Adaptive Layouts:** Responsive grid systems throughout

## 🔧 Setup & Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio-web
```

2. Install dependencies:
```bash
npm install
```

3. Add your assets:
   - Place desktop video at `/public/video/hero-video.mp4`
   - Place mobile video at `/public/video/mob-video.mp4`
   - Place desktop image at `/public/images/Hero.png`
   - Place mobile image at `/public/images/mob-image.png`

4. Configure Google Apps Script:
   - Update the script URL in `/app/api/contact/route.ts`

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 📧 Contact Form Setup

The contact form uses Google Apps Script to store submissions in Google Sheets:

1. Create a Google Sheet
2. Deploy the Apps Script (see `/convert.js` for reference)
3. Update the script URL in `/app/api/contact/route.ts`

## 🎯 Key Features Implementation

### Video Background
- Separate assets for desktop/mobile
- Fallback images for loading states
- Autoplay with muted audio

### Contact Form
- Server-side API route to avoid CORS
- Success/error message display
- Form validation

### Animations
- GSAP ScrollTrigger for scroll-based animations
- Smooth page transitions
- Hover effects and interactions

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Bulbul Sharma**
- Email: bulbulsharma3363@gmail.com
- LinkedIn: [bulbul-sharma](https://www.linkedin.com/in/bulbul-sharma-08475a280/)
- GitHub: [@thatbulbul](https://github.com/thatbulbul)
- Phone: +91-8057328599
- Location: Greater Noida, India

## 🚀 Deployment

This project is optimized for deployment on Vercel:

```bash
npm run build
```

Deploy to Vercel with one click or via CLI:
```bash
vercel
```

---

Built with ❤️ using Next.js and TypeScript
