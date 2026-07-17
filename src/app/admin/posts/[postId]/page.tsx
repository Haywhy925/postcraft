import EditPostForm from "@/components/admin/EditPostForm";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ postId: string }>;
}

async function EditPostPage({ params }: Props) {
  const { postId } = await params;

  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="md:ml-64 p-6 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-text">Edit Post</h2>
        <p className="text-sm text-gray-400 mt-1">Update your blog post.</p>
      </div>
      <EditPostForm post={post} />
    </main>
  );
}

export default EditPostPage;
