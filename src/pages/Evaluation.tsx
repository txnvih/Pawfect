import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Users, ClipboardList, Download, Save, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface HeuristicRating {
  rating: string;
  notes: string;
  checked: boolean;
}

interface CognitiveStep {
  completed: boolean;
  notes: string;
}

interface UsabilityTest {
  id: string;
  participant: string;
  scenario: string;
  timeToComplete: string;
  clicks: number;
  success: boolean;
  notes: string;
}

const Evaluation = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [evaluatorName, setEvaluatorName] = useState("");
  
  useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to save evaluations.",
        variant: "destructive",
      });
    }
  }, [user, toast]);
  
  // Heuristic Evaluation State
  const [heuristics, setHeuristics] = useState<Record<number, HeuristicRating>>({
    1: { rating: "good", notes: "Active navigation states clearly indicate current page location.", checked: false },
    2: { rating: "excellent", notes: "Pet adoption terminology is familiar and intuitive.", checked: false },
    3: { rating: "good", notes: "Clear navigation allows users to move freely between sections.", checked: false },
    4: { rating: "excellent", notes: "Consistent design system with unified color palette.", checked: false },
    5: { rating: "good", notes: "Form validation prevents submission of empty fields.", checked: false },
    6: { rating: "excellent", notes: "Visual icons and clear labels reduce memory load.", checked: false },
    7: { rating: "good", notes: "Quick search bar on homepage provides efficient access.", checked: false },
    8: { rating: "excellent", notes: "Clean, warm design with purposeful use of space.", checked: false },
    9: { rating: "good", notes: "Error messages are clear and descriptive.", checked: false },
    10: { rating: "needs-improvement", notes: "Contact page provides support access.", checked: false },
  });

  // Cognitive Walkthrough State
  const [cognitiveSteps, setCognitiveSteps] = useState<Record<string, CognitiveStep>>({
    "task1-1": { completed: false, notes: "Clear hero image with pets immediately establishes purpose" },
    "task1-2": { completed: false, notes: "Multiple entry points: search bar, Browse All Pets button" },
    "task1-3": { completed: false, notes: "Click action is obvious on highlighted buttons" },
    "task1-4": { completed: false, notes: "Grid layout makes scanning easy" },
    "task2-1": { completed: false, notes: "Contact Us link visible in main navigation" },
    "task2-2": { completed: false, notes: "Form is immediately visible with clear labels" },
    "task2-3": { completed: false, notes: "Form fields are large and touch-friendly" },
    "task2-4": { completed: false, notes: "Large Send Message button is obvious" },
    "task3-1": { completed: false, notes: "Login button prominent in navigation" },
    "task3-2": { completed: false, notes: "Don't have an account? Sign Up Here clearly visible" },
    "task3-3": { completed: false, notes: "Form is simple with only essential fields" },
    "task3-4": { completed: false, notes: "Social login options provide alternatives" },
  });

  // Usability Testing State
  const [usabilityTests, setUsabilityTests] = useState<UsabilityTest[]>([]);
  const [newTest, setNewTest] = useState<UsabilityTest>({
    id: "",
    participant: "",
    scenario: "pet-discovery",
    timeToComplete: "",
    clicks: 0,
    success: false,
    notes: "",
  });

  const heuristicNames = [
    "Visibility of System Status",
    "Match Between System and Real World",
    "User Control and Freedom",
    "Consistency and Standards",
    "Error Prevention",
    "Recognition Rather Than Recall",
    "Flexibility and Efficiency of Use",
    "Aesthetic and Minimalist Design",
    "Help Users Recognize, Diagnose, and Recover from Errors",
    "Help and Documentation",
  ];

  const calculateProgress = (type: string) => {
    if (type === "heuristic") {
      const completed = Object.values(heuristics).filter(h => h.checked).length;
      return (completed / 10) * 100;
    }
    if (type === "cognitive") {
      const completed = Object.values(cognitiveSteps).filter(s => s.completed).length;
      return (completed / 12) * 100;
    }
    return 0;
  };

  const updateHeuristic = (index: number, field: keyof HeuristicRating, value: any) => {
    setHeuristics(prev => ({
      ...prev,
      [index]: { ...prev[index], [field]: value }
    }));
  };

  const updateCognitiveStep = (key: string, field: keyof CognitiveStep, value: any) => {
    setCognitiveSteps(prev => ({
      ...prev,
      [key]: { ...prev[key], [field]: value }
    }));
  };

  const addUsabilityTest = () => {
    if (!newTest.participant || !newTest.timeToComplete) {
      toast({
        title: "Missing Information",
        description: "Please fill in participant name and completion time.",
        variant: "destructive",
      });
      return;
    }
    
    setUsabilityTests(prev => [...prev, { ...newTest, id: Date.now().toString() }]);
    setNewTest({
      id: "",
      participant: "",
      scenario: "pet-discovery",
      timeToComplete: "",
      clicks: 0,
      success: false,
      notes: "",
    });
    
    toast({
      title: "Test Added",
      description: "Usability test has been recorded.",
    });
  };

  const deleteUsabilityTest = (id: string) => {
    setUsabilityTests(prev => prev.filter(test => test.id !== id));
  };

  const saveEvaluation = async () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save your evaluation.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!evaluatorName.trim()) {
      toast({
        title: "Evaluator Name Required",
        description: "Please enter your name before saving.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Save heuristic evaluation
      const { error: heuristicError } = await supabase
        .from("heuristic_evaluations")
        .insert({
          user_id: user.id,
          evaluator_name: evaluatorName,
          heuristics: heuristics as any,
          overall_notes: "",
        } as any);

      if (heuristicError) throw heuristicError;

      // Save cognitive walkthrough
      const { error: cognitiveError } = await supabase
        .from("cognitive_walkthroughs")
        .insert({
          user_id: user.id,
          evaluator_name: evaluatorName,
          tasks: cognitiveSteps as any,
          overall_notes: "",
        } as any);

      if (cognitiveError) throw cognitiveError;

      // Save usability tests if any exist
      if (usabilityTests.length > 0) {
        const { error: usabilityError } = await supabase
          .from("usability_tests")
          .insert({
            user_id: user.id,
            participant_info: { evaluator: evaluatorName } as any,
            test_scenarios: usabilityTests.map(t => t.scenario) as any,
            findings: usabilityTests as any,
            overall_notes: "",
          } as any);

        if (usabilityError) throw usabilityError;
      }

      toast({
        title: "Evaluation Saved",
        description: "Your evaluation has been saved to the database.",
      });
    } catch (error: any) {
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save evaluation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportEvaluation = () => {
    const evaluation = {
      heuristics,
      cognitiveSteps,
      usabilityTests,
      timestamp: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(evaluation, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pawfect-evaluation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Evaluation Exported",
      description: "Your evaluation has been downloaded.",
    });
  };

  const getRatingBadge = (rating: string) => {
    switch (rating) {
      case "excellent":
        return <Badge variant="default" className="bg-green-500">Excellent</Badge>;
      case "good":
        return <Badge variant="default">Good</Badge>;
      case "needs-improvement":
        return <Badge variant="secondary">Needs Improvement</Badge>;
      case "poor":
        return <Badge variant="destructive">Poor</Badge>;
      default:
        return <Badge variant="outline">Not Rated</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                HCI Evaluation Framework
              </h1>
              <p className="text-lg text-muted-foreground">
                Interactive evaluation of Pawfect using industry-standard HCI techniques
              </p>
              <div className="mt-4">
                <Label htmlFor="evaluator-name">Evaluator Name</Label>
                <Input
                  id="evaluator-name"
                  placeholder="Enter your name"
                  value={evaluatorName}
                  onChange={(e) => setEvaluatorName(e.target.value)}
                  className="max-w-md mt-1"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button onClick={saveEvaluation} variant="outline" disabled={loading || !user}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "Saving..." : "Save to DB"}
              </Button>
              <Button onClick={exportEvaluation}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Tabs defaultValue="heuristic" className="space-y-8">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
              <TabsTrigger value="heuristic" className="py-4">
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Heuristic Evaluation
              </TabsTrigger>
              <TabsTrigger value="cognitive" className="py-4">
                <ClipboardList className="mr-2 h-4 w-4" />
                Cognitive Walkthrough
              </TabsTrigger>
              <TabsTrigger value="usability" className="py-4">
                <Users className="mr-2 h-4 w-4" />
                Usability Testing
              </TabsTrigger>
            </TabsList>

            {/* Heuristic Evaluation */}
            <TabsContent value="heuristic" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Nielsen's 10 Usability Heuristics</CardTitle>
                      <CardDescription>
                        Evaluate based on Jakob Nielsen's usability principles
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-2xl font-bold text-primary">{Math.round(calculateProgress("heuristic"))}%</p>
                    </div>
                  </div>
                  <Progress value={calculateProgress("heuristic")} className="mt-4" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <div key={num} className="border rounded-lg p-4 space-y-4">
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={`heuristic-${num}`}
                          checked={heuristics[num].checked}
                          onCheckedChange={(checked) => updateHeuristic(num, "checked", checked)}
                        />
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor={`heuristic-${num}`} className="text-base font-semibold cursor-pointer">
                              {num}. {heuristicNames[num - 1]}
                            </Label>
                            {getRatingBadge(heuristics[num].rating)}
                          </div>
                          
                          <RadioGroup
                            value={heuristics[num].rating}
                            onValueChange={(value) => updateHeuristic(num, "rating", value)}
                            className="flex gap-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="excellent" id={`${num}-excellent`} />
                              <Label htmlFor={`${num}-excellent`} className="cursor-pointer">Excellent</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="good" id={`${num}-good`} />
                              <Label htmlFor={`${num}-good`} className="cursor-pointer">Good</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="needs-improvement" id={`${num}-needs`} />
                              <Label htmlFor={`${num}-needs`} className="cursor-pointer">Needs Improvement</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="poor" id={`${num}-poor`} />
                              <Label htmlFor={`${num}-poor`} className="cursor-pointer">Poor</Label>
                            </div>
                          </RadioGroup>
                          
                          <Textarea
                            placeholder="Add your findings and notes here..."
                            value={heuristics[num].notes}
                            onChange={(e) => updateHeuristic(num, "notes", e.target.value)}
                            className="min-h-20"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cognitive Walkthrough */}
            <TabsContent value="cognitive" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Task-Based User Journey Analysis</CardTitle>
                      <CardDescription>
                        Step-by-step evaluation of common user tasks
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Progress</p>
                      <p className="text-2xl font-bold text-primary">{Math.round(calculateProgress("cognitive"))}%</p>
                    </div>
                  </div>
                  <Progress value={calculateProgress("cognitive")} className="mt-4" />
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 1: Finding and Viewing a Pet</h3>
                    
                    {["task1-1", "task1-2", "task1-3", "task1-4"].map((key, idx) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={key}
                            checked={cognitiveSteps[key].completed}
                            onCheckedChange={(checked) => updateCognitiveStep(key, "completed", checked)}
                          />
                          <div className="flex-1 space-y-3">
                            <Label htmlFor={key} className="cursor-pointer font-medium">
                              Step {idx + 1}: {
                                idx === 0 ? "User lands on homepage" :
                                idx === 1 ? "User identifies how to browse pets" :
                                idx === 2 ? "User navigates to Browse page" :
                                "User views available pets"
                              }
                            </Label>
                            <Textarea
                              placeholder="Add observations and findings..."
                              value={cognitiveSteps[key].notes}
                              onChange={(e) => updateCognitiveStep(key, "notes", e.target.value)}
                              className="min-h-20"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 2: Contacting About a Pet</h3>
                    
                    {["task2-1", "task2-2", "task2-3", "task2-4"].map((key, idx) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={key}
                            checked={cognitiveSteps[key].completed}
                            onCheckedChange={(checked) => updateCognitiveStep(key, "completed", checked)}
                          />
                          <div className="flex-1 space-y-3">
                            <Label htmlFor={key} className="cursor-pointer font-medium">
                              Step {idx + 1}: {
                                idx === 0 ? "User wants to inquire about a pet" :
                                idx === 1 ? "User navigates to contact page" :
                                idx === 2 ? "User fills out form" :
                                "User submits message"
                              }
                            </Label>
                            <Textarea
                              placeholder="Add observations and findings..."
                              value={cognitiveSteps[key].notes}
                              onChange={(e) => updateCognitiveStep(key, "notes", e.target.value)}
                              className="min-h-20"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 3: Creating an Account</h3>
                    
                    {["task3-1", "task3-2", "task3-3", "task3-4"].map((key, idx) => (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={key}
                            checked={cognitiveSteps[key].completed}
                            onCheckedChange={(checked) => updateCognitiveStep(key, "completed", checked)}
                          />
                          <div className="flex-1 space-y-3">
                            <Label htmlFor={key} className="cursor-pointer font-medium">
                              Step {idx + 1}: {
                                idx === 0 ? "User wants to save favorite pets" :
                                idx === 1 ? "User realizes they need to sign up" :
                                idx === 2 ? "User fills signup form" :
                                "User completes signup"
                              }
                            </Label>
                            <Textarea
                              placeholder="Add observations and findings..."
                              value={cognitiveSteps[key].notes}
                              onChange={(e) => updateCognitiveStep(key, "notes", e.target.value)}
                              className="min-h-20"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usability Testing */}
            <TabsContent value="usability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Usability Test</CardTitle>
                  <CardDescription>
                    Record observations from user testing sessions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="participant">Participant Name/ID</Label>
                      <Input
                        id="participant"
                        placeholder="e.g., Participant 1"
                        value={newTest.participant}
                        onChange={(e) => setNewTest({ ...newTest, participant: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scenario">Test Scenario</Label>
                      <select
                        id="scenario"
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={newTest.scenario}
                        onChange={(e) => setNewTest({ ...newTest, scenario: e.target.value })}
                      >
                        <option value="pet-discovery">Pet Discovery</option>
                        <option value="contact-inquiry">Contact Inquiry</option>
                        <option value="account-creation">Account Creation</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="time">Time to Complete (seconds)</Label>
                      <Input
                        id="time"
                        type="number"
                        placeholder="e.g., 45"
                        value={newTest.timeToComplete}
                        onChange={(e) => setNewTest({ ...newTest, timeToComplete: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="clicks">Number of Clicks</Label>
                      <Input
                        id="clicks"
                        type="number"
                        placeholder="e.g., 3"
                        value={newTest.clicks}
                        onChange={(e) => setNewTest({ ...newTest, clicks: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="success"
                      checked={newTest.success}
                      onCheckedChange={(checked) => setNewTest({ ...newTest, success: checked as boolean })}
                    />
                    <Label htmlFor="success" className="cursor-pointer">Task completed successfully</Label>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Observations & Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Record user behavior, comments, difficulties, and insights..."
                      value={newTest.notes}
                      onChange={(e) => setNewTest({ ...newTest, notes: e.target.value })}
                      className="min-h-24"
                    />
                  </div>
                  
                  <Button onClick={addUsabilityTest} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Test Record
                  </Button>
                </CardContent>
              </Card>

              {usabilityTests.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Recorded Tests ({usabilityTests.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {usabilityTests.map((test) => (
                      <div key={test.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{test.participant}</h4>
                            <p className="text-sm text-muted-foreground capitalize">
                              {test.scenario.replace("-", " ")}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteUsabilityTest(test.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Time</p>
                            <p className="font-medium">{test.timeToComplete}s</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Clicks</p>
                            <p className="font-medium">{test.clicks}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <Badge variant={test.success ? "default" : "destructive"}>
                              {test.success ? "Success" : "Failed"}
                            </Badge>
                          </div>
                        </div>
                        
                        {test.notes && (
                          <div className="bg-accent/50 rounded p-3">
                            <p className="text-sm">{test.notes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Evaluation;