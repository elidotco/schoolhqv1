import { SignUpForm } from "@/components/sign-up-form";

export default function Page() {
  return (
    <div className="flex h-screen w-full ">
      {/* image */}
      <div className="hidden h-full bg-gray-700 w-2/3 md:block">
        {/* <img
          src="/https://images.pexels.com/photos/36355110/pexels-photo-36355110.jpeg"
          alt="Sign Up"
          className="h-full w-full object-cover rounded-lg shadow-md"
        /> */}
      </div>
      {/* form */}
      <div className="w-1/3">
        <SignUpForm />
      </div>
    </div>
  );
}
