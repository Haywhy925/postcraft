function PostSkeleton() {
  return (
    <main className="max-w-2xl mx-auto animate-pulse">
      <div className="h-5 w-24 bg-card rounded mb-6" />
      <div className="h-10 w-full bg-card rounded mb-4" />
      <div className="flex gap-3 mb-6">
        <div className="h-4 w-24 bg-card rounded " />
        <div className="h-4 w-4 bg-card rounded-full" />
        <div className="h-4 w-20 bg-card rounded" />
      </div>
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-8 bg-card rounded-full " />
        <div className="h-4 w-32 bg-card rounded" />
      </div>
      <div className="w-full h-60 md:h-100 bg-card rounded-xl" />

      <div className="mt-10 space-y-4">
        <div className="h-4 w-full bg-card rounded " />
        <div className="h-4 w-full bg-card rounded " />
        <div className="h-4 w-5/6 bg-card rounded" />
        <div className="h-4 w-full bg-card rounded " />
        <div className="h-4 w-4/6 bg-card rounded " />
      </div>
    </main>
  );
}

export default PostSkeleton;
