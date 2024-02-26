## Usage

- npm run dev

or

- npm run build
- npm run start

## How it works

The editor mode allows you to create and edit blog posts as much as you want.

Publishing a post will add an entry in the `Post` table.
You can add a title, slug, a tag and a thumbnail to your post (the date is automatically added).

When you create new images and publish the post, a new git commit will be created to push the images.
It allows us to not worry about the image and its size as it won't be stored in the DB or passed in the requests.

We replace the base64 source by the path to the `public` folder (it works since it has been pushed to the filesystem).

On the viewer side, `img` tags are replaced by the `<Image>` component.

## Why?

Total revamp of the [previous iteration](https://github.com/thibautsabot/banane-plantee) that was powered by Gatsby and Netlify.

The Netlify CMS was nice but a bit buggy and it was hard to customize.

Gatsby was painful to maintain and the build times were getting crazy.

Finally, while Markdown is super easy to handle, the capabilites are limited (it was the [original idea](https://github.com/thibautsabot/banane-plantee-v2/tree/save-oldv2))

---

This new version uses NextJS (with app router) and was started from scratch.

Blog content are stored inside a [Postgres DB](https://postgresql.org/) and we query it through [Prisma](https://prisma.io/).
The editor mode features a self-hosted [TinyMCE](https://tiny.cloud/) editor and exports `HTML`.

You can enable a lot of [plugins](https://tiny.cloud/docs/tinymce/latest/plugins/) and create your own.

A custom image handler was added to benefit from [`next/image`](https://nextjs.org/docs/pages/building-your-application/optimizing/images).

## TODO :

- Editor auth wall
- List blog posts
- Create slugs
- Import old posts
- Create styles
