import { createClient } from "@/lib/supabase/server";
import {
  Banknote,
  CogIcon,
  LayoutDashboard,
  LogOutIcon,
  ScrollTextIcon,
  Users2,
} from "lucide-react";
import { NavLink } from "./NavLink";
import { Button } from "./button";
import { LogoutButton } from "../logout-button";

async function SideBar() {
  const supabase = await createClient();

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
    // TODO: Add sidebar content here

    <aside className=" bg-muted/40 hidden md:block">
      <div className="flex h-full relative flex-col  gap-2">
        <div className="font-semibold px-10 flex items-start relative flex-col w-full h-20 py-4 ">
          {/* Logo or Title */}
          <h2 className="text-2xl font-bold">SchoolHQ</h2>
          <p className="text-muted-foreground">
            {school?.name || "Your School Name"}
          </p>
        </div>
        <nav className="grid gap-1 text-sm px-5   font-medium mt-4">
          {/* Your Sidebar Links */}
          <ul className="flex flex-col gap-2 h-fit ">
            <li>
              <NavLink href="/dashboard">
                <LayoutDashboard /> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard/students">
                <Users2 /> Students
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard/fees">
                <Banknote /> Fees
              </NavLink>
            </li>
            <li>
              <NavLink href="/payments">
                <ScrollTextIcon /> Payments
              </NavLink>
            </li>
            <li>
              <NavLink href="/dashboard/settings">
                <CogIcon /> Settings
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* new entry button and logout */}
        <div className="px-5 absolute bottom-0 mb-10  flex flex-col gap-4 w-full">
          <Button className="py-5 w-full">New Entry</Button>
          <div className="flex items-center text-muted-foreground gap-4">
            <div className="rounded-full p-2  border-2 text-muted-foreground bg-muted">
              {profile?.first_name?.[0]}
              {profile?.last_name?.[0]}
            </div>
            <p className="text-sm text-primary">
              {profile?.first_name} {profile?.last_name}
            </p>
            <LogoutButton>
              <LogOutIcon size={24} />
            </LogoutButton>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
