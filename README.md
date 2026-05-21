# My Blog
![App Preview](https://imgix.cosmicjs.com/9b7bd790-54e3-11f1-8825-07d30234df00-autopilot-photo-1555066931-4365d14bab8c-1779347196796.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A beautiful, modern blog built with Next.js 16 and Cosmic CMS featuring posts, authors, and categories.

## Features
- 🏠 Modern homepage with featured posts
- 📝 Individual post pages with rich content
- 👤 Author profile pages
- 🏷️ Category browsing
- 📱 Fully responsive design
- ⚡ Server-side rendering
- 🎨 Beautiful, clean UI with Tailwind CSS

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a0eaeb6f2c683f5f2b294f8&clone_repository=6a0eaf95f2c683f5f2b2952c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a blog with posts (including featured images, content, and tags), authors, and categories.
> 
> User instructions: A blog with posts, authors, and categories"

### Code Generation Prompt

> Build a Next.js application for a creative portfolio called "My Blog". The content is managed in Cosmic CMS with the following object types: authors, categories, posts. Create a beautiful, modern, responsive design with a homepage and pages for each content type.
> 
> User instructions: A blog with posts, authors, and categories

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK

## Getting Started

### Prerequisites
- Bun (or Node.js 18+)
- Cosmic account with bucket configured

### Installation
```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all posts with related data
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## Cosmic CMS Integration
This app integrates with three content types: posts, authors, and categories. All content is fetched server-side for optimal performance.

## Deployment Options
- **Vercel**: Connect your repo and add environment variables
- **Netlify**: Configure build command as `bun run build`

<!-- README_END -->