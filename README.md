<h1 align="center">
  <a href="#"> Bingo Generator </a>
</h1>

<h3 align="center">Make boring events more fun!</h3>

<p align="center">

  <a href="https://github.com/tuszmak/bingo-generator-backend">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/tuszmak/bingo-generator-backend">
  </a>

  <a href="https://github.com/tuszmak/">
    <img alt="made by Dániel Pintér" src="https://img.shields.io/badge/made%20by-Dániel%20Pintér-blue">
  </a>
</p>

<h4 align="center"> 
	 Status: Finished, in maintanence mode
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#features">Features</a> •
 <a href="#how-it-works">How it works</a> • 
 <a href="#tech-stack">Tech Stack</a> •  
 <a href="#What-I-learned-with-this-project">Author</a> • 
 <a href="#user-content-license">Takeaway</a>
</p>

## About

Are you aware of the "This event wasn't in my \<current year> bingo card" meme? Were you watching a showcase event, where you expected certain announcements? Me too! That's why I made this site to play with these expectations.

---

## Features

- [x] Users are able to create and share their own packs.
- [x] These packs are:
  - [x] Likeable
  - [x] All random
  - [x] Variable sized

---

## How it works

The project is divided into two parts:

1. Backend (this repo)
2. [Frontend] (https://github.com/tuszmak/bingo-generator)

This repository is referring only to the Frontend part. For the backend, please visit the backend repo.

### Pre-requisites

If you are planning on local hosting, you will need to have the following tools installed on your machine:

- Git
- pnpm v10 (or other package manager)
- Node v22
- Ngrok (or other tunneler)

#### Running the web application (Backend)

```bash

# Clone this repository
$ git clone git@github.com:tuszmak/bingo-generator-backend.git

# Access the project folder in your terminal
$ cd bingo-generator-backend

# Install the dependencies
$ pnpm i

# Create a .env file based on the template

# Run the application in development mode
$ pnpm dev

# The application will open on the port: 3000 - go to http://localhost:3000

```

## Tech Stack

The following tools were used in the construction of the project:

#### **Platform** ([React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/))

- **[Hono](https://hono.dev/)**
- **[Kysely](https://kysely.dev/)**
- **[node-postgres](https://github.com/brianc/node-postgres)**
- **[Zod](https://zod.dev/)**
- **[Clerk](https://clerk.com/)**
- **[Svix](https://www.svix.com/)**
- **[dotenv-flow](https://www.npmjs.com/package/dotenv-flow)**

> See the file [package.json](https://github.com/tuszmak/bingo-generator-backend/blob/master/package.json)

## Author

<a href="https://www.linkedin.com/in/pinter-daniel/">
 <p><b>Dániel Pintér</b></p></a>

## What I learned with this project

Everything in this backend stack is new to me, except the database. <br> <br>
I chose **Hono**, because I wanted a fast, lightweight Express.js backend, that is easily deployable. My choice ended up being the best one in this project. I love this library, and will definitely use it.
<br>
<br>
**Kysely** was my choice of an SQL builder. I explicitly didn't wanted an ORM, so I wanted to practice my SQL query building, while getting access to Intellisense. During my future projects, I will most likely refrain from Kysely. It was a fun experience, but will not remain in my usual stack.
<br>
<br>
I already played with **Clerk** in other projects, but I ended up giving up on it. This was the first time I used it, and it was both easy and hard. The frontend part of Clerk is super cool, but syncing it to a backend is quite complicated. That's the reason **Svix** is in this project, and **Ngrok** is needed for local deployment.
<br><br>
In parallel to this project, I am cruising through a Typescript course called [Total Typescript](https://www.totaltypescript.com/), which included a **Zod** course. I ended up liking it a fair bit, and wanted to use it here. It's fun.
