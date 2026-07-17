import BackButton from "@/components/general/BackButton";
import ContainerLayout from "@/components/layouts/ContainerLayout";
import PostSkeleton from "@/components/loading/skeletons/PostSkeleton";
import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function PostContent({ slug }: { slug: string }) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <main className="maw-w-2xl mx-auto">
      <div className="flex">
        <BackButton />
        <span className="text-sm text-primary font-medium ml-4">
          {post.category}
        </span>
      </div>
      <h1 className="mt-3 text-3xl md:text-4xl font-bold text-text leading-tight">
        {post.title}
      </h1>
      <div className="mt-3 text-sm text-gray-400 flex gap-3">
        <span>
          {new Date(post.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <span>•</span>
        <span>{post.mins_read} min read</span>
      </div>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-8 h-8 rounded-full relative overflow-hidden">
          <Image src="/images/avatar.png" alt="author" fill />
        </div>
        <span className="text-sm text-gray-400">By {post.author_name}</span>
      </div>
      <div className="mt-8 rounded-xl overflow-hidden w-full h-60 sm:h-100 relative">
        <Image
          unoptimized
          src={post.cover_image}
          alt={post.title}
          className="object-cover"
          fill
        />
      </div>
      <article
        className="mt-10 text-gray-400 space-y-6 leading-relaxed tracking-wide"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}

async function PostPage({ params }: Props) {
  const { slug } = await params;

  return (
    <ContainerLayout>
      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={slug} />
      </Suspense>
    </ContainerLayout>
  );
}

export default PostPage;
