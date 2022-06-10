---
title: create-react-app, Gatsby or Next JS
description: React is the most popular JavaScript library for building the user
  interface. In React, we create reusable UI components and render these
  components based on the logic operation.
date: 2021-04-29T02:35:14.219Z
tags:
  - react
  - Gatsby
  - nextjs
  - frameworks
featuredpost: false
featuredimage: react-frmeworks.jpg
---

React is the most popular JavaScript library for building the user interface. In React, we create reusable UI components and render these components based on the logic. You can read [this article](https://taimoorsattar.dev/blogs/why-need-for-react-js) to understand why we need to use React in the project.

React language is not understood by the browser. To execute the React code, we need to compile it to the browser's native language e.g. HTML, CSS, and JavaScript.

create-react-app, Gatsby, and Next JS are the frameworks that are built on React. But each of these frameworks has a different infrastructure.

- **create-react-app**: Single-Page-Application
- **Gatsby**: Static site Generator
- **Next JS**: Static and server-side render

## create-react-app

Create-react-app is SPA (Single Page Application) that serves/hosts only a single file. In a single file, we can render different React components while navigating to different routes (URL). In SPA, most of the resources (HTML, CSS, and Javascript) when the application is initially loaded. Content is dynamically changed in SPA, hence [create-react-app is not good for SEO](https://taimoorsattar.dev/blogs/is-create-react-app-good-for-seo).

So, In what type of project **create-react-app** framework is useful? create-react-app is not recommended for creating SEO content websites. We can use create-react-app to build one-page applications/software like online photo editor/video editor.

## Gatsby

Gatsby is a front-end framework used to build both static and dynamic sites. The rendering option supported in Gatsby is as below:

- Static Site Generation (SSG)
- Deferred Static Generation (DSG)
- Server-Side Rendering (SSR)

The above-mentioned rendering methods are supported in Gatsby version 4 and later versions.

Gatsby has a marketplace that has thousands of plugins to use in your project. The static site generator prerenders the content of the pages during the built time that’s why it has a good website performance and is good for SEO.

In Gatsby, we write serverless function for API route without writing the server-side logic. This (serverless function) is also supported in Next.js. We can send the HTTP request to the API route and get the response data back.

If you're interested to learn Gatsby js, you can checkout [this course](https://taimoorsattar.dev/p/build-standout-website).

## Next JS

Next.js gives you the power to render both static & server-side content, same as Gatsby. next.js supports its own API routes and we can render server-side functions by default.

## Which framework to prefer?

In short, we have to first decide what is my website for. If we have just a simple one-page website (e.g. portfolio website), then you might not need any framework. But... If we have a large-scale website then we can use the framework to make our life easier. Here is my gentle opinion about the framework:

- Create-React-App is SPA (Single Page application) which means we have to do extra work to prefetch the page if we want SEO benefits.

- There is a hard choice in the framework between Gatsby and Next.js. The good part of Gatsby is that it has a good marketplace for plugins and provides a GraphQL layer by default for built time data fetching. Also, the good part of Next.js it has faster builds and fast Refresh with Rust compiler.
