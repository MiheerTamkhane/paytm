import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-2">
      <div className="flex flex-col items-center p-10 mt-10 shadow-md">
        <h1 className="mt-10 mb-4 text-4xl font-bold">Landing Page</h1>
      </div>
    </div>
  );
}
