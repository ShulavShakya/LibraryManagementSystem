import React from "react";

const BookCard = ({ title, author }) => {
  return (
    <div className="flex-shrink-0 w-72 bg-white border border-[#E5E7EB] rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Book Image */}
      <div className="w-full h-50 bg-[#F3F4F6] rounded-xl mb-4 flex items-center justify-center text-[#6B7280]">
        Cover Image
      </div>

      {/* Info */}
      <h3 className="text-lg font-semibold text-[#111827] truncate">{title}</h3>
      <p className="text-sm text-[#6B7280] mb-3">by {author}</p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-[#166FE5] hover:bg-[#1A73E8] text-white text-sm font-medium py-2 rounded-xl transition-colors">
          Details
        </button>
        <button className="flex-1 border border-[#166FE5] text-[#166FE5] hover:bg-[#E5E7EB] text-sm font-medium py-2 rounded-xl transition-colors">
          Borrow
        </button>
      </div>
    </div>
  );
};

const BookSlider = ({ books }) => {
  return (
    <div className="relative py-16">
      {/* Slider Container */}
      <div className="flex mx-12 overflow-x-auto gap-6 no-scrollbar scroll-smooth">
        {books.map((book, idx) => (
          <BookCard key={idx} {...book} />
        ))}
      </div>
    </div>
  );
};

export default BookSlider;
