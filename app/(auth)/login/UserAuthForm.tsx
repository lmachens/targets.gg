"use client";

import { signIn } from "next-auth/react";

export default function UserAuthForm() {
  return <button onClick={() => signIn("github")}>Sign in</button>;
}
