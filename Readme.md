# [Project Name]

The platform enables users to create detailed profiles that highlight their skills, work history, and accomplishments. By connecting professionals, the application facilitates meaningful networking opportunities, opening avenues for career growth and collaboration. Job seekers can explore employment opportunities, while recruiters can identify and evaluate potential candidates efficiently. Additionally, the platform serves as a knowledge-sharing hub, offering articles, courses, and industry insights to support continuous learning and development. The ultimate purpose is to create a dynamic and inclusive space that empowers individuals to thrive in their professional journeys.

## Tools and Libraries

- **Node.js**: (https://nodejs.org/en/download) - To provide the runtime environment and for Dependency Management.
- **npm**: (https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - For installing and managing packages for the React app.
- **Vite**: (https://vitejs.dev/guide/) - Build tool that aims to provide a faster and leaner development experience for modern web projects
- **React** with **TypeScript**: A robust framework for building user interfaces with strong type checking.
- **Material UI**: (https://mui.com/getting-started/installation/) A comprehensive suite of UI tools to create a cohesive and visually appealing design system.
- **React Router Dom**: Declarative routing for React applications, enabling navigation between different components.
- **Axios**: Promise-based HTTP client for making API requests.
- **Sass**: Powerful CSS extension language for more structured and maintainable stylesheets.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### 
This project uses Vite as its build tool for a fast and efficient development workflow. Vite provides out-of-the-box support for TypeScript, React, and many other modern web technologies, ensuring an optimized development and build process.

### CLI commands
- **npm run dev** - Runs the app in development mode by starting the Vite dev server. 
  Options:
    --port [number]: Specify a port for the dev server.
    --open: Opens the app in your default browser automatically.
- **npm run build** - Builds the app for production to the dist folder. It correctly bundles React in production mode and optimizes the build for the best performance.
- **npm run preview** - After building the app, you can use this script to locally preview the production build. This command serves the content of the dist folder on  a local web server.
- For a full list of CLI options available with Vite, you can run the following command in the project directory: **npx vite --help**


```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
