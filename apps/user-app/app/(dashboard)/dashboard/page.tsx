
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../lib/auth" // your NextAuth config
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  // 🚫 Not logged in → redirect to login
  if (!session) {
    redirect("/signin")
  }

  // ✅ Logged in → render page
  return (
    <div>
      <h1>Welcome to Dashboard 🎉</h1>
      <p>User ID: {session.user?.id}</p>
    </div>
  )
}
