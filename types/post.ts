type Post = {
  slug: string
  code: string
  frontmatter: {
    title: string
    date: string
    coverImage: string
    description: string
    ogImage: {
      url: string
    }
  }
}

export default Post
