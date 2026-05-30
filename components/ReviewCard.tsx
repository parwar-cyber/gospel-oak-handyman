import { Star } from "lucide-react";

interface ReviewCardProps {
  author: string;
  text: string;
  rating: number;
}

export default function ReviewCard({ author, text, rating }: ReviewCardProps) {
  return (
    <blockquote className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-card">
      <div className="mb-3 flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="h-4 w-4 fill-brand-orange text-brand-orange"
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="flex-1 text-sm leading-relaxed text-gray-700">
        &ldquo;{text}&rdquo;
      </p>
      <footer className="mt-4 text-sm font-bold text-brand-dark">
        — {author}
      </footer>
    </blockquote>
  );
}
