import React, { useState } from "react";
import { Mail, User, MessageSquare, BookOpen } from "lucide-react";
import GeneralNavBar from "../../components/Borrower/GeneralNavBar";
import Footer from "../../components/Borrower/Footer";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent to the librarian/admin!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <GeneralNavBar />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-[#D1D5DB] w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 overflow-hidden">
          {/* Left: Contact Form */}
          <div className="p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
              Contact the Librarian
            </h2>
            <p className="text-[#6B7280] mb-6">
              Have a question, request, or feedback? Fill out the form and we’ll
              get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
              {/* Name */}
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-[#6B7280]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] rounded-2xl bg-white text-[#111827] focus:ring-2 focus:ring-[#166FE5] focus:outline-none transition"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-[#6B7280]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] rounded-2xl bg-white text-[#111827] focus:ring-2 focus:ring-[#166FE5] focus:outline-none transition"
                />
              </div>

              {/* Subject */}
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-3 border border-[#D1D5DB] rounded-2xl bg-white text-[#111827] focus:ring-2 focus:ring-[#166FE5] focus:outline-none transition"
              />

              {/* Message */}
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-[#6B7280]" />
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-[#D1D5DB] rounded-2xl bg-white text-[#111827] focus:ring-2 focus:ring-[#166FE5] focus:outline-none transition resize-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#166FE5] hover:bg-[#1A73E8] text-white font-medium py-3 rounded-2xl transition-colors text-lg"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right: Illustration / Info */}
          <div className="hidden md:flex flex-col items-center justify-center text-center bg-gradient-to-br from-[#166FE5] to-[#1A73E8] p-6 md:p-8">
            <BookOpen className="w-20 h-20 mb-4" />
            <h3 className="text-3xl font-semibold mb-3 text-white">
              We’re Here to Help 📚
            </h3>
            <p className="text-white/90 mb-4">
              Reach out for book requests, borrowing issues, or general library
              inquiries. Our librarian will respond within 24 hours.
            </p>
            <p className="text-sm text-white/70">Library Admin Team</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactMe;
