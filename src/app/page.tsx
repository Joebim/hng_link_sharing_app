"use client"

import MainLayout from "@/components/Layout/MainLayout";
import withAuth from "@/utils/HOC/withAuth";

function Home() {

  return (
    <main className="min-h-screen ">
        <MainLayout />
    </main>
  );
}

export default withAuth(Home);