import Image from "next/image";
import Link from "next/link";
import Search from "./search";

const itemStyle = "px-3 py-2";

export default function Header() {
  return (
    <nav
      role="navigation"
      aria-label="main-navigation"
      className="mb-8 bg-candiceBrown text-white flex items-center justify-center"
    >
      <div className={itemStyle}>
        <Link href="/" title="Logo">
          <Image width={150} height={50} src="/header-outline.png" alt="Logo" />
        </Link>
      </div>
      <div>
        <div className="navbar-start has-text-centered">
          <Link className={itemStyle} href="/tags/apero">
            Apéritifs
          </Link>
          <Link className={itemStyle} href="/tags/entree">
            Entrées
          </Link>
          <Link className={itemStyle} href="/tags/vegetarien">
            Plats végétariens
          </Link>
          <Link className={itemStyle} href="/tags/plats">
            Plats
          </Link>
          <Link className={itemStyle} href="/tags/dessert">
            Desserts
          </Link>
          <Link className={itemStyle} href="/tags/petitdej">
            Petits déjeuners
          </Link>
          <Link className={itemStyle} href="/tags/boissons">
            Boissons
          </Link>
          <Link className={itemStyle} href="/tags/autres">
            Autres
          </Link>
          <Link className={itemStyle} href="/tags/antigaspi">
            Anti-gaspi
          </Link>
          <Link className={itemStyle} href="/presentation">
            Présentation
          </Link>
          <Search />
        </div>
      </div>
    </nav>
  );
}
