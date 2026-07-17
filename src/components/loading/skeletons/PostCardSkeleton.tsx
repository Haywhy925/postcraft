function PostCardSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <div
          className="bg-card border border-border rounded-xl overflow-hidden"
          key={index}
        >
          {/*Image Skeleton */}
          <div className="h-44 w-full bg-surface" />

          {/*Content Skeleton */}

          <div className="p-5">
            {/*Category */}

            <div className="w-20 h-3 bg-surface rounded" />

            {/*Title */}

            <div className="mt-4 space-y-2">
              <div className="w-full h-5 bg-surface rounded" />
              <div className="w-3/4 h-5 bg-surface rounded" />
            </div>

            {/*Read Time */}
            <div className="w-24 h-4 bg-surface rounded mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostCardSkeleton;
