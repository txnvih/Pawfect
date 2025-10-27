import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-pets.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <main className="relative">
        <div 
          className="relative h-[600px] md:h-[700px] bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
          
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-4 max-w-4xl">
              Find Your Perfect Companion
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Thousands of pets waiting for loving homes
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl bg-card/95 backdrop-blur-sm rounded-full p-2 shadow-[var(--card-shadow)] flex items-center gap-2">
              <Search className="ml-4 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by breed, age, or location"
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12"
              />
              <Link to="/browse">
                <Button size="lg" className="rounded-full">
                  Search
                </Button>
              </Link>
            </div>

            {/* Quick Links */}
            <div className="mt-12 flex flex-wrap gap-4 justify-center">
              <Link to="/browse">
                <Button variant="secondary" size="lg">
                  Browse All Pets
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🐕</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Find Your Match</h3>
              <p className="text-muted-foreground">
                Browse through our diverse collection of adorable pets waiting for a home
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Safe & Secure</h3>
              <p className="text-muted-foreground">
                All our pets are health-checked and ready for their forever homes
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏠</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Lifelong Support</h3>
              <p className="text-muted-foreground">
                Get ongoing support and guidance throughout your pet adoption journey
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
