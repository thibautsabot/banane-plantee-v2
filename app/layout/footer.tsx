import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-candiceBrown text-white items-center flex justify-around">
      <div className="flex py-8">
        <a
          className="bg-white p-1 rounded-full"
          href="https://www.instagram.com/bananeplantee/"
        >
          <Image
            src="/social/instagram.svg"
            width={30}
            height={30}
            alt="instagram"
          />
        </a>
        <a
          className="bg-white p-1 rounded-full ml-2"
          href="https://www.pinterest.fr/bananeplantee/"
        >
          <Image
            src="/social/pinterest.svg"
            width={30}
            height={30}
            alt="pinterest"
          />
        </a>
      </div>
    </footer>
  );
}
