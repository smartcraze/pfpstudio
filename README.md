# 🎨 Animated Profile Creator

A fullstack web application built with Next.js that allows users to create stunning animated profile pictures for social media platforms like Google profiles, LinkedIn, and more.

## ✨ Features

- 📸 **Image Upload**: Upload your profile picture with drag & drop support
- 🎯 **Background Removal**: Remove backgrounds with one click (client-side processing + API integration ready)
- 🔄 **Shape Selection**: Choose between circle and square profiles
- 🎭 **Animation Templates**: 6 different animation styles:
  - Pulse Effect
  - Bounce Animation
  - Spin Rotation
  - Glow Effect
  - Rainbow Border
  - Wave Distortion
- 🎨 **Customization Options**:
  - Zoom control (50% - 200%)
  - Rotation (-180° to 180°)
  - Position adjustment (X & Y axis)
  - Background color picker
  - 16 preset colors + custom colors
- 💾 **Export Options**:
  - Download as PNG (static)
  - Download as GIF (animated)
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🌙 **Dark Mode**: Full dark mode support

## 🚀 Tech Stack

- **Framework**: Next.js 16.1.4 with App Router
- **Runtime**: Bun (Package Manager & Runtime)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Image Processing**: HTML5 Canvas, Sharp
- **Animations**: Framer Motion, CSS animations
- **GIF Generation**: gif.js
- **UI Components**: Radix UI primitives
- **TypeScript**: Full type safety

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd animated-profile
   ```

2. **Install dependencies using Bun**
   ```bash
   bun install
   ```

3. **Run the development server**
   ```bash
   bun run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 How to Use

1. **Upload Your Image**: Click "Choose Image" to upload your profile picture
2. **Remove Background**: Click "Remove Background" to automatically remove the background
3. **Choose Shape**: Select circle or square format
4. **Adjust Position**: Use the sliders to adjust zoom, rotation, and position
5. **Select Animation**: Choose from 6 different animation styles
6. **Customize Colors**: Pick background colors from presets or use custom colors
7. **Download**: Export as PNG (static) or GIF (animated)

## 🚀 Deployment

### Vercel (Recommended)
```bash
bun run build
vercel deploy
```

## 📄 License

This project is licensed under the MIT License.

---

Made with ❤️ using Next.js, Bun & shadcn/ui
