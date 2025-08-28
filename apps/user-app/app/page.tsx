import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Welcome to the User App</h1>
        <Button className="bg-blue-500 text-white" appName='paytm-app'>Get Started</Button>
      </main>
    </div>
  );
}
