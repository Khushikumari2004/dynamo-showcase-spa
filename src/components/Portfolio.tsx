import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter, 
  ExternalLink, 
  Edit, 
  Check, 
  Plus, 
  X,
  Sun,
  Moon,
  Camera,
  User
} from 'lucide-react';

// Types
interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    email?: string;
    phone?: string;
    location?: string;
    profilePicture?: string;
  };
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  summary?: string;
  experience: Array<{
    id: string;
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    github?: string;
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
}

// Default data structure
const defaultData: PortfolioData = {
  personalInfo: {
    name: 'Your Name',
    title: 'Your Professional Title',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Your City, State',
  },
  socialLinks: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  summary: 'A passionate professional with expertise in creating amazing solutions. Write your compelling summary here.',
  experience: [
    {
      id: '1',
      title: 'Senior Developer',
      company: 'Amazing Company',
      period: '2022 - Present',
      description: 'Led development of innovative solutions and managed a team of developers.',
    },
    {
      id: '2',
      title: 'Software Developer',
      company: 'Previous Company',
      period: '2020 - 2022',
      description: 'Developed and maintained web applications using modern technologies.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Project Alpha',
      description: 'An innovative web application that solves real-world problems.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      link: 'https://project-alpha.com',
      github: 'https://github.com/yourusername/project-alpha',
    },
    {
      id: '2',
      name: 'Project Beta',
      description: 'A mobile-first application with beautiful design and smooth UX.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      link: 'https://project-beta.com',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'SQL', 'AWS', 'Docker'],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023',
    },
    {
      id: '2',
      name: 'React Professional',
      issuer: 'Meta',
      date: '2022',
    },
  ],
};

// Animated blobs component
const Blobs: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-72 h-72 bg-white/20 rounded-full animate-blob"></div>
    <div className="absolute top-0 right-4 w-72 h-72 bg-accent/30 rounded-full animate-blob animate-blob-delay"></div>
    <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary/20 rounded-full animate-blob animate-blob-delay-2"></div>
  </div>
);

// Editable text component
interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  isEditing,
  className = '',
  placeholder,
  multiline = false,
}) => {
  if (!isEditing) {
    return <span className={className}>{value}</span>;
  }

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${className} bg-white/20 border border-white/30 rounded-lg p-2 resize-none`}
        placeholder={placeholder}
        rows={3}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${className} bg-white/20 border border-white/30 rounded-lg p-2`}
      placeholder={placeholder}
    />
  );
};

// Contact pill component
interface ContactPillProps {
  icon: React.ReactNode;
  text: string | React.ReactNode;
  href?: string;
}

const ContactPill: React.FC<ContactPillProps> = ({ icon, text, href }) => {
  const content = (
    <div className="contact-pill flex items-center space-x-2">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

// Social icon component
interface SocialIconProps {
  icon: React.ReactNode;
  href: string;
  label: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon, href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 glass-card hover:scale-110 transition-transform duration-300"
    aria-label={label}
  >
    {icon}
  </a>
);

// Profile picture component
interface ProfilePictureProps {
  src?: string;
  name: string;
  isEditing: boolean;
  onImageChange: (base64: string) => void;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ src, name, isEditing, onImageChange }) => {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        onImageChange(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group">
      <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/20 flex items-center justify-center">
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-16 h-16 text-white/60" />
        )}
      </div>
      {isEditing && (
        <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="w-8 h-8 text-white" />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

// Main Portfolio component
const Portfolio: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(defaultData);
  const [isEditing, setIsEditing] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('portfolioData');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  // Theme toggle
  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  // Update functions
  const updatePersonalInfo = (field: keyof PortfolioData['personalInfo'], value: string) => {
    setData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateSocialLinks = (platform: keyof PortfolioData['socialLinks'], url: string) => {
    setData(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: url }
    }));
  };

  const updateSummary = (summary: string) => {
    setData(prev => ({ ...prev, summary }));
  };

  const addSkill = (skill: string) => {
    if (skill.trim() && !data.skills.includes(skill.trim())) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const removeSkill = (index: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const updateProfilePicture = (base64: string) => {
    updatePersonalInfo('profilePicture', base64);
  };

  // Conditional rendering helpers
  const hasContactInfo = data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location;
  const hasSocialLinks = data.socialLinks.github || data.socialLinks.linkedin || data.socialLinks.twitter;
  const hasExperience = data.experience.length > 0;
  const hasProjects = data.projects.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasCertifications = data.certifications.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="relative bg-gradient-primary text-white overflow-hidden">
        <Blobs />
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="flex justify-between items-start mb-8">
            <button
              onClick={toggleTheme}
              className="glass-card p-3 hover:scale-110 transition-transform"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="glass-card p-3 hover:scale-110 transition-transform"
              aria-label={isEditing ? 'Save changes' : 'Edit portfolio'}
            >
              {isEditing ? <Check className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
            </button>
          </div>

          <div className="text-center">
            <ProfilePicture
              src={data.personalInfo.profilePicture}
              name={data.personalInfo.name}
              isEditing={isEditing}
              onImageChange={updateProfilePicture}
            />
            
            <h1 className="text-4xl md:text-6xl font-extrabold mt-6 mb-2 shimmer-text">
              <EditableText
                value={data.personalInfo.name}
                onChange={(value) => updatePersonalInfo('name', value)}
                isEditing={isEditing}
                className="shimmer-text"
              />
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              <EditableText
                value={data.personalInfo.title}
                onChange={(value) => updatePersonalInfo('title', value)}
                isEditing={isEditing}
                className="text-xl md:text-2xl text-white/90"
              />
            </p>

            {/* Contact Pills */}
            {hasContactInfo && (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {data.personalInfo.email && (
                  <ContactPill
                    icon={<Mail className="w-4 h-4" />}
                    text={isEditing ? (
                      <EditableText
                        value={data.personalInfo.email}
                        onChange={(value) => updatePersonalInfo('email', value)}
                        isEditing={isEditing}
                        className="text-sm font-medium bg-transparent border-none outline-none"
                      />
                    ) : data.personalInfo.email}
                    href={`mailto:${data.personalInfo.email}`}
                  />
                )}
                {data.personalInfo.phone && (
                  <ContactPill
                    icon={<Phone className="w-4 h-4" />}
                    text={isEditing ? (
                      <EditableText
                        value={data.personalInfo.phone}
                        onChange={(value) => updatePersonalInfo('phone', value)}
                        isEditing={isEditing}
                        className="text-sm font-medium bg-transparent border-none outline-none"
                      />
                    ) : data.personalInfo.phone}
                    href={`tel:${data.personalInfo.phone}`}
                  />
                )}
                {data.personalInfo.location && (
                  <ContactPill
                    icon={<MapPin className="w-4 h-4" />}
                    text={isEditing ? (
                      <EditableText
                        value={data.personalInfo.location}
                        onChange={(value) => updatePersonalInfo('location', value)}
                        isEditing={isEditing}
                        className="text-sm font-medium bg-transparent border-none outline-none"
                      />
                    ) : data.personalInfo.location}
                  />
                )}
              </div>
            )}

            {/* Social Links */}
            {hasSocialLinks && (
              <div className="flex justify-center space-x-4">
                {data.socialLinks.github && (
                  <SocialIcon
                    icon={<Github className="w-6 h-6 text-white" />}
                    href={data.socialLinks.github}
                    label="GitHub"
                  />
                )}
                {data.socialLinks.linkedin && (
                  <SocialIcon
                    icon={<Linkedin className="w-6 h-6 text-white" />}
                    href={data.socialLinks.linkedin}
                    label="LinkedIn"
                  />
                )}
                {data.socialLinks.twitter && (
                  <SocialIcon
                    icon={<Twitter className="w-6 h-6 text-white" />}
                    href={data.socialLinks.twitter}
                    label="Twitter"
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 max-w-6xl">
        {/* Summary Section */}
        {data.summary && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">About</h2>
            <div className="glass-card p-8 bg-gradient-soft">
              <EditableText
                value={data.summary}
                onChange={updateSummary}
                isEditing={isEditing}
                className="text-lg leading-relaxed text-foreground"
                multiline
              />
            </div>
          </section>
        )}

        {/* Experience Section */}
        {hasExperience && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">Experience</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {data.experience.map((exp) => (
                <div key={exp.id} className="project-card bg-gradient-soft">
                  <h3 className="text-xl font-bold text-primary mb-2">{exp.title}</h3>
                  <p className="text-secondary font-semibold mb-2">{exp.company}</p>
                  <p className="text-muted-foreground text-sm mb-4">{exp.period}</p>
                  <p className="text-foreground">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {hasProjects && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {data.projects.map((project) => (
                <div key={project.id} className="project-card bg-gradient-soft">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-primary">{project.name}</h3>
                    <div className="flex space-x-2">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                          aria-label="View project"
                        >
                          <ExternalLink className="w-4 h-4 text-primary" />
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                          aria-label="View source code"
                        >
                          <Github className="w-4 h-4 text-primary" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="skill-tag text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills Section */}
        {hasSkills && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">Skills</h2>
            <div className="glass-card p-8 bg-gradient-soft">
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="relative group">
                    <span className="skill-tag">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(index)}
                          className="ml-2 hover:text-destructive"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </span>
                  </div>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      const skill = prompt('Enter a new skill:');
                      if (skill) addSkill(skill);
                    }}
                    className="skill-tag bg-primary/20 border-2 border-dashed border-primary/40 text-primary hover:bg-primary/30"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Skill
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {hasCertifications && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold gradient-text mb-6">Certifications</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="glass-card p-6 bg-gradient-soft">
                  <h3 className="font-bold text-primary mb-2">{cert.name}</h3>
                  <p className="text-secondary text-sm mb-1">{cert.issuer}</p>
                  <p className="text-muted-foreground text-xs">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-primary text-white overflow-hidden">
        <Blobs />
        <div className="relative z-10 container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Connect</h2>
          
          {/* Contact Pills */}
          {hasContactInfo && (
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {data.personalInfo.email && (
                <ContactPill
                  icon={<Mail className="w-4 h-4" />}
                  text={data.personalInfo.email}
                  href={`mailto:${data.personalInfo.email}`}
                />
              )}
              {data.personalInfo.phone && (
                <ContactPill
                  icon={<Phone className="w-4 h-4" />}
                  text={data.personalInfo.phone}
                  href={`tel:${data.personalInfo.phone}`}
                />
              )}
              {data.personalInfo.location && (
                <ContactPill
                  icon={<MapPin className="w-4 h-4" />}
                  text={data.personalInfo.location}
                />
              )}
            </div>
          )}

          {/* Social Links */}
          {hasSocialLinks && (
            <div className="flex justify-center space-x-4 mb-8">
              {data.socialLinks.github && (
                <SocialIcon
                  icon={<Github className="w-6 h-6 text-white" />}
                  href={data.socialLinks.github}
                  label="GitHub"
                />
              )}
              {data.socialLinks.linkedin && (
                <SocialIcon
                  icon={<Linkedin className="w-6 h-6 text-white" />}
                  href={data.socialLinks.linkedin}
                  label="LinkedIn"
                />
              )}
              {data.socialLinks.twitter && (
                <SocialIcon
                  icon={<Twitter className="w-6 h-6 text-white" />}
                  href={data.socialLinks.twitter}
                  label="Twitter"
                />
              )}
            </div>
          )}

          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} {data.personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;