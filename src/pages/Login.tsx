import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setLoading(true);
    const { error } = await signIn(formData.email, formData.password);
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
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8 text-center">Log In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                placeholder="Username or Email"
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

            <Button
              type="button"
              variant="ghost"
              className="w-full text-muted-foreground hover:text-primary"
            >
              Forgot Password?
            </Button>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">Or continue with</p>
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
            <p className="text-primary text-lg mb-2">Don't have a account?</p>
            <Link to="/signup" className="text-primary font-semibold text-lg underline hover:no-underline">
              Sign Up Here
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
