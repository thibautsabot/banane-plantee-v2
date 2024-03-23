import Image from "next/image";
import Link from "next/link";
import Nav from "./nav";
import Search from "./search";

export default function Header() {
  return (
    <nav
      role="navigation"
      aria-label="main-navigation"
      className="mb-8 bg-candiceBrown text-white flex items-center justify-center min-h-16"
    >
      <div className="px-3 py-2§">
        <Link href="/" title="Logo">
          <Image width={150} height={50} src="/header-outline.png" alt="Logo" />
        </Link>
      </div>
      <div className="flex flex-col">
        <Nav />
      </div>
      <Search />
    </nav>
  );
}
