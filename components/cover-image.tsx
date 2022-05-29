import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      width={300}
      height={200}
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-sm", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
