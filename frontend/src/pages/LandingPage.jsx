import React from "react";
import BookSlider from "../components/Borrower/BookSlider";
import GeneralNavBar from "../components/Borrower/GeneralNavBar";
import Footer from "../components/Borrower/Footer";

const LandingPage = () => {
  const books = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      status: "Available",
    },
    { title: "1984", author: "George Orwell", status: "Borrowed" },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      status: "Reserved",
    },
    { title: "Moby Dick", author: "Herman Melville", status: "Available" },
    { title: "Pride and Prejudice", author: "Jane Austen", status: "Borrowed" },
  ];

  return (
    <div className="bg-[#F3F4F6] text-[#111827]">
      <GeneralNavBar />

      <div className="min-h-screen w-full p-6 md:p-10 mx-auto space-y-10">
        {/* Hero Section */}
        <section
          className="relative rounded-2xl text-center text-white overflow-hidden border border-[#E5E7EB]"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fExpYnJhcnl8ZW58MHx8MHx8fDA%3D")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>

          <div className="relative z-10 p-10 md:p-16">
            <h1 className="text-4xl md:text-5xl font-bold">
              Welcome to LibraryOS
            </h1>
            <p className="mt-4 text-gray-100 max-w-2xl mx-auto">
              Discover your next favorite book from our extensive collection.
              From classic literature to modern bestsellers, we have something
              for every reader.
            </p>

            <div className="mt-8 flex justify-center space-x-4">
              <button className="bg-[#166FE5] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#1A73E8] transition">
                Browse Books
              </button>
            </div>
          </div>
        </section>

        {/* Featured Books */}
        <section className="bg-[#FFFFFF] rounded-2xl border border-[#E5E7EB] p-10">
          <h2 className="text-2xl font-bold text-[#111827] text-center">
            Featured Books
          </h2>
          <p className="text-[#6B7280] text-center mt-2">
            Discover our most popular and newly added titles
          </p>
          <div className="mt-6">
            <BookSlider books={books} />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-[#F3F4F6] rounded-2xl p-10 md:p-16 text-center space-y-8 border border-[#E5E7EB]">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827]">
            How It Works
          </h2>
          <p className="text-[#6B7280] max-w-3xl mx-auto">
            Borrowing books has never been this easy. Get started in just a few
            steps!
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E5E7EB]">
              <div className="text-[#166FE5] text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                Discover
              </h3>
              <p className="text-[#6B7280]">
                Browse our collection and find your next read.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E5E7EB]">
              <div className="text-[#166FE5] text-4xl mb-4">📖</div>
              <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                Borrow
              </h3>
              <p className="text-[#6B7280]">
                Easily borrow books with just a click.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E5E7EB]">
              <div className="text-[#166FE5] text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                Enjoy
              </h3>
              <p className="text-[#6B7280]">
                Immerse yourself in stories anytime, anywhere.
              </p>
            </div>

            <div className="bg-[#FFFFFF] p-6 rounded-xl border border-[#E5E7EB]">
              <div className="text-[#166FE5] text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2 text-[#111827]">
                Return
              </h3>
              <p className="text-[#6B7280]">
                Return and pick your next adventure.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
