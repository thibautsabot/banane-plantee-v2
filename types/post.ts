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
  fileContent?: string
}

export default Post
