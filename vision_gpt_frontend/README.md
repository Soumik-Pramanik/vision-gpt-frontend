# Vision GPT Frontend

A modern React + TypeScript frontend application with image upload and chat functionality.

## Features

- **Image Upload**: Drag and drop or click to upload images
- **Real-time Chat**: Chat interface that appears after image upload
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS for a clean, professional look

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Click on the upload area or drag and drop an image
2. Once the image is uploaded, the chat interface will appear
3. Start typing messages in the chat input
4. Press Enter or click the Send button to send messages

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
vision_gpt_frontend/
├── src/
│   ├── components/
│   │   └── ChatInterface.tsx    # Chat component with messages display
│   ├── App.tsx                  # Main application component
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global styles with Tailwind
├── index.html                   # HTML template
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── tailwind.config.js           # Tailwind CSS configuration
```

## Customization

You can customize the application by:
- Modifying the color scheme in [tailwind.config.js](tailwind.config.js)
- Adding backend API integration in [src/App.tsx](src/App.tsx)
- Extending the chat functionality with additional features
- Adding file type restrictions or size limits

## Future Enhancements

- Connect to backend API for actual image analysis
- Add support for multiple image uploads
- Implement message history persistence
- Add user authentication
- Support for file downloads/exports

## License

MIT
