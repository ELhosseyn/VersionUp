import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Calendar, User, ArrowRight, BookOpen, TrendingUp, Users, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Mock blog posts data - in production this would come from Supabase
const blogPosts = [
  {
    id: 1,
    slug: "vr-training-healthcare-revolution",
    title: "The VR Training Revolution in Healthcare",
    excerpt: "How immersive VR technology is transforming medical education and patient care through realistic simulations and hands-on learning experiences.",
    content: "Full article content here...",
    category: "vr-tech-guides",
    categoryName: "VR Tech Guides",
    author: "Dr. Sarah Chen",
    date: "2025-11-20",
    readTime: "5 min read",
    tags: ["VR", "Healthcare", "Medical Training"],
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: 2,
    slug: "industry-trends-2025",
    title: "VR/AR Industry Trends for 2025",
    excerpt: "Exploring the latest developments in virtual and augmented reality technology and their impact on enterprise training and education.",
    content: "Full article content here...",
    category: "industry-trends",
    categoryName: "Industry Trends",
    author: "Mike Rodriguez",
    date: "2025-11-18",
    readTime: "7 min read",
    tags: ["AR", "Trends", "Enterprise"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: 3,
    slug: "customer-success-manufacturing",
    title: "How AutoCorp Reduced Training Costs by 60%",
    excerpt: "A detailed case study on how a leading automotive manufacturer implemented VR training to improve safety and reduce operational costs.",
    content: "Full article content here...",
    category: "customer-stories",
    categoryName: "Customer Stories",
    author: "Jennifer Liu",
    date: "2025-11-15",
    readTime: "6 min read",
    tags: ["Manufacturing", "Cost Savings", "Safety"],
    featured: true,
    image: "/api/placeholder/600/300"
  },
  {
    id: 4,
    slug: "getting-started-vr-content",
    title: "Getting Started: Creating Your First VR Training Module",
    excerpt: "A step-by-step guide for organizations looking to create their own VR training content, from planning to deployment.",
    content: "Full article content here...",
    category: "how-tos",
    categoryName: "How-Tos",
    author: "Alex Thompson",
    date: "2025-11-12",
    readTime: "8 min read",
    tags: ["Tutorial", "Content Creation", "Best Practices"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: 5,
    slug: "military-vr-applications",
    title: "VR in Military Training: Preparing for the Future",
    excerpt: "How defense organizations are using VR technology to enhance tactical training, reduce costs, and improve soldier preparedness.",
    content: "Full article content here...",
    category: "customer-stories",
    categoryName: "Customer Stories",
    author: "Colonel David Park",
    date: "2025-11-10",
    readTime: "9 min read",
    tags: ["Military", "Tactical Training", "Defense"],
    featured: false,
    image: "/api/placeholder/600/300"
  },
  {
    id: 6,
    slug: "vr-accessibility-education",
    title: "Making VR Training Accessible to All Learners",
    excerpt: "Strategies for creating inclusive VR training experiences that accommodate different learning styles and accessibility needs.",
    content: "Full article content here...",
    category: "vr-tech-guides",
    categoryName: "VR Tech Guides",
    author: "Dr. Maria Gonzalez",
    date: "2025-11-08",
    readTime: "6 min read",
    tags: ["Accessibility", "Education", "Inclusive Design"],
    featured: false,
    image: "/api/placeholder/600/300"
  }
];

const categories = [
  { id: "all", name: "All Posts", icon: BookOpen, count: blogPosts.length },
  { id: "vr-tech-guides", name: "VR Tech Guides", icon: Wrench, count: blogPosts.filter(p => p.category === "vr-tech-guides").length },
  { id: "industry-trends", name: "Industry Trends", icon: TrendingUp, count: blogPosts.filter(p => p.category === "industry-trends").length },
  { id: "customer-stories", name: "Customer Stories", icon: Users, count: blogPosts.filter(p => p.category === "customer-stories").length },
  { id: "how-tos", name: "How-Tos", icon: BookOpen, count: blogPosts.filter(p => p.category === "how-tos").length }
];

const Blog = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "featured":
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredPosts = blogPosts.filter(post => post.featured);

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
              {t("blog.title")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {t("blog.subtitle")}
              <span className="text-primary block mt-2">{t("blog.subtitleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("blog.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">{t("blog.featured")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.categoryName}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription>{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {post.author}
                          <Calendar className="w-4 h-4 ml-2" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${post.slug}`}>
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>

            {/* Categories and Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-5">
                    {categories.map((category) => (
                      <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                        <category.icon className="w-4 h-4" />
                        {category.name}
                        <Badge variant="secondary" className="ml-1">{category.count}</Badge>
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
              <div className="md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="featured">Featured First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{post.categoryName}</Badge>
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {post.author}
                          <Calendar className="w-4 h-4 ml-2" />
                          {new Date(post.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                        <Link to={`/blog/${post.slug}`}>
                          Read More
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {filteredAndSortedPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">{t("blog.newsletter.title")}</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("blog.newsletter.subtitle")}
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <Input
                placeholder={t("blog.newsletter.email")}
                type="email"
                className="flex-1"
              />
              <Button>{t("blog.newsletter.subscribe")}</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {t("blog.newsletter.subscribed")}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;