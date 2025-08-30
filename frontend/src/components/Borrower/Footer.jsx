import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white mt-16 border-t border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#111827]">LibraryOS</h4>
          <p className="text-[#6B7280] leading-relaxed">
            Your ultimate platform for discovering, borrowing, and enjoying
            books. Join our community of avid readers today.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#111827]">Quick Links</h4>
          <ul className="space-y-2">
            <li
              className="cursor-pointer text-[#166FE5] hover:text-[#1A73E8] transition"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer text-[#166FE5] hover:text-[#1A73E8] transition"
              onClick={() => navigate("/explore-books")}
            >
              Explore Books
            </li>
            <li
              className="cursor-pointer text-[#166FE5] hover:text-[#1A73E8] transition"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </li>
            <li
              className="cursor-pointer text-[#166FE5] hover:text-[#1A73E8] transition"
              onClick={() => navigate("/contact")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#111827]">Contact</h4>
          <ul className="space-y-2 text-[#6B7280]">
            <li>Email: support@libraryos.com</li>
            <li>Phone: +123 456 7890</li>
            <li>Address: 123 Library Street, Booktown</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-lg font-bold mb-4 text-[#111827]">Follow Us</h4>
          <div className="flex space-x-5 mt-2 text-xl">
            <a
              href="#"
              className="text-[#166FE5] hover:text-[#1A73E8] transition"
            >
              🌐
            </a>
            <a
              href="#"
              className="text-[#166FE5] hover:text-[#1A73E8] transition"
            >
              🐦
            </a>
            <a
              href="#"
              className="text-[#166FE5] hover:text-[#1A73E8] transition"
            >
              📘
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E5E7EB] mt-8 pt-6 text-center text-[#6B7280] text-sm">
        © {new Date().getFullYear()} LibraryOS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
