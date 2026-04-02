import { ThemeSwitcher } from "@/components/theme-switcher";
import NavBar from "@/components/ui/NavBar";
import SideBar from "@/components/ui/SideBar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={<div className="h-20 w-full bg-muted/20 animate-pulse" />}
    >
      <main className="min-h-screen grid grid-cols-1 md:grid-cols-[280px_1fr]">
        {/* Sidebar Area */}
        <SideBar />

        {/* Main Content Area */}
        <div className="flex flex-col h-screen overflow-hidden">
          <NavBar />

          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col gap-10 w-full bg-muted/60 min-h-screen p-5 md:p-10 mx-auto">
              {children}
            </div>

            <footer className="w-full flex items-center justify-center border-t text-center text-xs gap-8 py-10 mt-auto">
              <p>
                Powered by <span className="font-bold">Supabase</span>
              </p>
              <ThemeSwitcher />
            </footer>
          </div>
        </div>
      </main>
    </Suspense>
  );
}
