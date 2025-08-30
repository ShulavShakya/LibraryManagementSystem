import { FaBook, FaUsers, FaHandshake } from "react-icons/fa";
import GeneralNavBar from "../../components/Borrower/GeneralNavBar";
import Footer from "../../components/Borrower/Footer";

const AboutUs = () => {
  const team = [
    {
      name: "Shuav Shakya",
      role: "Librarian",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "Jane Doe",
      role: "Assistant Librarian",
      img: "https://via.placeholder.com/150",
    },
    {
      name: "John Smith",
      role: "Community Manager",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F3F4F6] font-sans">
      <GeneralNavBar />

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-[#D1D5DB] shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#111827] mb-3">
                About Our Library
              </h1>
              <p className="text-[#6B7280] text-base leading-relaxed">
                Welcome to{" "}
                <span className="text-[#166FE5] font-semibold">
                  Our Library
                </span>
                ! We are dedicated to creating a hub of knowledge, community,
                and inspiration. From books to digital resources, our goal is to
                make learning accessible and engaging for everyone.
              </p>
            </div>
            <div className="flex-1">
              <img
                src="https://plus.unsplash.com/premium_photo-1677567996070-68fa4181775a?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Library"
                className="rounded-xl border border-[#D1D5DB] shadow-md"
              />
            </div>
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-[#D1D5DB] bg-white shadow-sm hover:shadow-md transition">
            <FaBook className="text-[#166FE5] text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-[#111827] mb-1">
              Our Mission
            </h3>
            <p className="text-sm text-[#6B7280]">
              To inspire curiosity, foster learning, and make knowledge
              accessible for all.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-[#D1D5DB] bg-white shadow-sm hover:shadow-md transition">
            <FaUsers className="text-[#34A853] text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-[#111827] mb-1">
              Our Community
            </h3>
            <p className="text-sm text-[#6B7280]">
              Building a vibrant, inclusive, and supportive community of readers
              and learners.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-[#D1D5DB] bg-white shadow-sm hover:shadow-md transition">
            <FaHandshake className="text-[#FBBC05] text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-[#111827] mb-1">
              Our Values
            </h3>
            <p className="text-sm text-[#6B7280]">
              Integrity, inclusivity, and a passion for learning are at the core
              of what we do.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-[#D1D5DB] shadow-sm mb-8">
          <h2 className="text-2xl font-bold text-[#111827] text-center mb-6 md:mb-8">
            Meet Our Team
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-4 md:p-6 rounded-xl border border-[#D1D5DB] bg-[#F9FAFB] hover:shadow-md transition"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full border border-[#D1D5DB] mb-3"
                />
                <h3 className="font-semibold text-lg text-[#111827] mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-[#6B7280]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
