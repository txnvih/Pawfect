import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    const { error } = await signUp(formData.email, formData.password, formData.name);
    setLoading(false);

    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Sign Up</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <div>
              <Input
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="h-14 bg-accent/50 border-0 text-base"
              />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Or sign up with</p>
            <div className="flex justify-center gap-4">
              <button className="w-12 h-12 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <span className="font-bold text-lg">f</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                <span className="font-bold text-lg text-[#DB4437]">G</span>
              </button>
              <button className="w-12 h-12 rounded-full bg-[#1DA1F2] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
                <span className="font-bold text-lg">T</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-primary text-lg mb-2">Already have an account?</p>
            <Link to="/login" className="text-primary font-semibold text-lg underline hover:no-underline">
              Log In Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
