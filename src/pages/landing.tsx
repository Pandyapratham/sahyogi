import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, CardBody } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useAuth } from '../contexts/auth-context';

export const LandingPage: React.FC = () => {
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;

  const getDashboardLink = () => {
    if (!isAuthenticated || !user) return '/login';
    return user.role === 'elderly' ? '/elderly/dashboard' : '/volunteer/dashboard';
  };

  const features = [
    {
      icon: 'lucide:users',
      title: 'Connect with Volunteers',
      description: 'Find trusted volunteers in your area who are ready to help with daily tasks.',
    },
    {
      icon: 'lucide:calendar',
      title: 'Schedule Assistance',
      description: 'Easily schedule help for shopping, transportation, housework, and more.',
    },
    {
      icon: 'lucide:message-circle',
      title: 'Simple Communication',
      description: 'Stay connected with volunteers through our easy-to-use messaging system.',
    },
    {
      icon: 'lucide:shield',
      title: 'Verified Helpers',
      description: 'All volunteers undergo verification for your safety and peace of mind.',
    },
    {
      icon: 'lucide:heart-pulse',
      title: 'Health & Wellness',
      description: 'Get assistance with medical appointments and medication reminders.',
    },
    {
      icon: 'lucide:smartphone',
      title: 'Technology Help',
      description: 'Receive support with computers, smartphones, and other technology.',
    },
  ];

  const testimonials = [
    {
      quote: "Sahayogi has made a tremendous difference in my life. I can now get help with grocery shopping and doctor's appointments without having to burden my family.",
      name: 'Margaret W.',
      role: 'Senior Member',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
    },
    {
      quote: "Volunteering through Sahayogi is incredibly rewarding. The platform makes it easy to find seniors in my area who need assistance, and I've made wonderful connections.",
      name: 'David L.',
      role: 'Volunteer',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=11',
    },
    {
      quote: "As someone who lives far from my elderly parents, knowing they have Sahayogi gives me peace of mind. The volunteers have been reliable and compassionate.",
      name: 'Sarah T.',
      role: 'Family Member',
      avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=12',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900 dark:to-secondary-900 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Connecting Seniors with Caring Volunteers
              </h1>
              <p className="text-xl md:text-2xl text-default-700 mb-8">
                Sahayogi helps seniors live independently by connecting them with volunteers for everyday assistance and companionship.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  as={RouterLink}
                  to={isAuthenticated ? getDashboardLink() : "/register"}
                  color="primary"
                  size="lg"
                  className="text-lg h-14 px-8"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                </Button>
                <Button
                  as={RouterLink}
                  to="/register"
                  variant="flat"
                  color="default"
                  size="lg"
                  className="text-lg h-14 px-8"
                  startContent={<Icon icon="lucide:heart" />}
                >
                  Become a Volunteer
                </Button>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="https://img.heroui.chat/image/ai?w=600&h=400&u=sahayogi-hero" 
                alt="Senior with volunteer" 
                className="rounded-xl shadow-lg w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -z-10 opacity-20">
          <Icon icon="lucide:heart" className="text-primary text-9xl" />
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-20">
          <Icon icon="lucide:heart-handshake" className="text-secondary text-9xl" />
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 md:py-24 bg-background" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Sahayogi Works</h2>
            <p className="text-xl text-default-600 max-w-3xl mx-auto">
              Our platform makes it easy for seniors to find help and for volunteers to offer their assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Icon icon="lucide:user-plus" className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">1. Create an Account</h3>
              <p className="text-default-600">
                Sign up as a senior seeking assistance or as a volunteer ready to help.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Icon icon="lucide:clipboard-list" className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">2. Request or Offer Help</h3>
              <p className="text-default-600">
                Seniors can request specific assistance, and volunteers can browse available requests.
              </p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-6">
                <Icon icon="lucide:heart-handshake" className="text-4xl text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">3. Connect and Help</h3>
              <p className="text-default-600">
                Volunteers and seniors connect, schedule assistance, and build meaningful relationships.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 md:py-24 bg-content2" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Features Designed for Seniors</h2>
            <p className="text-xl text-default-600 max-w-3xl mx-auto">
              Sahayogi offers a range of services to help seniors maintain their independence and quality of life.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardBody className="flex flex-col items-center text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                      <Icon icon={feature.icon} className="text-3xl text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-default-600">{feature.description}</p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-background" id="testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-xl text-default-600 max-w-3xl mx-auto">
              Hear from seniors, volunteers, and family members who have experienced the benefits of Sahayogi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardBody className="p-6">
                    <div className="mb-6">
                      <Icon icon="lucide:quote" className="text-4xl text-primary opacity-50" />
                    </div>
                    <p className="text-default-600 mb-6 italic">"{testimonial.quote}"</p>
                    <div className="flex items-center">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-default-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-default-600 mb-8 max-w-3xl mx-auto">
              Join Sahayogi today and be part of a community that cares. Whether you're a senior seeking assistance or someone looking to make a difference, we welcome you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                as={RouterLink}
                to="/register"
                color="primary"
                size="lg"
                className="text-lg h-14 px-8"
              >
                Sign Up as a Senior
              </Button>
              <Button
                as={RouterLink}
                to="/register"
                variant="flat"
                color="default"
                size="lg"
                className="text-lg h-14 px-8"
                startContent={<Icon icon="lucide:heart" />}
              >
                Become a Volunteer
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
