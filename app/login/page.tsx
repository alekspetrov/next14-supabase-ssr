import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log("Page error: " + error.message);
    }

    console.log(await supabase.auth.getSession());
  };

  const getAllProjects = async () => {
    "use server";

    const supabase = createClient();

    const { data, error } = await supabase.from("projects").select("*");
    if (error) console.log("Error: " + error.message);
    console.log("Projects: ", data);
  };

  return (
    <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signIn}
      >
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In with Google
        </button>
      </form>
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={getAllProjects}
      >
        <button className="bg-blue-700 rounded-md px-4 py-2 text-foreground mb-2">
          Get Projects
        </button>
      </form>
    </div>
  );
}
