import Container from "../components/container";
import Head from "next/head";
import Layout from "../components/layout";
import Post from "../types/post";
import PostPreview from "../components/post-preview";
import { getAllPosts } from "../lib/api";

type Props = {
  allPosts: Post[];
};

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example</title>
        </Head>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
            {allPosts.map((post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                slug={post.slug}
                description={post.description}
              />
            ))}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "coverImage",
    "description",
  ]);

  return {
    props: { allPosts },
  };
};
