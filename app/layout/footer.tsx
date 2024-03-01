import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-candiceBrown text-white items-center flex justify-around">
      <p className="py-8">Contact</p>
      <div className="flex">
        <Image
          src="/social/instagram.svg"
          width={30}
          height={30}
          className="bg-white p-1 rounded-full"
          alt="instagram"
        />
        <Image
          src="/social/pinterest.svg"
          width={30}
          height={30}
          alt="pinterest"
          className="bg-white p-1 rounded-full ml-2"
        />
      </div>
    </footer>
  );
}
