# Room Rental System

A full-featured room rental platform built with React, Vite, and Tailwind CSS. This application allows users to list, search, book, and manage rental rooms, with integrated chat, payment, and admin features.

## Features

- User authentication (register, login, verification)
- Add, edit, and delete room listings
- Search and filter rooms by location and details
- Interactive map view for room locations
- Booking system with payment integration
- Chat system for communication between users
- User profile management
- Admin dashboard for managing users and rooms
- Payment history and success pages
- Private routes for protected pages

## Tech Stack

- **Frontend:** React, Vite
- **Styling:** Tailwind CSS, custom CSS
- **State Management:** React Context, custom reducers
- **Routing:** React Router
- **Utilities:** Axios for API requests

## Folder Structure

```
src/
  actions/         # Redux-like action creators
  assets/          # Images and static assets
  components/      # Reusable UI components
  constants/       # App-wide constants
  context/         # Auth and route context providers
  pages/           # Main app pages (Home, Register, Admin, etc.)
  reducers/        # State reducers
  routes/          # App routing
  utils/           # Utility functions (e.g., Axios hook)
public/            # Static files
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Kz1232/room-rental-system-react.git
   cd room-rental-system-react
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```sh
npm run build
# or
yarn build
```

### Preview Production Build

```sh
npm run preview
# or
yarn preview
```

## Environment Variables

Create a `.env` file in the root directory and add your API endpoints and keys as needed:

```
VITE_API_URL=https://your-api-url.com
```

## Usage

- Register and verify your account
- Log in to access features
- Add new rooms or browse available listings
- Book rooms and complete payments
- Chat with other users
- View and manage your bookings and payment history
- Admins can manage users and rooms

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

