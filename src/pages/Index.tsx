import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, BookOpen, Smartphone, Watch, Package, ArrowRight, Zap, Shield, Users, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "@/utils/auth";

const Index = () => {
  const handleProtectedNavigation = (route: string) => {
    return isLoggedIn() ? route : '/login';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Login Button */}
      {!isLoggedIn() && (
        <header className="absolute top-0 right-0 z-20 p-6">
          <div className="flex gap-3">
            <Button asChild variant="outline" className="bg-white/80 backdrop-blur hover:bg-white/90 transition-all duration-300">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild variant="hero" className="shadow-lg">
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </header>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="hero-gradient absolute inset-0 opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Lost something? Found something?
              <span className="block text-transparent bg-clip-text cta-gradient">
                Let's Reunite.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              AI-powered Lost & Found for your campus. Post, match, and reconnect with your stuff in seconds.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild variant="hero" size="lg" className="text-lg px-8 py-6">
                <Link to={handleProtectedNavigation("/report-lost")}>
                  Report Lost Item
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 bg-white/80 backdrop-blur">
                <Link to={handleProtectedNavigation("/report-found")}>
                  Report Found Item
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
            <Link to={handleProtectedNavigation("/get-started")}>
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