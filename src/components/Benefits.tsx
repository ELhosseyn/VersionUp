import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Benefits = () => {
  const { t } = useTranslation();

  const benefits = [
    t("benefits.noEquipment"),
    t("benefits.ownPace"),
    t("benefits.safeEnvironment"),
    t("benefits.aiAdapts"),
    t("benefits.unlimitedPractice"),
    t("benefits.instantFeedback"),
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]" />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t("benefits.title")}
              <span className="text-primary"> {t("benefits.subtitle")}</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              {t("benefits.description")}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 mb-16"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card/30 backdrop-blur border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-lg">{benefit}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              {t("cta.badge")}
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t("cta.title")}
              <span className="text-primary"> {t("cta.subtitle")}</span>
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="px-8">
                <Link to="/register">{t("cta.primaryButton")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link to="/demo">{t("cta.secondaryButton")}</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {t("cta.footer")}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
