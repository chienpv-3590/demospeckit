import Link from 'next/link';
import { CategoryWithCount } from '@/types';

interface CategoryListProps {
  categories: CategoryWithCount[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          📁 <span>Danh mục</span>
        </h2>
        <p className="text-sm text-gray-600 mt-1">Khám phá theo chủ đề</p>
      </div>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[48px] group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {category.color && (
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: category.color }}
                  />
                )}
                <span className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {category.name}
                </span>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {category.postCount}
              </span>
            </div>
            {category.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {category.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
