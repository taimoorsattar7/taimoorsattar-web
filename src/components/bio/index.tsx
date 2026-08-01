import * as React from "react"
import { FunctionComponent } from "react"
import Image from "next/image"
import {
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@components/socialicons/SocialIcons"

const Bio: FunctionComponent = () => {
  return (
    <div className="py-8 sm:py-12 max-w-2xl">
      {/* Spotlight Avatar Photo */}
      <div className="mb-6">
        <Image
          src="/profile-pic.jpg"
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border border-zinc-200 dark:border-zinc-700/80 shadow-md"
          alt="Taimoor Sattar"
          width={80}
          height={80}
          unoptimized
        />
      </div>

      {/* Main Title */}
      <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl leading-tight">
        Software developer, course author, and full-stack engineer.
      </h1>

      {/* Description */}
      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed">
        I'm Taimoor Sattar, a software engineer and author. I build web applications and write about React, TypeScript, Next.js, and modern full-stack development.
      </p>

      {/* Social Links Row */}
      <div className="mt-6 flex items-center gap-6">
        <a
          href="https://twitter.com/taimoorsattar7"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          aria-label="Follow on Twitter"
        >
          <TwitterIcon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-teal-500" />
        </a>

        <a
          href="https://github.com/taimoorsattar7"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          aria-label="Follow on GitHub"
        >
          <GitHubIcon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-teal-500" />
        </a>

        <a
          href="https://www.linkedin.com/in/taimoorsattar/"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
          aria-label="Follow on LinkedIn"
        >
          <LinkedInIcon className="h-5 w-5 fill-zinc-500 transition group-hover:fill-teal-500" />
        </a>
      </div>
    </div>
  )
}

export default Bio
