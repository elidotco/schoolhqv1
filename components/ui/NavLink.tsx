"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
         flex items-center gap-x-5 rounded-lg px-4 py-3  transition-colors text-lg w-full
       ${isActive ? "bg-foreground text-background" : " text-foreground hover:bg-foreground/10"}
      `}
    >
      {children}
    </Link>
  );
}
