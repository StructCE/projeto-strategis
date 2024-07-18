import { SignInButton } from "./api/_components/signInButton";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <p className="text-4xl">STRATEGIS</p>
      <SignInButton />
    </div>
  );
}
