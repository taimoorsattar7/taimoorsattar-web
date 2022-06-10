---
title: What is JAMStack?
description: JAMstack is the modern way to application development in which the front-end is decoupled from the backend (web server).
date: 2020-12-27T19:21:48.644Z
tags:
  - jamstack
featuredpost: false
featuredimage: ./jamstack.jpg
---

Let's break down the word `JAMstack` as **JAM**, **stack**. JAM means Javascript, API, and markup. The Jamstack is a modern way of developing applications where the front-end is decoupled from the back-end (web server). We use APIs to communicate (retrieve/post the data) between the frontend and the backend. The API allows communication between the web app and the server by sending the HTTP request to the appropriate routes.

To build the web application, there are different stacks (routes). For example, If you want to visit a nearby museum, you can choose different routes to arrive at the same destination. The same is the concept of a stack.

The other most common stack for application development are:

- LAMP (Linux, Apache, MySQL, PHP) - WordPress Architecture
- MEAN (MongoDB, ExpressJS, AngularJS, NodeJS)
- JAMstack (Javascript, API, and markup)

A key feature of JAMstack is its microservice architecture. For **microservice architecture**, different services are glued together to build the website application. For example, the website application consists of a front-end code, an admin panel, a database, an email handler, etc. and each of these components is deployed on a separate server. These components are referred to as microservices. Different microservices communicate together to handle the user request at different stages.

The Tradition way of writing websites e.g LAMP etc is defining the complete logic inside of a single isolated monolithic block.

In monolithic, each of the services e.g. front-end, back-end, or CMS are bound to a single system. If the system is down, every service will be down. The drawback of monolithic is as follows:

- The website has slow performance due to the large size of the application. Every service is smushed into a single system.
- Difficult to find bugs in a single monolithic block

In the monolithic Infrastructure, the website application which includes front-end code, admin panel, database, email handler, etc sits on the **same server** (has same RAM and CPU). If at some point, database request increases due to traffic load due to which we increase the server CPU and RAM... But this action will not only increase the database capacity but it will impact on front-end code, admin panel, email handler, etc server. A common example of monolithic infrastructure is WordPress themes where we write HTML, and CSS code inside of PHP files.

We can develop a JAMstack website by focusing on certain aspects as listed in the following table:

| Sections              | Description                                                                                                                                      |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| Static Site Generator | A static generator generates the raw HTML webpage (front-end) based on the template/markdown or data.                                            |
| Headless CMS          | Headless CMS is a backend content management system, decoupled from the backend. We can use API to query the backend content into the front-end. |

Examples of static site generators are Gatsbyjs, Nextjs. Each of these frameworks is built on Reactjs and uses a bundling tool, such as webpack/Rust, to compile the code into a Raw HTML website. You can find the list of static site generators for JAMstack on [staticgen.com](https://www.staticgen.com).

Examples of headless cms arer Netlify CMS, Sanity, etc. You can find the list of static site generators [here](https://jamstack.org/headless-cms).

If you're interested in building a JAMstack website, you can take the course about building a website with GatsbyJS, Sanity, and Stripe [here](https://taimoorsattar.dev/p/build-standout-website).
