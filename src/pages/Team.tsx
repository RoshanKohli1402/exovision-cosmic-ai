import React from 'react';
import { 
  Users, 
  Github, 
  Linkedin, 
  Mail,
  Star,
  Telescope,
  Brain,
  Code
} from 'lucide-react';
import CosmicCard from '@/components/CosmicCard';

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Mission Commander",
      specialty: "Astrophysics & AI Research",
      description: "Leading exoplanet research with 10+ years in space telescope data analysis and machine learning applications in astronomy.",
      avatar: "SC",
      color: "primary"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "AI Systems Engineer",
      specialty: "Machine Learning & Data Science",
      description: "Specialized in deep learning architectures for astronomical data processing and pattern recognition in noisy datasets.",
      avatar: "MR",
      color: "secondary"
    },
    {
      id: 3,
      name: "Dr. Elena Kowalski",
      role: "Data Pipeline Architect",
      specialty: "Software Engineering & DevOps",
      description: "Expert in large-scale data processing systems and cloud infrastructure for scientific computing applications.",
      avatar: "EK",
      color: "accent"
    },
    {
      id: 4,
      name: "James Thompson",
      role: "Research Scientist",
      specialty: "Computational Astrophysics",
      description: "Focusing on statistical analysis of exoplanet populations and validation of machine learning detection algorithms.",
      avatar: "JT",
      color: "primary"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'from-primary to-primary/60 text-primary';
      case 'secondary':
        return 'from-secondary to-secondary/60 text-secondary';
      case 'accent':
        return 'from-accent to-accent/60 text-accent';
      default:
        return 'from-primary to-primary/60 text-primary';
    }
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-primary" />
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Mission Control Team
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-8" />
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Meet the brilliant minds behind ExoVision, combining decades of astrophysics expertise 
            with cutting-edge AI to accelerate exoplanet discovery.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <CosmicCard key={member.id} className="p-8 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-6">
                  {/* Avatar */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${getColorClasses(member.color).split(' text-')[0]} flex items-center justify-center flex-shrink-0`}>
                    <span className="font-heading text-xl font-bold text-white">
                      {member.avatar}
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="font-heading text-xl font-bold mb-1 text-foreground">
                      {member.name}
                    </h3>
                    <p className={`font-body text-sm font-medium mb-2 ${getColorClasses(member.color).split(' ')[1]}`}>
                      {member.role}
                    </p>
                    <p className="font-body text-sm text-muted-foreground mb-3">
                      {member.specialty}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                      {member.description}
                    </p>
                    
                    {/* Social Links */}
                    <div className="flex space-x-3">
                      <button className="p-2 hover:bg-border/20 rounded-lg transition-colors">
                        <Github className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-2 hover:bg-border/20 rounded-lg transition-colors">
                        <Linkedin className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                      <button className="p-2 hover:bg-border/20 rounded-lg transition-colors">
                        <Mail className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </div>
                </div>
              </CosmicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team Expertise */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center mb-16 text-foreground">
            Our Collective Expertise
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Telescope className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Astrophysics</h3>
              <p className="font-body text-sm text-muted-foreground">
                Deep understanding of stellar physics and exoplanet detection methods
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Brain className="w-12 h-12 mx-auto mb-4 text-secondary" />
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Machine Learning</h3>
              <p className="font-body text-sm text-muted-foreground">
                Advanced AI algorithms for pattern recognition and classification
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Code className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Software Engineering</h3>
              <p className="font-body text-sm text-muted-foreground">
                Scalable systems for processing massive astronomical datasets
              </p>
            </CosmicCard>
            
            <CosmicCard className="p-6 text-center hover:scale-105 transition-transform duration-300">
              <Star className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="font-heading text-lg font-bold mb-2 text-foreground">Research</h3>
              <p className="font-body text-sm text-muted-foreground">
                Published research in exoplanet science and computational methods
              </p>
            </CosmicCard>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <CosmicCard className="p-12 text-center hover:scale-105 transition-transform duration-300">
            <h2 className="font-heading text-3xl font-bold mb-6 text-foreground">
              Our Mission
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-8">
              We are dedicated to pushing the boundaries of exoplanet discovery through innovative 
              AI solutions. Our team combines deep astrophysical knowledge with cutting-edge machine 
              learning to unlock the secrets hidden in telescope data, accelerating humanity's search 
              for worlds beyond our solar system.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="font-heading text-3xl font-bold text-primary mb-2">50+</div>
                <div className="font-body text-sm text-muted-foreground">Combined years of experience</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold text-secondary mb-2">100K+</div>
                <div className="font-body text-sm text-muted-foreground">Light curves analyzed</div>
              </div>
              <div>
                <div className="font-heading text-3xl font-bold text-accent mb-2">15+</div>
                <div className="font-body text-sm text-muted-foreground">Research papers published</div>
              </div>
            </div>
          </CosmicCard>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 px-4 relative bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-bold mb-6 text-foreground">
            Join Our Mission
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            Are you passionate about space exploration and AI? We're always looking for talented 
            researchers, engineers, and data scientists to join our quest to discover new worlds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-body font-medium hover:scale-105 transform duration-200">
              View Open Positions
            </button>
            <button className="px-8 py-4 border border-border text-foreground rounded-lg hover:bg-border/10 transition-colors font-body font-medium hover:scale-105 transform duration-200">
              Collaborate With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Team;