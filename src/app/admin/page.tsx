import DashboardStats from "@/components/admin/DashboardStats";
import RecentPosts from "@/components/admin/RecentPosts";

function DashboardPage() {
  return (
    <main className="p-4 md:ml-64 sm:p-6 min-h-screen">
      <div className="mb-6 sm:mb-8 flex flex-col space-y-1.5">
        <h2 className="text-xl sm:text-2xl font-semibold text-text">
          Dashboard
        </h2>
        <p>Welcome back. Here is what is happening with your blog</p>
      </div>

      {/*stats*/}

      <DashboardStats />
      {/*Recent Posts*/}

      <RecentPosts />
    </main>
  );
}

export default DashboardPage;
