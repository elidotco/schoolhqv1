"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { useAuth } from "@/app/providers/authProvider";

export function AuthButton() {
  const { user, profile, isLoading } = useAuth();
  const profileData = profile;

  return isLoading ? (
    <Button disabled>Loading...</Button>
  ) : user ? (
    <div className="flex items-center gap-4">
      <span>Welcome, {profileData?.first_name || user.email}!</span>
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
