"use client";
import {  signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
    <Appbar
      redirect={() => {
        router.push("/");
      }}
      onSignin={() => {
        router.push("/signin");
      }}
      onSignout={async () => {
        await signOut();
        router.push("/signin");
      }}
      user={session.data?.user}
    />
  );
}
