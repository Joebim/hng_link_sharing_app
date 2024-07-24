import MainLayout from "@/components/Layout/MainLayout";
import { AuthProvider } from "@/utils/context/AuthContext";

export default function Home() {


  return (
    <main className="min-h-screen ">
      <AuthProvider>
        <MainLayout />
      </AuthProvider>

    </main>
  );
}
