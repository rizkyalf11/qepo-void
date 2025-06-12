import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { supabase } from "~/lib/supabase/client";

export default function Home() {
  const { setTheme } = useTheme();

  const handleLogOut = async() => {
    await supabase.auth.signOut();
    alert("logout")
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-y-8">
        <h1 className="text-primary text-3xl">Hello Wolrd</h1>
        <Button>Click Me!</Button>
        <Button onClick={() => setTheme("dark")} size="icon">
          <Moon />
        </Button>
        <Button onClick={() => setTheme("light")} size="icon">
          <Sun />
        </Button>
        <Button variant="destructive" onClick={handleLogOut}>
          Logout
        </Button>
      </main>
    </>
  );
}
