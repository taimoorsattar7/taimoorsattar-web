---
title: Bun is the best alternative to npm
description: Bun is the best alternative to NPM package manager and it is up to 25x faster.
date: 2024-01-22T06:03:37.094Z
tags:
  - bun
  - build time
featuredimage: bun-package-manager-bg.jpg
---

Bun is the best alternative to the NPM package manager and it is up to 25x faster. I've been using NPM for a long time but it takes more than a minute to install the packages, so I gave Bun a try and was amazed by the results.

In order to use Bun in our project, we first need to install the package by executing the below command in the terminal.

```
npm install -g bun
```

To compare the results, we need to figure out how much time traditional **NPM** takes to install the packages. For that, we can execute the below command in the terminal and add a `time` prefix as below.

```
time npm install
```

Switching from NPM to Bun is straightforward. You need to execute the below command in the terminal.

```
time bun install
```

By executing the above command, it will create the `bun.lockb` file at the root.

> You can remove the `time` prefix from the command if you don't want to calculate the total time in the CLI.

I used to deploy the website on Netlify, so I need to delete the below file from the root.

- `package-lock.json`
- `yarn.lock`
- `pnpm-lock.yaml`

Netlify detects the `bun.lockb` file at the root of the project and uses `bun install` to install the packages.

You can learn more about Bun package manager [here](https://bun.sh/package-manager).