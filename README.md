<!-- Logo -->
<p align="center">
    <img src="https://raw.githubusercontent.com/Zouhair-Al-Yazji/the-wild-oasis-ts/main/public/logo-light.png" width="150" alt="The Wild Oasis Logo" />
</p>

<!-- Title & Tagline -->
<h1 align="center">The Wild Oasis 🏕️</h1>
<p align="center"><i>Luxury cabin hotel management made simple</i></p>

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-blue?logo=tailwindcss" alt="TailwindCSS" />
  <img src="https://img.shields.io/github/license/Zouhair-Al-Yazji/the-wild-oasis-ts" alt="License" />
  <img src="https://img.shields.io/github/stars/Zouhair-Al-Yazji/the-wild-oasis-ts?style=social" alt="Stars" />
  <img src="https://vercelbadge.vercel.app/api/Zouhair-Al-Yazji/the-wild-oasis-ts" alt="Vercel" />
</p>

## 📑 Table of Contents

- [📖 About the Project](#-about-the-project)
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [💻 Getting Started](#-getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [🚀 Usage](#-usage)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙌 Acknowledgements](#-acknowledgements)

## 📖 About the Project

**The Wild Oasis** is a custom-built internal application for managing a small boutique hotel with luxurious wooden cabins.  
It streamlines hotel operations, from managing cabins and guests to handling bookings and check-ins.  
The system ensures that hotel staff can efficiently perform daily tasks with a clean, modern interface.

🔗 **Live Demo:** [the-wild-oasis-ts-phi.vercel.app](https://the-wild-oasis-dashboard-zouhair.vercel.app)

## ✨ Features

- 🔒 **Authentication** — Secure login for hotel employees; accounts created only inside the app.
- 🧑‍💼 **User Management** — Change avatar, name, and password.
- 🛏 **Cabins Management** — View, add, edit, delete cabins with photos, price, capacity, and discounts.
- 📅 **Bookings** — Manage dates, guest details, payment status, and breakfast options.
- 📊 **Dashboard** — Daily check-ins/outs, stats, occupancy rate, sales & stay duration charts.
- ⚙️ **Settings** — Configure breakfast price, min/max nights, and max guests.
- 🌙 **Dark Mode** — Modern UI with theme switching.

## 🛠 Tech Stack

- **Frontend:** React, React Router, Tailwind CSS, ShadCN
- **State Management:** TanStack Query, React Context API
- **Forms:** React Hook Form
- **Charts:** Recharts
- **Date Utilities:** date-fns
- **Backend & Auth:** Supabase
- **Other Tools:** React Icons, React Hot Toast

## 💻 Getting Started

### Requirements

- **Node.js** ≥ 18
- **pnpm** package manager
- Supabase project for backend

### Installation

```bash
# Clone the repository
git clone https://github.com/Zouhair-Al-Yazji/The-Wild-Oasis-Dashbord.git

# Navigate into the project folder
cd The-Wild-Oasis

# Install dependencies
pnpm install
```

### Environment Variables

Inside the supabase.ts create these two variables
`SUPABASE_URL=your-supabase-url`
`SUPABASE_KEY=your-supabase-anon-key`
`SUPABASE_CLIENT=your-supabase-anon-key`

## 🚀 Usage

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🤝 Contributing

Contributions are welcome! 🎉

Fork the repository

Create a feature branch:

```bash
git checkout -b feature-branch
```

Commit changes:

```bash
git commit -m "Add amazing feature"
```

Push to branch:

```bash
git push origin feature-branch
```

## 📄 License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License — see the LICENSE file.

## 🙌 Acknowledgements

- **Supabase** — Backend & authentication</li>
- **React + TailwindCSS** — Modern UI framework</li>
- **Vercel** — Hosting platform</li>
- **Inspiration** — Boutique hotel operations</li>
