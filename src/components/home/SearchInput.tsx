"use client";

interface PostSearchResults {
  id: string;
  title: string;
  slug: string;
  category: string;
}

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

const supabase = createClient();

function SearchInput() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PostSearchResults[]>([]);

  useEffect(() => {
    async function searchPost() {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("id,title,slug,category")
          .eq("status", "published")
          .ilike("title", `%${query}%`)
          .limit(5);

        if (error) {
          console.log(error);
          return;
        }

        setResults(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    //little debounce

    const timer = setTimeout(() => {
      searchPost();
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-xl mx-auto relative">
      <div className="flex items-center border border-border rounded-xl overflow-hidden p-1">
        <input
          type="text"
          placeholder="Search articles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 bg-transparent outline-none text-sm text-text placeholder-gray-500"
        />
        <button className="px-5 py-2.5 bg-primary text-white text-sm font-medium hover:opacity-90 transition rounded-lg cursor-pointer">
          Search
        </button>
      </div>

      {query && (
        <div
          className="absolute top-full mt-2 w-full bg-card border
        border-border rounded-xl shadow-lg overflow-hidden z-50"
        >
          {loading && (
            <p className="px-4 py-4 text-sm text-gray-400">Searching...</p>
          )}

          {!loading && results.length === 0 && (
            <p className="px-4 py-4 text-sm text-gray-400">No posts found!</p>
          )}

          {!loading &&
            results.map((post) => (
              <Link
                onClick={() => setQuery("")}
                href={`/post/${post.slug}`}
                key={post.id}
                className="block px-4 py-3 hover:bg-surface transition border-b border-border last:border-none"
              >
                <p className="text-sm text-text font-medium">{post.title}</p>

                <p className="text-xs text-gray-400 capitalize mt-1">
                  {post.category}
                </p>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchInput;
