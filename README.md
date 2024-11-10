# DealFinder

DealFinder is a web application that simplifies complex Terms and Conditions, making them easy for users to understand. The app summarizes, analyzes, and assesses the trustworthiness of deals, promotions, and subscriptions, helping users make informed decisions before committing to agreements.

This project is built with [Next.js](https://nextjs.org) and includes authentication, an interactive Terms and Conditions analyzer, and user-friendly navigation.

---

## Table of Contents
- [Features](#features)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Learn More](#learn-more)
- [Deployment](#deployment)

---

## Features

- **Summarize**: Provides a simplified summary of Terms and Conditions.
- **Analyze**: Highlights potential risks, hidden fees, and data-sharing practices.
- **Trust Assessment**: Assesses the overall trustworthiness of the terms, indicating whether they’re "good to go" or "bad to proceed."
- **Authentication**: Secure login and registration system using Firebase.
- **User-Friendly Interface**: Intuitive navigation with a responsive layout.

---

## Screenshots

![Homepage](path-to-homepage-screenshot)
![Terms Analysis](path-to-terms-analysis-screenshot)
![Trust Assessment](path-to-trust-assessment-screenshot)

---

## Getting Started

To get a local copy up and running, follow these steps.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://npmjs.com) installed.

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/dealfinder.git
    cd dealfinder
    ```

2. Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

3. Create a `.env.local` file in the root of your project and add the required environment variables (see below for details).

4. Start the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Environment Variables

Add the following environment variables in your `.env.local` file:

```plaintext
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id

# Google Generative AI API (Gemini API)
GEMINI_API_KEY=your_gemini_api_key
```

---

## API Documentation

### Endpoints

- **Summarize Terms**: `/api/gemini` with a `POST` request. Type: `summarize`
- **Analyze Terms**: `/api/gemini` with a `POST` request. Type: `analyze`
- **Trust Assessment**: `/api/gemini` with a `POST` request. Type: `trust`

### Request Format

- **Endpoint**: `/api/gemini`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "input": "Your terms and conditions text here",
    "type": "summarize" | "analyze" | "trust"
  }
  ```

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - detailed documentation on Next.js features.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - interactive tutorial for Next.js.
- [Firebase Documentation](https://firebase.google.com/docs) - comprehensive guide for Firebase services.
- [Google Generative AI API](https://developers.google.com/generative-ai) - information about the Google Generative AI API (Gemini API).

---

## Deployment

The easiest way to deploy DealFinder is to use [Vercel](https://vercel.com/), the platform created by the team behind Next.js.

1. Push your project to a GitHub or GitLab repository.
2. Link your repository to Vercel.
3. Add the environment variables to your Vercel project settings.
4. Deploy!

For more details, check out the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

---

## Contributing

If you’d like to contribute to DealFinder, please fork the repository and create a pull request. Your contributions are greatly appreciated!

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.
