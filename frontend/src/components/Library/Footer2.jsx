// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Button, Input } from "@relume_io/relume-ui";
import { Link } from "react-router-dom"; // Ensure Link is imported
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoLinkedinSquare, BiLogoYoutube } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../assets/img/Logo/OlsoLogoNameWhite.png';
import '../../styles/Footer.css'; // Import CSS for the Footer

const useForm = () => {
  const [email, setEmail] = useState("");
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email });
  };

  return { email, handleSetEmail, handleSubmit };
};

export function Footer2() {
  const formState = useForm();

  return (
    <footer className="px-[5%] py-12 bg-primary-200 text-text-100">
      <div className="container grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Logo" style={{ width: '80px', height: '80px' }} />
          <p className="text-sm">Join our newsletter for updates on features and special offers.</p>
        </div>

        {/* Quick Links */}
        <div className="quicklinks">
          <h2 className="Sub-title">Quick Links</h2>
          <ul>
            <li className="py-2"><Link to="/" className="text-white">Home</Link></li>
            <li className="py-2"><Link to="/services" className="text-white">Services</Link></li>
            <li className="py-2"><Link to="/support" className="text-white">Support</Link></li>
            <li className="py-2"><Link to="/about" className="text-white">About Us</Link></li>
            <li className="py-2"><Link to="/contact" className="text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div className="flex flex-col items-start">
          <h2 className="Sub-title">Stay Connected</h2>
          <ul className="flex flex-row gap-4">
            <li><a href="#"><BiLogoFacebookCircle className="size-6 text-white" /></a></li>
            <li><a href="#"><FaXTwitter className="size-6 text-white" /></a></li>
            <li><a href="#"><BiLogoInstagram className="size-6 text-white" /></a></li>
            <li><a href="#"><BiLogoLinkedinSquare className="size-6 text-white" /></a></li>
            <li><a href="#"><BiLogoYoutube className="size-6 text-white" /></a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col">
          <h2 className="Sub-title">Subscribe</h2>
          <form onSubmit={formState.handleSubmit} className="flex flex-col">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={formState.handleSetEmail}
              className="mb-3 p-2 rounded border border-accent-100"
            />
            <Button title="Subscribe" variant="secondary" className="p-2 rounded btn-primary">
              Subscribe
            </Button>
          </form>
          <p className="mt-2 text-xs">
            By subscribing, you agree to our Privacy Policy and consent to receive updates.
          </p>
        </div>
      </div>

      {/* Line Divider */}
      <div className="mt-8 h-px w-full bg-accent-100" />

      {/* Copyright Section - Centered */}
      <div className="copyright" style={{ textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} olso. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer2;