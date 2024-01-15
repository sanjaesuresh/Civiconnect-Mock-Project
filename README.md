# Nextjs Template v13.4.4
Nextjs application template for Civiconnect projects

# Pre-Install
Please ensure you have the latest LTS Nodejs version installed to effectively use this repository.
### [Nodejs LTS](https://nodejs.org/en)

# 🚀 Getting started with the Nextjs Template
1. Pull this template repository to your local machine
2. Rename `.env.local.example` to `.env.local` located in the `nextjs` folder
3. Navigate to your VSCODE terminal and run the following commands one step at a time
 ``` 
 cd nextjs
 npm install
 npm run build 
 npm run dev
 ```
## Installed Dependencies/plugins
- FontAwesome Icons
- Axios
- TailwindCSS
- Styled JSX

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Extra Nextjs Information

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

# Environment Variables

To run this project, you'll need to get access to the environment variables.  We use [infisical](https://infisical.com) to securely store and share environment variables.

To get started using environment variables from infisical, follow the steps below:

1. Create an account on [civiconnect's infisical portal](https://infisical.civiconnect.net/) if you don't already have one.
2. Get access to the project, or create a new one if it hasn't already been created by someone else.  all of your environment variables should be stored in a subfolder in the project named `nextjs`
3. Install the infisical CLI: [https://infisical.com/docs/cli/overview](https://infisical.com/docs/cli/overview)
4. From the terminal, run `infisical login` and login with your infisical credentials.
5. If a `.infisical.json` file doesn't already exist in your project, run `infisical init` and select your project.
6. Finally, check that it's all been set up properly by starting your project with `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
