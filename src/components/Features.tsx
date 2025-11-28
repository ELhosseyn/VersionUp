import React, { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { Box, Brain, Globe, Zap, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const controls = useAnimation();

  const features = [
    {
      icon: Box,
      titleKey: "features.immersiveLearning.title",
      descriptionKey: "features.immersiveLearning.description",
    },
    {
      icon: Brain,
      titleKey: "features.realTimeCollaboration.title",
      descriptionKey: "features.realTimeCollaboration.description",
    },
    {
      icon: Globe,
      titleKey: "features.analytics.title",
      descriptionKey: "features.analytics.description",
    },
    {
      icon: Zap,
      titleKey: "features.customContent.title",
      descriptionKey: "features.customContent.description",
    },
    {
      icon: BookOpen,
      titleKey: "features.integration.title",
      descriptionKey: "features.integration.description",
      link: "/blog",
      linkTextKey: "hero.ctaSecondary",
    },
  ];

  // Create duplicated array for seamless infinite loop
  const duplicatedFeatures = [...features, ...features, ...features];

  // Start auto-scroll animation
  React.useEffect(() => {
    if (!isHovered) {
      controls.start({
        x: [0, -100 * features.length],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        },
      });
    } else {
      controls.stop();
    }
  }, [isHovered, controls, features.length]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('features.title')}
            <span className="text-glow"> {t('features.subtitle')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>
        
        {/* Interactive Horizontal Scrolling Cards */}
        <div 
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex gap-6"
            style={{ x }}
            animate={controls}
            drag="x"
            dragConstraints={{ left: -200, right: 200 }}
            dragElastic={0.1}
            onDragStart={() => setIsHovered(true)}
            onDragEnd={() => setIsHovered(false)}
            whileTap={{ cursor: "grabbing" }}
          >
            {duplicatedFeatures.map((feature, index) => (
              <motion.div
                key={`${feature.titleKey}-${index}`}
                className="flex-shrink-0 w-80"
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % features.length) * 0.1 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 relative overflow-hidden group">
                  {/* Animated background gradient on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  
                  <div className="p-6 relative z-10">
                    <motion.div 
                      className="mb-4 inline-block p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors"
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <feature.icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-bold mb-2 group-hover:text-primary transition-colors"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t(feature.titleKey)}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-muted-foreground mb-4"
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {t(feature.descriptionKey)}
                    </motion.p>
                    
                    {feature.link && (
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link to={feature.link}>
                          <span className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                            {t(feature.linkTextKey)} →
                          </span>
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Interaction Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            {isHovered ? "🎯 Drag to explore • Auto-scroll paused" : "🔄 Auto-scrolling • Hover to interact"}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
