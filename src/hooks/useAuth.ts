import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: session, error } = await authClient.getSession();
        if (!session) {
          router.push("/auth");
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/auth");
      }
    }
    
    checkAuth();
  }, [router]);

  const signOut = async () => {
    try {
      await authClient.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  return { loading, signOut };
}
