# MailMind Frontend

MailMind is an intelligent, modern email client designed to bring clarity and efficiency to your inbox. This frontend is built with React, Vite, and TypeScript, offering a fast, responsive, and feature-rich user experience.

## ✨ Features

- **Google OAuth Integration**: Securely log in and link multiple Gmail accounts.
- **Unified Inbox**: View and manage emails from all connected accounts in one place.
- **Smart Labeling**:
  - Create, edit, and delete custom labels with unique colors.
  - Use natural language prompts to have AI automatically categorize incoming emails.
- **Real-Time Sync**: Keeps your inbox up-to-date with the latest emails.
- **System Views**: Quickly access important emails with dedicated views for Starred, Sent, Drafts, Spam, and Archived (Done).
- **Optimistic UI Updates**: Actions like starring, archiving, and marking as read are reflected instantly for a seamless experience.
- **Infinite Scroll**: Effortlessly browse through long lists of emails.
- **Responsive Design**: A fully responsive interface that works beautifully on both desktop and mobile devices.
- **Light & Dark Mode**: Switch between themes to suit your preference.
- **Protected Routes**: Ensures that your email data is secure and only accessible when you are logged in.

## 🚀 Tech Stack

- **Framework**: [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: Built with [shadcn/ui](https://ui.shadcn.com/) and [Radix UI](https://www.radix-ui.com/) for accessible and composable components.
- **State Management**:
  - [TanStack Query (React Query)](https://tanstack.com/query/latest) for server state management, caching, and data fetching.
  - [Zustand](https://zustand-demo.pmnd.rs/) for lightweight global client state.
- **Routing**: [React Router](https://reactrouter.com/) for client-side routing.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth and delightful animations.
- **Linting/Formatting**: ESLint and Prettier for code quality and consistency.

## ⚙️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v22 or higher recommended)
- [npm](https://www.npmjs.com/) or a compatible package manager

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/anuragK2048/MailMind-frontend.git
    cd MailMind-frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the following variable. This should point to the URL of your backend server.

    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```

### Running the Application

Once the installation is complete, you can run the development server:

```bash
npm run dev
```

This will start the application, and you can view it in your browser at `http://localhost:5173` (or another port if 5173 is in use).

## 📜 Available Scripts

This project includes the following scripts defined in `package.json`:

- `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
- `npm run build`: Compiles and bundles the application for production.
- `npm run lint`: Lints the codebase using ESLint to find and fix problems.
- `npm run preview`: Starts a local server to preview the production build.
