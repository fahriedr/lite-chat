import React from 'react';

type Size = 'sm' | 'md' | 'lg';

type ColorType = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';

interface Props {
    label: string | number
    color: ColorType
    size: Size
}

export default function CircleChipBadge({ label, color = "blue", size = "md" }: Props) {
  // Size variants
  const sizeClasses = {
    sm: "h-6 text-xs px-2",
    md: "h-8 text-sm px-3",
    lg: "h-10 text-base px-4"
  };

  // Color variants
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    green: "bg-green-100 text-green-800 hover:bg-green-200",
    red: "bg-red-100 text-red-800 hover:bg-red-200",
    yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <span 
        className={`inline-flex items-center justify-center rounded-full font-medium transition-colors ${sizeClasses[size]} ${colorClasses[color]} cursor-pointer`}
      >
        {label}
      </span>
    </div>
  );
}