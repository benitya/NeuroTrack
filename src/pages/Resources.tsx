import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Heart, Coffee, Sun, Moon, Music, Users } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">Mental Wellness Resources</h1>
            <p className="text-lg text-muted-foreground">
              Explore our curated collection of articles, guides, and resources to support your mental health journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ResourceCard
              icon={<Brain className="h-6 w-6 text-primary" />}
              title="Understanding Mental Health"
              description="Learn about different aspects of mental health, common conditions, and ways to maintain psychological well-being."
              articles={[
                {
                  title: "The Science of Mental Health",
                  link: "https://www.nimh.nih.gov/health/topics/mental-health"
                },
                {
                  title: "Understanding Anxiety and Depression",
                  link: "https://www.who.int/news-room/fact-sheets/detail/mental-health-strengthening-our-response"
                }
              ]}
            />

            <ResourceCard
              icon={<Heart className="h-6 w-6 text-red-500" />}
              title="Self-Care Practices"
              description="Discover effective self-care strategies and daily practices to maintain your mental well-being."
              articles={[
                {
                  title: "Building a Self-Care Routine",
                  link: "https://www.mindful.org/self-care-tips/"
                },
                {
                  title: "Mindfulness for Beginners",
                  link: "https://www.headspace.com/mindfulness"
                }
              ]}
            />

            <ResourceCard
              icon={<Coffee className="h-6 w-6 text-amber-600" />}
              title="Stress Management"
              description="Learn techniques and strategies to effectively manage stress and build resilience."
              articles={[
                {
                  title: "Stress Relief Techniques",
                  link: "https://www.mayoclinic.org/healthy-lifestyle/stress-management/basics/stress-basics/hlv-20049495"
                },
                {
                  title: "Building Emotional Resilience",
                  link: "https://www.apa.org/topics/resilience"
                }
              ]}
            />

            <ResourceCard
              icon={<Sun className="h-6 w-6 text-yellow-500" />}
              title="Positive Psychology"
              description="Explore the science of happiness and learn ways to enhance your psychological well-being."
              articles={[
                {
                  title: "The Science of Happiness",
                  link: "https://www.psychologytoday.com/us/basics/happiness"
                },
                {
                  title: "Practicing Gratitude",
                  link: "https://greatergood.berkeley.edu/topic/gratitude"
                }
              ]}
            />

            <ResourceCard
              icon={<Moon className="h-6 w-6 text-indigo-400" />}
              title="Sleep and Mental Health"
              description="Understand the connection between sleep and mental health, and learn how to improve your sleep quality."
              articles={[
                {
                  title: "Sleep Hygiene Guide",
                  link: "https://www.sleepfoundation.org/sleep-hygiene"
                },
                {
                  title: "Sleep and Mental Health Connection",
                  link: "https://www.health.harvard.edu/newsletter_article/sleep-and-mental-health"
                }
              ]}
            />

            <ResourceCard
              icon={<Music className="h-6 w-6 text-purple-500" />}
              title="Therapeutic Activities"
              description="Discover creative and therapeutic activities that can help improve your mental well-being."
              articles={[
                {
                  title: "Art Therapy Techniques",
                  link: "https://www.goodtherapy.org/learn-about-therapy/types/art-therapy"
                },
                {
                  title: "Music and Mental Health",
                  link: "https://www.musictherapy.org/about/musictherapy/"
                }
              ]}
            />

            <ResourceCard
              icon={<Users className="h-6 w-6 text-green-500" />}
              title="Building Support Systems"
              description="Learn how to build and maintain healthy relationships and support networks."
              articles={[
                {
                  title: "Creating Meaningful Connections",
                  link: "https://www.psychologytoday.com/us/basics/relationships"
                },
                {
                  title: "Supporting Loved Ones",
                  link: "https://www.nami.org/Your-Journey/Family-Members-and-Caregivers"
                }
              ]}
            />

            <ResourceCard
              icon={<BookOpen className="h-6 w-6 text-blue-500" />}
              title="Educational Resources"
              description="Access educational materials and research about mental health and wellness."
              articles={[
                {
                  title: "Mental Health Research",
                  link: "https://www.nimh.nih.gov/research"
                },
                {
                  title: "Understanding Treatment Options",
                  link: "https://www.samhsa.gov/treatment"
                }
              ]}
            />
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Daily Inspiration</h2>
            <div className="space-y-4">
              <blockquote className="italic text-muted-foreground">
                "The greatest glory in living lies not in never falling, but in rising every time we fall."
                <footer className="mt-2 font-medium">- Nelson Mandela</footer>
              </blockquote>
              <blockquote className="italic text-muted-foreground">
                "You don't have to control your thoughts. You just have to stop letting them control you."
                <footer className="mt-2 font-medium">- Dan Millman</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Article {
  title: string;
  link: string;
}

interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  articles: Article[];
}

const ResourceCard: React.FC<ResourceCardProps> = ({ icon, title, description, articles }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-card p-6 rounded-lg border border-border"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="space-y-2">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-primary hover:text-primary/80 font-medium"
          >
            {article.title} →
          </a>
        ))}
      </div>
    </motion.div>
  );
};

export default Resources;