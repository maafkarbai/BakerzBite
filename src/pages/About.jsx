import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  const values = [
    {
      icon: '🌾',
      title: 'Quality Ingredients',
      description: 'We use only the finest, locally-sourced ingredients in all our products.'
    },
    {
      icon: '👨‍🍳',
      title: 'Expert Craftsmanship',
      description: 'Our skilled bakers bring years of experience and passion to every creation.'
    },
    {
      icon: '❤️',
      title: 'Made with Love',
      description: 'Every item is crafted with care and attention to detail.'
    },
    {
      icon: '🌱',
      title: 'Sustainable Practices',
      description: 'We are committed to environmentally friendly and sustainable baking practices.'
    }
  ];

  const team = [
    {
      name: 'Chef Maria Rodriguez',
      role: 'Head Baker & Founder',
      bio: '20 years of experience in artisan baking'
    },
    {
      name: 'John Smith',
      role: 'Pastry Chef',
      bio: 'Specializes in French pastries and desserts'
    },
    {
      name: 'Emily Chen',
      role: 'Cake Designer',
      bio: 'Creates stunning custom cakes for special occasions'
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold font-Oxygen mb-4">About Bakerz Bite</h1>
          <p className="text-lg opacity-90">Our story, our passion, our commitment to excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 font-Oxygen text-gray-800">Our Story</h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Founded in 2010, Bakerz Bite began as a small family bakery with a simple mission: 
              to bring joy to our community through the art of baking. What started as a passion 
              project in a tiny kitchen has grown into a beloved local institution.
            </p>
            <p className="mb-6">
              Our founder, Chef Maria Rodriguez, brought her grandmother's recipes and a vision 
              of creating a place where every bite tells a story. Today, we continue that tradition, 
              combining time-honored techniques with innovative flavors to create unforgettable 
              baked goods.
            </p>
            <p>
              From our signature red velvet cupcakes to our flaky croissants, every item in our 
              bakery is made fresh daily with the same love and attention that started it all.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-Oxygen text-gray-800">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2 font-Oxygen">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 font-Oxygen text-gray-800">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-[#D65A31] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="text-xl font-semibold mb-1 font-Oxygen">{member.name}</h3>
                <p className="text-[#D65A31] font-medium mb-2">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-[#D65A31] to-[#E97451] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 font-Oxygen">Visit Us Today</h2>
          <p className="text-lg mb-8 opacity-90">
            Experience the warmth of our bakery and taste the difference passion makes
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-8 py-3 bg-white text-[#D65A31] rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Get Directions
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;