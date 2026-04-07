const mockData = {
  "/api/zones": [
    { _id: "1", zoneId: "Z-01", name: "Science Block Garden", status: "Healthy", type: "Garden", currentMoisture: 45 },
    { _id: "2", zoneId: "Z-02", name: "Main Avenue Trees", status: "Needs Watering", type: "Trees", currentMoisture: 20 },
    { _id: "3", zoneId: "Z-03", name: "Student Hostel Lawn", status: "Under Maintenance", type: "Lawn", currentMoisture: 35 }
  ],
  "/api/watering": [
    { _id: "1", zoneId: "Z-01", amount: "500L", status: "Completed", date: new Date().toISOString() },
    { _id: "2", zoneId: "Z-02", amount: "1200L", status: "Pending", date: new Date().toISOString() }
  ],
  "/api/trimming": [
    { _id: "1", zoneId: "Z-03", type: "Lawn Mowing", status: "Completed", date: new Date().toISOString() }
  ],
  "/api/waste": [
    { _id: "1", zoneId: "Z-01", type: "Organic", amount: "50kg", status: "Collected", date: new Date().toISOString() }
  ],
  "/api/suggestions": [
     { _id: "1", title: "Add more sprinklers to Zone 02", content: "The current system is not covering the north side.", status: "Pending", category: "Infrastructure" }
  ]
};

const demoMiddleware = (req, res, next) => {
  const path = req.path;
  
  // If it's a GET request and we have mock data for it
  if (req.method === "GET" && mockData[path]) {
    console.log(`[DEMO MODE] Serving mock data for: ${path}`);
    return res.json(mockData[path]);
  }

  // Intercept Auth Login for Staff Demo
  if (path === "/api/auth/login" && req.method === "POST") {
    const { email, password } = req.body;
    if (email === "staff@demo.com" && password === "staff123") {
      console.log(`[DEMO MODE] Bypassing login for: ${email}`);
      return res.json({
        message: "Login successful (Demo Mode)",
        token: "demo-token-123",
        user: { id: "demo-user", name: "Demo Staff", email: "staff@demo.com", role: "user" }
      });
    }
    // Also allow any login for now during demo
    if (email === "rithupaisha.ct23@bitsathy.ac.in") {
       return res.json({
        message: "Login successful (Demo Mode)",
        token: "demo-token-123",
        user: { id: "demo-user", name: "Rithu Pavisha", email: email, role: "user" }
      });
    }
  }

  next();
};

module.exports = demoMiddleware;
