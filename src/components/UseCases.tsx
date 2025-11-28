import { motion } from "framer-motion";
import { Building2, GraduationCap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const UseCases = () => {
  const { t } = useTranslation();

  const useCases = [
    {
      icon: Building2,
      title: t("useCases.industryTraining.title"),
      description: t("useCases.industryTraining.description"),
      examples: t("useCases.industryTraining.examples", { returnObjects: true }),
    },
    {
      icon: GraduationCap,
      title: t("useCases.education.title"),
      description: t("useCases.education.description"),
      examples: t("useCases.education.examples", { returnObjects: true }),
    },
  ];
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t("useCases.title")}
            <span className="text-primary"> {t("useCases.subtitle")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("useCases.description")}
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-card to-card/50 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="mb-6 inline-block p-4 rounded-2xl bg-primary/10">
                  <useCase.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3">
                  {useCase.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {useCase.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {useCase.examples.map((example) => (
                    <span
                      key={example}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;
