import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Clock, ArrowLeft, Share2, Bookmark, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

// Mock blog posts data - in production this would come from Supabase
const blogPosts = [
  {
    id: 1,
    slug: "vr-training-healthcare-revolution",
    title: "The VR Training Revolution in Healthcare",
    excerpt: "How immersive VR technology is transforming medical education and patient care through realistic simulations and hands-on learning experiences.",
    content: `
# The VR Training Revolution in Healthcare

## Introduction

Virtual Reality (VR) technology has emerged as a game-changer in medical education and training. By creating immersive, realistic environments, VR allows healthcare professionals to practice complex procedures without risking patient safety.

## The Current Landscape

Traditional medical training methods often rely on:
- Classroom lectures
- Cadaver-based training
- Live patient interactions under supervision

While these methods are valuable, they come with limitations including:
- Limited hands-on practice opportunities
- Safety concerns for live patients
- High costs associated with specialized equipment

## VR Solutions in Healthcare

### Surgical Training
VR simulations provide surgeons with:
- Realistic anatomical models
- Force feedback for tactile learning
- Step-by-step procedure guidance
- Performance analytics and feedback

### Emergency Response Training
Medical teams can practice:
- Trauma response scenarios
- Mass casualty incidents
- Rare emergency situations
- Team coordination exercises

### Patient Care Training
Healthcare workers learn:
- Bedside manner and communication
- Medication administration
- Patient assessment techniques
- Cultural competency

## Benefits of VR Training

### Improved Learning Outcomes
- **Retention**: Studies show 75% better retention compared to traditional methods
- **Skill Development**: Hands-on practice without real-world consequences
- **Confidence Building**: Safe environment to make and learn from mistakes

### Cost Effectiveness
- **Reduced Training Costs**: Up to 60% savings on training expenses
- **Scalability**: Train unlimited number of learners simultaneously
- **No Consumables**: Digital training materials don't wear out

### Enhanced Safety
- **Patient Safety**: Practice on virtual patients before real interactions
- **Standardization**: Consistent training across all learners
- **Accessibility**: Train in any location, anytime

## Implementation Challenges

### Technology Adoption
- Initial investment in VR equipment
- Staff training on new technology
- Integration with existing training programs

### Content Development
- Creating medically accurate simulations
- Regular updates to reflect current best practices
- Customization for different specialties

## Future of VR in Healthcare

The future looks promising with:
- **AI Integration**: Intelligent tutoring systems
- **Haptic Feedback**: Advanced tactile sensations
- **AR Integration**: Augmented reality overlays in real procedures
- **Remote Training**: Global collaboration and knowledge sharing

## Conclusion

VR training is not just a technological novelty—it's a fundamental shift in how we approach medical education. As the technology continues to mature and become more accessible, we can expect to see widespread adoption across healthcare institutions worldwide.

The result will be better-trained healthcare professionals, improved patient outcomes, and more efficient healthcare delivery systems.
    `,
    category: "vr-tech-guides",
    categoryName: "VR Tech Guides",
    author: "Dr. Sarah Chen",
    date: "2025-11-20",
    readTime: "5 min read",
    tags: ["VR", "Healthcare", "Medical Training"],
    featured: true,
    image: "/api/placeholder/800/400"
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
    image: "/api/placeholder/800/400"
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
    image: "/api/placeholder/800/400"
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    // Find the current post
    const currentPost = blogPosts.find(p => p.slug === slug);
    setPost(currentPost);

    if (currentPost) {
      // Find related posts (same category, different post)
      const related = blogPosts.filter(p =>
        p.category === currentPost.category && p.id !== currentPost.id
      ).slice(0, 3);
      setRelatedPosts(related);

      // Load saved state from localStorage
      const savedBookmark = localStorage.getItem(`bookmark-${currentPost.id}`);
      const savedLikes = localStorage.getItem(`likes-${currentPost.id}`);
      setIsBookmarked(savedBookmark === 'true');
      setLikes(parseInt(savedLikes || '0'));
    }
  }, [slug]);

  const handleBookmark = () => {
    if (!post) return;
    const newBookmarkState = !isBookmarked;
    setIsBookmarked(newBookmarkState);
    localStorage.setItem(`bookmark-${post.id}`, newBookmarkState.toString());
    toast.success(newBookmarkState ? "Article bookmarked!" : "Bookmark removed");
  };

  const handleLike = () => {
    if (!post) return;
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${post.id}`, newLikes.toString());
    toast.success("Thanks for the feedback!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline">{post.categoryName}</Badge>
              <span className="text-sm text-muted-foreground">{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span>{new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleBookmark}>
                  <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <ThumbsUp className="w-4 h-4" />
                  <span className="ml-1">{likes}</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, '<br>')
                .replace(/^# (.+)$/gm, '<h1>$1</h1>')
                .replace(/^## (.+)$/gm, '<h2>$1</h2>')
                .replace(/^### (.+)$/gm, '<h3>$1</h3>')
                .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                .replace(/\*(.+?)\*/g, '<em>$1</em>')
            }}
          />
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 border-t border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all duration-300 group hover:shadow-lg hover:shadow-primary/10">
                    <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="outline" className="mb-2">{relatedPost.categoryName}</Badge>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        <Link to={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{relatedPost.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{relatedPost.author}</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get more insights like this delivered to your inbox. Subscribe to our newsletter for the latest VR training trends and best practices.
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 border border-border rounded-md bg-background"
              />
              <Button>Subscribe</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Join 5,000+ professionals staying ahead in VR training.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;