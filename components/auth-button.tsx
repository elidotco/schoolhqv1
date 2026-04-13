"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { useAuth } from "@/app/providers/authProvider";

export function AuthButton() {
  const { user, isLoading } = useAuth();
  console.log("AuthButton Rendered with user:", user, "isLoading:", isLoading);

  return isLoading ? (
    <Button disabled>Loading...</Button>
  ) : user ? (
    <div className="flex items-center gap-4">
      <span>Welcome, {user.user_metadata.first_name}!</span>
      <LogoutButton />
    </div>
  ) : (
    <div className="flex gap-3">
      <Link href="/auth/login">
        <Button>Login </Button>
      </Link>
      <Link href="/auth/sign-up">
        <Button>Sign Up</Button>
      </Link>
    </div>
  );
}
