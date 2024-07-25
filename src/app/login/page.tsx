import { getServerAuthSession } from "~/server/auth";
import { SignInButton } from "./_components/signInButton";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div className="ml-[15%] flex h-screen flex-col items-start justify-center gap-8">
      <p className="font-montserrat text-5xl font-[500]">Login</p>
      <SignInButton />
      <h1 className="text-4xl font-semibold">
        Olá{" "}
        <span className="text-struct-2 font-bold">{session?.user?.email}</span>,
        o que deseja fazer?
      </h1>
    </div>
  );
}
