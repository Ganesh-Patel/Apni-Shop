import React from 'react';

function AboutUs() {
  return (
    <div className="bg-gray-50 text-gray-800">
      <div className="container mx-auto py-16 px-6 md:px-12 lg:px-24">
        {/* Main Heading */}
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">
          About Apni-Shop
        </h1>

        {/* Intro Section */}
        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/ecommerce-website-banner-design_1281315-1674.jpg"
              alt="Apni-Shop"
              className="rounded-lg shadow-lg w-full object-cover h-96"
            />
          </div>
          <div className="lg:w-1/2 lg:pl-12 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">
              Welcome to Apni-Shop
            </h2>
            <p className="text-lg text-gray-600">
              Apni-Shop is your one-stop destination for all your shopping needs. Whether you’re looking for the latest fashion trends, cutting-edge electronics, or daily essentials, we bring everything to your fingertips.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Established with a vision to revolutionize online shopping, we offer a wide range of products from top brands at unbeatable prices. Our mission is to provide a seamless and enjoyable shopping experience to our customers, backed by excellent customer support and secure payment options.
            </p>
          </div>
        </div>

        {/* Our Mission and Vision */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* Mission */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to create an accessible and enjoyable shopping experience for everyone. We are dedicated to offering an extensive selection of high-quality products across various categories, ensuring every customer finds exactly what they need.
            </p>
          </div>
          
          {/* Vision */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a world where shopping is effortless, inclusive, and fun for everyone. Apni-Shop strives to be the most customer-centric platform, delivering products quickly and efficiently to every corner of the country while embracing sustainable practices.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-teal-600 text-white mt-16 py-12 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Why Choose Apni-Shop?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality */}
            <div className="text-center">
              <h3 className="text-xl font-semibold">Quality Products</h3>
              <p className="mt-4">
                We offer top-tier products across multiple categories, ensuring that quality is never compromised.
              </p>
            </div>
            {/* Secure Payments */}
            <div className="text-center">
              <h3 className="text-xl font-semibold">Secure Payments</h3>
              <p className="mt-4">
                Apni-Shop offers secure payment gateways, protecting your personal and payment details at every step.
              </p>
            </div>
            {/* Fast Delivery */}
            <div className="text-center">
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="mt-4">
                With an extensive logistics network, we ensure your orders are delivered swiftly and safely to your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                alt="Team Member 1"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Ganesh Patel</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHytcaoXDqynWuboDMnjyJ-kG1mxiWQGGuzzTGOWize35jKiP9VUWvOUhkEZtXYOxexKQ&usqp=CAU"
                alt="Team Member 2"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Sunny Kumar</h3>
              <p className="text-gray-600">CTO & Co-Founder</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://www.shutterstock.com/image-vector/person-gray-photo-placeholder-woman-600nw-1241538838.jpg"
                alt="Team Member 3"
                className="rounded-full w-40 h-40 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-teal-600">Sarah Brown</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
          </div>
        </div>

        {/* Customer Testimonials */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">What Our Customers Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"Apni-Shop has been a game-changer for me. The variety of products and the ease of shopping make it my go-to online store. Highly recommended!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Ramesh Kumar</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">"Fast delivery, great customer service, and high-quality products. Apni-Shop never disappoints!"</p>
              <p className="mt-4 text-teal-600 font-bold">- Sunita Verma</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
