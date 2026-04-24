export const ProductCardShimmer = () => {
  return (
    <article className="grid gap-2 rounded-card border border-stroke bg-surface p-3">
      <div className="shimmer-block h-40 w-full rounded-control" />
      <div className="space-y-2">
        <div className="shimmer-block h-5 w-3/4 rounded-md" />
        <div className="shimmer-block h-5 w-1/3 rounded-md" />
        <div className="shimmer-block h-4 w-full rounded-md" />
        <div className="shimmer-block h-4 w-5/6 rounded-md" />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-center gap-2">
          <div className="shimmer-block h-8 w-8 rounded-md" />
          <div className="shimmer-block h-5 w-8 rounded-md" />
          <div className="shimmer-block h-8 w-8 rounded-md" />
        </div>
        <div className="shimmer-block mt-2 h-10 w-full rounded-control" />
      </div>
    </article>
  );
};
