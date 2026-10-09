# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Deploy with Dokploy

Create a Docker application in Dokploy using this repository and set the application port to `3001`. The included `Dockerfile` builds the Vite app and serves it with Nginx; no separate start command is required.

To build and run the container locally:

```sh
docker build -t imroz-dashboard .
docker run --rm -p 3001:3001 imroz-dashboard
```

Open `http://localhost:3001` to access the app.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
