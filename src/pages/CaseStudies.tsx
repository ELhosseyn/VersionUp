import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Clock, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CaseStudies = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      id: 1,
      title: "Healthcare Training Revolution",
      industry: "Healthcare",
      company: "MedTech Solutions",
      description: "Implemented VR training for surgical procedures, reducing training costs by 60% and improving skill acquisition by 3x.",
      metrics: [
        { icon: TrendingUp, label: "60% cost reduction", value: "60%" },
        { icon: Users, label: "3x faster learning", value: "3x" },
        { icon: Award, label: "95% satisfaction", value: "95%" }
      ],
      image: "/api/placeholder/400/250",
      fullStory: "MedTech Solutions needed to train hundreds of medical professionals on complex surgical procedures. Traditional methods were expensive and time-consuming. Our VR platform allowed for realistic simulations that could be repeated endlessly, leading to better outcomes and significant cost savings."
    },
    {
      id: 2,
      title: "Manufacturing Safety Excellence",
      industry: "Manufacturing",
      company: "AutoCorp Industries",
      description: "VR safety training reduced workplace accidents by 75% and cut onboarding time from 3 weeks to 1 week.",
      metrics: [
        { icon: TrendingUp, label: "75% fewer accidents", value: "75%" },
        { icon: Clock, label: "2 weeks faster onboarding", value: "2w" },
        { icon: Users, label: "500+ trained employees", value: "500+" }
      ],
      image: "/api/placeholder/400/250",
      fullStory: "AutoCorp faced high accident rates and long training periods. Our immersive VR training created realistic hazardous scenarios without real risk, allowing employees to learn safely and efficiently."
    },
    {
      id: 3,
      title: "Military Tactical Training",
      industry: "Military",
      company: "Defense Academy",
      description: "Advanced VR simulations improved tactical decision-making by 40% and reduced live training costs by 50%.",
      metrics: [
        { icon: TrendingUp, label: "40% better decisions", value: "40%" },
        { icon: TrendingUp, label: "50% cost savings", value: "50%" },
        { icon: Award, label: "Top-rated program", value: "⭐⭐⭐⭐⭐" }
      ],
      image: "/api/placeholder/400/250",
      fullStory: "The Defense Academy required high-fidelity training for complex tactical scenarios. Our VR platform provided customizable environments that could simulate various combat situations, enhancing soldier preparedness."
    },
    {
      id: 4,
      title: "Education Innovation",
      industry: "Education",
      company: "Global University",
      description: "Interactive VR lessons increased student engagement by 85% and improved retention rates by 30%.",
      metrics: [
        { icon: Users, label: "85% more engagement", value: "85%" },
        { icon: TrendingUp, label: "30% better retention", value: "30%" },
        { icon: Award, label: "Award-winning program", value: "🏆" }
      ],
      image: "/api/placeholder/400/250",
      fullStory: "Global University sought to modernize their curriculum. Our VR platform transformed traditional lectures into immersive experiences, making learning more interactive and memorable for students."
    },
    {
      id: 5,
      title: "Retail Customer Service",
      industry: "Retail",
      company: "ShopSmart Chain",
      description: "VR training for customer service scenarios improved employee confidence and customer satisfaction scores by 25%.",
      metrics: [
        { icon: TrendingUp, label: "25% higher satisfaction", value: "25%" },
        { icon: Users, label: "2000+ trained staff", value: "2000+" },
        { icon: Clock, label: "50% faster training", value: "50%" }
      ],
      image: "/api/placeholder/400/250",
      fullStory: "ShopSmart needed to standardize customer service training across hundreds of locations. VR simulations allowed employees to practice various customer interactions in a controlled, repeatable environment."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)]" />
        
        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge variant="secondary" className="mb-4">
              {t("caseStudies.metrics")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("caseStudies.title")}
              <span className="text-primary block mt-2">{t("caseStudies.subtitle")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("caseStudies.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{study.industry}</Badge>
                      <span className="text-sm text-muted-foreground">{study.company}</span>
                    </div>
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <CardDescription>{study.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      {study.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <metric.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium">{metric.value}</span>
                          <span className="text-sm text-muted-foreground">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {t("caseStudies.readFullCase")}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t("caseStudies.ctaTitle")}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("caseStudies.ctaDescription")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  {t("caseStudies.ctaPrimary")}
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                {t("caseStudies.ctaSecondary")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudies;