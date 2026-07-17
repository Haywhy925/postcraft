import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const supabase = createClient();

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  status: "draft" | "published";
  cover_image: string;
  mins_read: number;
  author_id: string;
  author_name: string;
  created_at: string;
}

function usePosts(limit?: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      let query = supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) {
        console.log(error);
      } else {
        setPosts(data || []);
      }

      setLoading(false);
    }
    fetchPosts();
  }, [limit]);

  return { posts, loading, setPosts };
}

export default usePosts;
