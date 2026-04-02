import { GraduationCapIcon } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export async function NavBar() {
  const supabase = await createClient();

  // 1. Get the session
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;
  const [schoolResponse, profileResponse] = await Promise.all([
    supabase
      .from("schools")
      .select("name") // Only select the columns you actually use!
      .eq("id", user?.user_metadata.school_id)
      .single(),
    supabase
      .from("profiles")
      .select("first_name, last_name") // Only select the columns you use!
      .eq("id", user.id)
      .single(),
  ]);

  //   get the current route to determine if we are on the dashboard or not

  const school = schoolResponse.data;
  const profile = profileResponse.data;

  return (
    <nav className="w-full flex justify-center h-20 px-10">
      <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
        <div className="">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        {/* School name and admin name  */}
        <div className="flex items-center gap-10">
          {/* School Name  */}
          <div className="font-semibold text-lg pr-10 text-muted-foreground">
            <GraduationCapIcon className="inline-block mr-2" size={20} />
            {school?.name || "Your School Name"}
          </div>
          {/* Admin Name  */}
          <div className="flex items-center gap-4">
            <div className=" flex  pl-16 border-l flex-col items-end">
              <h3 className="text-lg font-semibold">
                {profile?.first_name} {profile?.last_name}
              </h3>
              <p className="text-muted-foreground">School admin</p>
            </div>
            <div className="rounded-full p-4  border-2 text-muted-foreground bg-muted">
              {profile?.first_name?.[0]}
              {profile?.last_name?.[0]}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
