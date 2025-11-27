import { Award, Heart, Target, User } from "lucide-react";


const About = () => {
  const values = [
    {
      icon: <Target className="text-3xl text-purple-600" />,
      title: "Our Mission",
      description: "To connect people through unforgettable experiences by making event discovery and ticket booking seamless and enjoyable.",
    },
    {
      icon: <User className="text-3xl text-blue-600" />,
      title: "Community First",
      description: "We believe in building strong communities by bringing people together through shared interests and memorable events.",
    },
    {
      icon: <Award className="text-3xl text-indigo-600" />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our platform, from user experience to customer service.",
    },
    {
      icon: <Heart className="text-3xl text-pink-600" />,
      title: "Passion",
      description: "Our passion for events drives us to continuously innovate and improve our platform for both organizers and attendees.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-purple-600 via-blue-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About TicketsGig</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed text-blue-100">
            We're on a mission to revolutionize how people discover, share, and
            experience amazing events. From intimate gatherings to grand
            celebrations, we make every moment count.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 2024, TicketsGig was born from a simple idea: event
                discovery and ticket booking shouldn't be complicated in  Bayelsa. We saw
                too many amazing events going unnoticed and too many people
                missing out on experiences they would love.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, we're proud to be the platform that connects event
                organizers with passionate attendees, making it easier than ever
                to find, book, and enjoy incredible experiences.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-purple-600">0</div>
                  <div className="text-gray-600">Events Hosted</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">0</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-600">0</div>
                  <div className="text-gray-600">Event Organizers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600">1</div>
                  <div className="text-gray-600">State</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Join Our Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We're always looking for passionate individuals who share our vision
            of connecting people through amazing experiences. Whether you're an
            event organizer or someone who loves attending events, there's a
            place for you in the TicketsGig community.
          </p>
          <div className="flex flex-col lg:flex-row gap-4 justify-center">
            <button className="bg-linear-to-r from-purple-600 to-pink-600 cursor-pointer text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all">
              Contact Us
            </button>
            <button className="border-2 border-purple-600 text-purple-600 cursor-pointer px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;