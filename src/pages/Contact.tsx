import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Twitter,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';
import CosmicButton from '@/components/CosmicButton';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // A simple alert for the demo instead of a console log
    alert(`Thank you for your message, ${formData.name}! We will be in touch shortly.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Mail className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Contact Mission Control
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Have questions about ExoVision? Want to collaborate on exoplanet research? 
            Get in touch with our team of space exploration experts.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block font-body text-sm font-medium text-foreground mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-body text-sm font-medium text-foreground mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-black/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground"
                      placeholder="your.email@domain.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block font-body text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="collaboration">Research Collaboration</option>
                    <option value="prototype">Prototype Feedback</option>
                    <option value="data">Data Access Request</option>
                    <option value="press">Press & Media</option>
                    <option value="careers">Career Opportunities</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block font-body text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-black/20 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder-muted-foreground resize-none"
                    placeholder="Tell us about your inquiry, collaboration ideas, or feedback..."
                  />
                </div>
                
                <button 
                  type="submit" 
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-body font-medium hover:scale-105 transform duration-200 flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </CosmicCard>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Direct Contact */}
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-foreground">Email</p>
                    <p className="font-body text-muted-foreground">vanshikapandey2706@gmail.com</p>
                    <p className="font-body text-sm text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-foreground">Phone</p>
                    <p className="font-body text-muted-foreground">+91 9516891829</p>
                    <p className="font-body text-sm text-muted-foreground">Mon-Fri, 9AM-6PM IST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-body font-medium text-foreground">Location</p>
                    <p className="font-body text-muted-foreground">Gyan Ganga Institute of Technology and Sciences</p>
                    <p className="font-body text-sm text-muted-foreground">Jabalpur, M.P.</p>
                  </div>
                </div>
              </div>
            </CosmicCard>

            {/* Social Links */}
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Follow Our Mission
              </h2>
              
              <div className="space-y-4">
                <a 
                  href="https://github.com/roshankohli1402/exovision-cosmic-ai" 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 hover:bg-black/20 rounded-lg transition-colors group"
                >
                  <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                  <div>
                    <p className="font-body font-medium text-foreground">GitHub</p>
                    <p className="font-body text-sm text-muted-foreground">Open source code & datasets</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/roshan-kohli-758336219/" 
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-3 hover:bg-black/20 rounded-lg transition-colors group"
                >
                  <Linkedin className="w-6 h-6 text-muted-foreground group-hover:text-accent" />
                  <div>
                    <p className="font-body font-medium text-foreground">LinkedIn</p>
                    <p className="font-body text-sm text-muted-foreground">Professional network & careers</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground ml-auto" />
                </a>
              </div>
            </CosmicCard>

            {/* Quick Links - UPDATED */}
            <CosmicCard className="p-8">
              <h2 className="font-heading text-2xl font-bold mb-6 text-foreground">
                Resources & Research
              </h2>
              
              <div className="space-y-3">
                <a href="https://exoplanetarchive.ipac.caltech.edu/" target="_blank" rel="noopener noreferrer" className="block font-body text-muted-foreground hover:text-primary transition-colors">
                  → NASA Exoplanet Archive (MAST)
                </a>
                <a href="https://arxiv.org/abs/2011.14135" target="_blank" rel="noopener noreferrer" className="block font-body text-muted-foreground hover:text-primary transition-colors">
                  → Research: Exoplanet Detection using ML (arXiv)
                </a>
                <a href="https://www.jsr.org/hs/index.php/path/article/view/2821" target="_blank" rel="noopener noreferrer" className="block font-body text-muted-foreground hover:text-primary transition-colors">
                  → Research: Feature Importance in Verification
                </a>
                <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9132280/" target="_blank" rel="noopener noreferrer" className="block font-body text-muted-foreground hover:text-primary transition-colors">
                  → Research: Combining Real & Synthetic Data
                </a>
                <a href="https://www.spaceappschallenge.org/2025/challenges/a-world-away-hunting-for-exoplanets-with-ai/" target="_blank" rel="noopener noreferrer" className="block font-body text-muted-foreground hover:text-primary transition-colors">
                  → NASA Space Apps Challenge Brief
                </a>
              </div>
            </CosmicCard>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
            Ready to Explore the Cosmos?
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            Whether you're a researcher, student, or space enthusiast, we'd love to hear from you. 
            Join us in the quest to discover new worlds and advance our understanding of the universe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CosmicButton variant="primary" size="lg" className="hover:scale-105 transition-transform">
              Start Collaboration
            </CosmicButton>
            <CosmicButton variant="outline" size="lg" className="hover:scale-105 transition-transform">
              View Research
            </CosmicButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;