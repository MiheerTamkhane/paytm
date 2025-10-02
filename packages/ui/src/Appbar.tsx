import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
  name: string;
  redirect: any;
}

export const Appbar = ({ user, onSignin, onSignout, name, redirect }: AppbarProps) => {
  return (
    <div className="flex justify-between p-4 border-b border-slate-300">
      <div className="flex flex-col justify-center text-lg" onClick={redirect}>PayTM</div>
      <div className="flex items-center justify-center gap-4 pt-2">
        <p>{name}</p>
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
