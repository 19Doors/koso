"use client";
import { useAuth } from "@/hooks/useAuth";
import { MessageBlock } from "@/components/MessageBlock";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Home() {
  const { loading, signOut } = useAuth();

  return (
    <div className="w-full h-screen relative">
      <LoadingOverlay loading={loading} />
      
      <main className="relative w-full h-full z-10">
        <MessageBlock />
      </main>
    </div>
  );
}
