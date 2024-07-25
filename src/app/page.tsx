"use client"

import MainLayout from "@/components/Layout/MainLayout";
import { useAuth } from "@/utils/context/AuthContext";
import withAuth from "@/utils/HOC/withAuth";

function Home() {
  const currentUser = useAuth()

  console.log('currentUser', currentUser)

  return (
    <main className="min-h-screen ">
        <MainLayout />
    </main>
  );
}

export default withAuth(Home);