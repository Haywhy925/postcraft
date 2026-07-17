"use client";

import usePosts, { Post } from "@/custom-hooks/usePost";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

const supabase = createClient();

function PostPage() {
  const { posts, loading, setPosts } = usePosts();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(post: Post) {
    const confirmDelete = confirm("Delete this post?");
    if (!confirmDelete) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id !== post.author_id) {
      toast.error("You cannot delete other authors posts");
      return;
    }

    setDeleting(true);

    try {
      //Deleting the image from Bucket
      const previousImagePath = post.cover_image.split("/cover_images/")[1];

      if (previousImagePath) {
        await supabase.storage.from("cover_images").remove([previousImagePath]);
      }

      //Deleting the post
      const { error } = await supabase.from("posts").delete().eq("id", post.id);

      if (error) {
        throw new Error(error.message);
      }
      toast.success("Post deleted Successfully");
      setPosts((prev) => prev.filter((item) => item.id !== post.id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <main className="md:ml-64 p-6 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-text">Posts</h2>
          <p>Manage all your blog posts</p>
        </div>
        <Link
          href="/admin/create-post"
          className="px-4 py-2 bg-primary
         text-white text-sm rounded-lg hover:opacity-90 transition"
        >
          + Add Post
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl">
        <div className="overflow-x-scroll no-scrollbar">
          <table className="min-w-150 w-full text-sm">
            <thead className="bg-surface text-gray-400">
              <tr>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Category</th>
                <th className="text-left px-4 py-3">Image</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    Loading Posts...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    No Posts Found!
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-t border-border hover:bg-surface transistion"
                  >
                    <td className="px-4 py-6 text-text whitespace-nowrap">
                      {post.title}
                    </td>
                    <td className="px-4 py-6 text-text whitespace-nowrap">
                      {post.category}
                    </td>
                    <td className="px-4 py-6">
                      <Image
                        unoptimized
                        src={`/${post.cover_image}`}
                        alt="post-image"
                        width={56}
                        height={56}
                        className="w-14 h-14 rounded-lg object-cover border border-border min-w-14"
                      />
                    </td>
                    <td className="px-4 py-6 text-text whitespace-nowrap">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          post.status === "published"
                            ? "bg-green-500/10 text-green-400 "
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-text whitespace-nowrap">
                      <div className="flex items-center justify-start gap-3 whitespace-nowrap">
                        <Link
                          className="text-primary hover:underline text-sm"
                          href={`/admin/posts/${post.id}`}
                        >
                          Edit
                        </Link>
                        <button
                          disabled={deleting}
                          onClick={() => handleDelete(post)}
                          className="text-red-400 hover:text-red-300 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default PostPage;
