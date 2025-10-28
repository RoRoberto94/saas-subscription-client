# Subscribe - Full Stack SaaS Subscription App (Client)

![Demo GIF of SubScribe App](./docs/demo.gif)

## 🚀 Live Demo

**[Explore the live application here!](https://saas-subscription-client.vercel.app)**

> **💡 Demo Guide:**
>
> - **Admin Access:** `admin.demo@sub.scribe` / `Password123!`
> - **Stripe Test Card:** `4242 4242 4242 4242` (any future date & 3-digit CVC)

---

## 📋 About The Project

SubScribe is a complete Full Stack SaaS (Software as a Service) application that demonstrates a modern, robust, and scalable architecture for handling user authentication, role-based access, and subscription billing with Stripe. This project was built from the ground up to showcase advanced concepts and best practices in web development.

This repository contains the **front-end client**, built with React, TypeScript, and Vite.

➡️ **[Link to the Back-end Server Repository](https://github.com/RoRoberto94/saas-subscription-server)**

---

## ✨ Features

- **User Authentication:** Secure JWT (JSON Web Token) based registration and login flow.
- **Role-Based Access Control (RBAC):** Differentiated experience for `USER` and `ADMIN` roles, with protected admin routes.
- **Stripe Integration:** Full subscription lifecycle management, including creating subscriptions via Stripe Checkout and managing them through the Stripe Customer Portal.
- **Real-time Notifications:** WebSocket (Socket.IO) integration to provide instant feedback to users upon successful payments or subscription status changes.
- **Responsive UI:** Modern, dark-themed interface built with CSS Modules, fully responsive for both desktop and mobile devices.
- **Comprehensive Testing:**
  - **Component Tests** with Vitest & React Testing Library.
  - **End-to-End Tests** with Playwright, ensuring critical user flows work as expected.

---

## 🛠️ Tech Stack

| Category    | Technology                                                                                                                                                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Core**    | ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/-Vite-646CFF?logo=vite&logoColor=white)                                             |
| **Styling** | ![CSS Modules](https://img.shields.io/badge/-CSS%20Modules-000000?logo=css3&logoColor=white)                                                                                                                                                                                                            |
| **Routing** | ![React Router](https://img.shields.io/badge/-React%20Router-CA4245?logo=react-router&logoColor=white)                                                                                                                                                                                                  |
| **State**   | ![Zustand](https://img.shields.io/badge/-Zustand-764ABC)                                                                                                                                                                                                                                                |
| **API**     | ![Axios](https://img.shields.io/badge/-Axios-5A29E4?logo=axios&logoColor=white) ![Socket.IO](https://img.shields.io/badge/-Socket.IO-010101?logo=socket.io&logoColor=white)                                                                                                                             |
| **Testing** | ![Vitest](https://img.shields.io/badge/-Vitest-6E9F18?logo=vitest&logoColor=white) ![React Testing Library](https://img.shields.io/badge/-Testing%20Library-E33332?logo=testing-library&logoColor=white) ![Playwright](https://img.shields.io/badge/-Playwright-2EAD33?logo=playwright&logoColor=white) |

---

## ⚙️ Running Locally

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/RoRoberto94/saas-subscription-client.git
    cd saas-subscription-client
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    - Create a `.env.local` file in the root of the `client` directory.
    - Add the back-end API URL:
      ```
      VITE_API_BASE_URL=http://localhost:3001/api
      ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

> **Note:** The back-end server must be running for the application to function correctly. Please refer to the [server repository's README](https://github.com/RoRoberto94/saas-subscription-server) for setup instructions.
