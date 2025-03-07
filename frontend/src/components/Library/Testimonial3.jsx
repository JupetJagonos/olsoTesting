// eslint-disable-next-line no-unused-vars
import React from "react";
import { Carousel } from "react-bootstrap"; // Import the Bootstrap Carousel

// Import images at the top of the file using import statement
import ChandlerBingImage from '../../assets/img/Customer/ChandlerBing.jpg';
import MichealScottImage from '../../assets/img/Customer/MichealScott.jpg';
import BarneyStinsonImage from '../../assets/img/Customer/BarneyStinson.jpg';

export function Testimonial3() {
  return (
    <section id="testimonial" className="px-[5%] py-20 bg-bg-100">
      <div className="container text-center">
        <h1 className="text-5xl font-bold mb-5">What Our Users Say</h1>
        <p className="mb-10">See feedback from our customers!</p>
        <Carousel>
          {/* Testimonial 1 */}
          <Carousel.Item>
            <div className="p-6 border border-accent-200 rounded-lg shadow-lg bg-white">
              <blockquote className="text-md font-bold md:text-lg">
                Olsos transformed how I book services locally!
              </blockquote>
              <div className="mt-4">
                <img
                  src={ChandlerBingImage} // Use the imported image
                  alt="Chandler Bing"
                  className="w-24 h-24 rounded-full mx-auto" // Adjust image size
                />
                <p className="font-semibold">Chandler Bing</p>
                <p className="text-text-200">Happy Customer</p>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 2 */}
          <Carousel.Item>
            <div className="p-6 border border-accent-200 rounded-lg shadow-lg bg-white">
              <blockquote className="text-md font-bold md:text-lg">
                I love the ease of finding local services!
              </blockquote>
              <div className="mt-4">
                <img
                  src={MichealScottImage} // Use the imported image
                  alt="Micheal Scott"
                  className="w-24 h-24 rounded-full mx-auto" // Adjust image size
                />
                <p className="font-semibold">Michael Scott</p>
                <p className="text-text-200">Local Business Owner</p>
              </div>
            </div>
          </Carousel.Item>

          {/* Testimonial 3 */}
          <Carousel.Item>
            <div className="p-6 border border-accent-200 rounded-lg shadow-lg bg-white">
              <blockquote className="text-md font-bold md:text-lg">
                The platform is user-friendly and efficient!
              </blockquote>
              <div className="mt-4">
                <img
                  src={BarneyStinsonImage} // Use the imported image
                  alt="Barney Stinson"
                  className="w-24 h-24 rounded-full mx-auto" // Adjust image size
                />
                <p className="font-semibold">Barney Stinson</p>
                <p className="text-text-200">Service Provider</p>
              </div>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </section>
  );
}