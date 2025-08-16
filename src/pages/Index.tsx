import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Smartphone, Watch, Package, ArrowRight, Zap, Shield, Users, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="hero-gradient absolute inset-0 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              <span className="text-transparent bg-clip-text cta-gradient">
                Reunite
              </span>
              {" "}with Your Lost Items
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Report lost items or browse found ones on your campus. Our smart matching system helps you reconnect with your belongings quickly and safely.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
                <Link to="/report">
                  Report an Item
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/80 backdrop-blur">
                <Link to="/#browse">
                  View Items
                </Link>
              </Button>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search by item name, location, or upload photo…"
                className="pl-12 py-6 text-lg rounded-2xl border-2 shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: BookOpen, label: "Books", color: "bg-mint" },
              { icon: Smartphone, label: "Electronics", color: "bg-lavender" },
              { icon: Watch, label: "Accessories", color: "bg-peach" },
              { icon: Package, label: "Others", color: "bg-mint" }
            ].map((category, index) => (
              <Card key={index} className="card-gradient border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`${category.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.label}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Post",
                description: "Upload a photo and description of your lost or found item in seconds."
              },
              {
                step: "2", 
                title: "Match",
                description: "Our AI automatically matches lost and found items using visual recognition."
              },
              {
                step: "3",
                title: "Reunite",
                description: "Connect safely and anonymously to reunite with your belongings."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full cta-gradient text-white font-bold text-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Reunite Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Reunite?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Zap,
                title: "AI-powered",
                description: "Smart matching technology that understands your items visually."
              },
              {
                icon: Shield,
                title: "Safe & Anonymous", 
                description: "Connect securely without sharing personal information until you're ready."
              },
              {
                icon: Users,
                title: "Community-driven",
                description: "Built for students, by students. Help your campus community thrive."
              },
              {
                icon: Heart,
                title: "Free to use",
                description: "No hidden fees, no premium plans. Just pure reuniting goodness."
              }
            ].map((feature, index) => (
              <Card key={index} className="card-gradient border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "Found my lost laptop within 2 hours! The AI matching is incredible.",
                name: "Sarah Chen",
                school: "Stanford University"
              },
              {
                quote: "Super easy to use and actually works. Reunited with my textbooks before finals!",
                name: "Marcus Rodriguez", 
                school: "UCLA"
              },
              {
                quote: "Love how safe and anonymous it feels. Perfect for our campus community.",
                name: "Emma Thompson",
                school: "MIT"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-md">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic mb-6 text-lg leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-lg">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.school}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Don't let lost things stay lost.
            <span className="block text-transparent bg-clip-text cta-gradient">
              Reunite today.
            </span>
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of students already reuniting with their belongings.
          </p>
          <Button asChild variant="hero" size="lg" className="text-xl px-12 py-8">
            <Link to="/report?type=lost">
              Get Started Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6">Reunite</h3>
            <div className="flex flex-wrap justify-center gap-8 mb-8">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy</a>
            </div>
            <p className="text-muted-foreground">
              © 2024 Reunite. Made with ❤️ for campus communities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;