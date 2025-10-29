import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Users, ClipboardList } from "lucide-react";

const Evaluation = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            HCI Evaluation Framework
          </h1>
          <p className="text-lg text-muted-foreground mb-12">
            Comprehensive evaluation of Pawfect using industry-standard HCI techniques
          </p>

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
                  <CardTitle>Nielsen's 10 Usability Heuristics</CardTitle>
                  <CardDescription>
                    Evaluation based on Jakob Nielsen's usability principles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">1. Visibility of System Status</h3>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Active navigation states clearly indicate current page location. Toast notifications provide immediate feedback for user actions.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">2. Match Between System and Real World</h3>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Pet adoption terminology is familiar and intuitive. Icons (paw prints, animals) align with user mental models.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">3. User Control and Freedom</h3>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clear navigation allows users to move freely between sections. Mobile menu provides easy exit with X icon.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">4. Consistency and Standards</h3>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Consistent design system with unified color palette, rounded corners, and button styles throughout all pages.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">5. Error Prevention</h3>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Form validation prevents submission of empty fields. Clear input placeholders guide users on expected input format.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">6. Recognition Rather Than Recall</h3>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Visual icons and clear labels reduce memory load. Pet cards display all relevant information at a glance.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">7. Flexibility and Efficiency of Use</h3>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Quick search bar on homepage provides efficient access. Direct navigation links serve both new and experienced users.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">8. Aesthetic and Minimalist Design</h3>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Clean, warm design with purposeful use of space. Warm orange tones create emotional connection without overwhelming users.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">9. Help Users Recognize, Diagnose, and Recover from Errors</h3>
                        <Badge variant="default">Good</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Error messages are clear and descriptive. Toast notifications explain what went wrong and guide correction.
                      </p>
                    </div>

                    <div className="border-l-4 border-primary pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">10. Help and Documentation</h3>
                        <Badge variant="secondary">Needs Improvement</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Contact page provides support access. Could benefit from FAQ section or inline help tooltips for complex features.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cognitive Walkthrough */}
            <TabsContent value="cognitive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Task-Based User Journey Analysis</CardTitle>
                  <CardDescription>
                    Step-by-step evaluation of common user tasks
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 1: Finding and Viewing a Pet</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">1</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User lands on homepage</p>
                          <p className="text-sm text-muted-foreground">✓ Clear hero image with pets immediately establishes purpose</p>
                          <p className="text-sm text-muted-foreground">✓ "Find Your Perfect Companion" headline is descriptive</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">2</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User identifies how to browse pets</p>
                          <p className="text-sm text-muted-foreground">✓ Multiple entry points: search bar, "Browse All Pets" button, and navigation menu</p>
                          <p className="text-sm text-muted-foreground">✓ "Browse Pets" in navigation is self-explanatory</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">3</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User navigates to Browse page</p>
                          <p className="text-sm text-muted-foreground">✓ Click action is obvious on highlighted buttons</p>
                          <p className="text-sm text-muted-foreground">✓ Active state in navigation confirms successful navigation</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">4</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User views available pets</p>
                          <p className="text-sm text-muted-foreground">✓ Grid layout makes scanning easy</p>
                          <p className="text-sm text-muted-foreground">✓ Pet cards show key information (name, breed, age, location)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 2: Contacting About a Pet</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">1</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User wants to inquire about a pet</p>
                          <p className="text-sm text-muted-foreground">✓ "Contact Us" link visible in main navigation</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">2</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User navigates to contact page</p>
                          <p className="text-sm text-muted-foreground">✓ Form is immediately visible with clear labels</p>
                          <p className="text-sm text-muted-foreground">✓ Input placeholders guide what to enter</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">3</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User fills out form</p>
                          <p className="text-sm text-muted-foreground">✓ Form fields are large and touch-friendly</p>
                          <p className="text-sm text-muted-foreground">✓ Required fields are validated on submission</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">4</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User submits message</p>
                          <p className="text-sm text-muted-foreground">✓ Large "Send Message" button is obvious</p>
                          <p className="text-sm text-muted-foreground">✓ Success toast confirms message was sent</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary">Task 3: Creating an Account</h3>
                    
                    <div className="space-y-3 ml-4">
                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">1</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User wants to save favorite pets</p>
                          <p className="text-sm text-muted-foreground">✓ "Login" button prominent in navigation</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">2</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User realizes they need to sign up</p>
                          <p className="text-sm text-muted-foreground">✓ "Don't have an account? Sign Up Here" clearly visible on login page</p>
                          <p className="text-sm text-muted-foreground">✓ Link styling makes it clickable</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">3</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User fills signup form</p>
                          <p className="text-sm text-muted-foreground">✓ Form is simple with only essential fields</p>
                          <p className="text-sm text-muted-foreground">✓ Password confirmation prevents typos</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Badge className="h-6 w-6 rounded-full flex items-center justify-center">4</Badge>
                        <div className="flex-1">
                          <p className="font-medium">User completes signup</p>
                          <p className="text-sm text-muted-foreground">✓ Social login options provide alternatives</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Usability Testing */}
            <TabsContent value="usability" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Usability Testing Framework</CardTitle>
                  <CardDescription>
                    Structured approach for evaluating real user interactions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Testing Objectives</h3>
                    <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                      <li>Measure task completion rates for core user journeys</li>
                      <li>Identify navigation pain points and confusion areas</li>
                      <li>Evaluate visual hierarchy and information findability</li>
                      <li>Assess mobile responsiveness and touch target accessibility</li>
                      <li>Gather subjective satisfaction ratings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Test Scenarios</h3>
                    <div className="space-y-4">
                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Scenario 1: Pet Discovery</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3"><strong>Task:</strong> "You're looking to adopt a dog. Find and view available dogs on the site."</p>
                          <p className="text-sm mb-2"><strong>Success Metrics:</strong></p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Time to complete task (target: &lt;30 seconds)</li>
                            <li>Number of clicks required (optimal: 1-2)</li>
                            <li>Successful navigation to Browse page</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Scenario 2: Information Request</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3"><strong>Task:</strong> "You found a pet you like. Send a message asking about adoption requirements."</p>
                          <p className="text-sm mb-2"><strong>Success Metrics:</strong></p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Task completion rate (target: 90%+)</li>
                            <li>Form submission success without errors</li>
                            <li>User understanding of next steps</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Scenario 3: Account Creation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3"><strong>Task:</strong> "Create an account to save your favorite pets."</p>
                          <p className="text-sm mb-2"><strong>Success Metrics:</strong></p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Signup page discovery rate</li>
                            <li>Form completion time</li>
                            <li>Error rate during registration</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Scenario 4: Mobile Navigation</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm mb-3"><strong>Task:</strong> "Using a mobile device, navigate between Home, Browse, and Contact pages."</p>
                          <p className="text-sm mb-2"><strong>Success Metrics:</strong></p>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            <li>Mobile menu discoverability</li>
                            <li>Touch target adequacy (minimum 44x44px)</li>
                            <li>Navigation speed and efficiency</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Data Collection Methods</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Quantitative Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Task completion rate (%)</li>
                            <li>Time on task (seconds)</li>
                            <li>Error frequency</li>
                            <li>Click/tap counts</li>
                            <li>Navigation path analysis</li>
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-accent/50">
                        <CardHeader>
                          <CardTitle className="text-base">Qualitative Feedback</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-muted-foreground">
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Think-aloud protocol observations</li>
                            <li>Post-task satisfaction ratings (1-5)</li>
                            <li>Open-ended feedback interviews</li>
                            <li>SUS (System Usability Scale) score</li>
                            <li>Pain point identification</li>
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Participant Requirements</h3>
                    <Card className="bg-accent/50">
                      <CardContent className="pt-6">
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li><strong>Sample Size:</strong> 5-8 participants per user group</li>
                          <li><strong>Demographics:</strong> Mix of ages (25-65), tech comfort levels, and pet ownership experience</li>
                          <li><strong>Devices:</strong> Test on both desktop and mobile devices</li>
                          <li><strong>Browsers:</strong> Chrome, Safari, Firefox for compatibility testing</li>
                          <li><strong>Environment:</strong> Quiet space with screen recording and audio capture</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Expected Outcomes & Recommendations</h3>
                    <div className="space-y-3">
                      <Card className="bg-primary/5 border-l-4 border-primary">
                        <CardContent className="pt-6">
                          <p className="font-medium mb-2">Strong Areas (Expected)</p>
                          <p className="text-sm text-muted-foreground">
                            Visual appeal, navigation clarity, mobile responsiveness, and consistent design patterns should score highly based on current implementation.
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="bg-secondary/5 border-l-4 border-secondary">
                        <CardContent className="pt-6">
                          <p className="font-medium mb-2">Areas for Improvement (Predicted)</p>
                          <p className="text-sm text-muted-foreground">
                            Consider adding: (1) pet filtering/sorting options, (2) detailed pet profiles with more photos, (3) saved favorites functionality, (4) inline help/FAQ, (5) adoption process timeline.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Evaluation;