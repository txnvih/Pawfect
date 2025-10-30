import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">Contact Us</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <div>
              <Textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="min-h-[150px] bg-accent/50 border-0 text-base resize-none"
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>

          <div className="mt-12 text-center text-muted-foreground">
            <p>Or reach us directly:</p>
            <p className="mt-2">
              <a href="mailto:hello@petconnect.com" className="text-primary hover:underline">
                hello@petconnect.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
