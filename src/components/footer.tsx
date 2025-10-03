import React from 'react';
import { Link } from '@heroui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-content1 border-t border-divider py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:heart-handshake" className="text-primary text-3xl" />
              <h2 className="text-2xl font-bold">Sahayogi</h2>
            </div>
            <p className="text-default-600 mb-4">
              Connecting seniors with volunteers for support and assistance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" className="text-2xl text-default-600 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Icon icon="lucide:twitter" className="text-2xl text-default-600 hover:text-primary" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" className="text-2xl text-default-600 hover:text-primary" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link as={RouterLink} to="/" className="text-default-600 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-default-600 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-default-600 hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-default-600 hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Icon icon="lucide:map-pin" className="text-primary" />
                <span className="text-default-600">123 Main Street, City, Country</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:phone" className="text-primary" />
                <span className="text-default-600">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Icon icon="lucide:mail" className="text-primary" />
                <span className="text-default-600">contact@sahayogi.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-divider mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-default-600 text-center md:text-left mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sahayogi. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="#" className="text-default-600 hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="text-default-600 hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="text-default-600 hover:text-primary">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
