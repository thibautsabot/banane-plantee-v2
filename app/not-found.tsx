import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="p-6 flex items-center flex-col min-h-[500px]">
      <h1 className="text-center">
        Désolé, il n&apos;y a pas de banane sur cette page
      </h1>
      <Image
        className="my-12"
        height={150}
        width={116}
        src="/round-logo.png"
        alt="logo banane plantee"
      />
      <p>
        <Link className="text-sky-500 underline" href="/">
          Retourner a la page d&apos;acceuil
        </Link>
      </p>
    </div>
  );
}
