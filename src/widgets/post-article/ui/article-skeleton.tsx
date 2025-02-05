export const ArticleSkeleton: React.FC = () => (
  <div>
    <div className="h-8 w-4/5 animate-pulse rounded bg-gray-200 md:h-12 md:rounded-lg dark:bg-gray-700" />
    <div className="mt-4 h-6 w-full animate-pulse rounded bg-gray-200 md:mt-8 md:h-8 md:rounded-lg dark:bg-gray-700" />
    <div className="mt-2 h-6 w-3/5 animate-pulse rounded bg-gray-200 md:mt-4 md:h-8 md:rounded-lg dark:bg-gray-700" />
    <div className="mt-8 aspect-thumbnail animate-pulse rounded bg-gray-200 md:mt-12 md:rounded-lg dark:bg-gray-700" />
  </div>
)
