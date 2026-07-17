"use client";

import usePosts from "@/custom-hooks/usePost";
import Link from "next/link";

function RecentPosts() {
  const { loading, posts } = usePosts(3);

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-text">
          Recent Posts
        </h2>
        <Link
          href="/admin/posts"
          className="text-primary text-sm hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {loading ? (
          <p className="text-sm text-gray-400"> Loading Posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-gray-400">No posts available</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="py-4 sm:py-6 flex items-center justify-between"
            >
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-text font-medium">
                  Building a Fullstack Blog with Next.js
                </p>
                <p className="text-gray-400 text-xs">
                  {post.category} . {post.mins_read} min read
                </p>
              </div>
              <span
                className={`text-xs ${post.status === "published" ? "text-green-400" : " text-gray-500 "}`}
              >
                {post.status === "published" ? "Published" : "Draft"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecentPosts;
