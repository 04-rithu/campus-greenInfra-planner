const generateMockData = (count) => {
  const data = {
    "/api/zones": [],
    "/api/watering": [],
    "/api/trimming": [],
    "/api/waste": [],
    "/api/suggestions": [],
    "/api/pesticide": []
  };

  const statuses = ["Healthy", "Needs Attention", "Under Maintenance", "Excellent"];
  const zones = [];

  for (let i = 1; i <= count; i++) {
    const zid = `Z-${i.toString().padStart(3, '0')}`;
    zones.push(zid);
    data["/api/zones"].push({
      _id: `z${i}`,
      zoneId: zid,
      name: `Campus Sector ${i}`,
      status: statuses[i % statuses.length],
      type: i % 2 === 0 ? "Garden" : "Lawn",
      currentMoisture: Math.floor(Math.random() * 100)
    });
  }

  for (let i = 1; i <= count; i++) {
    data["/api/watering"].push({
      _id: `w${i}`,
      zoneId: zones[i % count],
      amount: `${Math.floor(Math.random() * 1000) + 100}L`,
      status: i % 3 === 0 ? "Pending" : "Completed",
      date: new Date(Date.now() - i * 3600000).toISOString()
    });
    
    data["/api/trimming"].push({
      _id: `t${i}`,
      zoneId: zones[i % count],
      type: i % 2 === 0 ? "Hedge Trimming" : "Lawn Mowing",
      status: i % 4 === 0 ? "Scheduled" : "Completed",
      date: new Date(Date.now() - i * 7200000).toISOString()
    });

    data["/api/waste"].push({
      _id: `ws${i}`,
      zoneId: zones[i % count],
      type: i % 2 === 0 ? "Organic" : "Inorganic",
      amount: `${Math.floor(Math.random() * 100) + 10}kg`,
      status: "Collected",
      date: new Date(Date.now() - i * 86400000).toISOString()
    });

    data["/api/pesticide"].push({
      _id: `p${i}`,
      zoneId: zones[i % count],
      type: i % 3 === 0 ? "Herbicide" : "Insecticide",
      amount: `${Math.floor(Math.random() * 5) + 1}L`,
      status: "Applied",
      date: new Date(Date.now() - i * 14400000).toISOString()
    });

    data["/api/suggestions"].push({
      _id: `s${i}`,
      title: `Improvement Idea #${i}`,
      content: `Suggesting better irrigation/care for Sector ${i}`,
      status: "Pending",
      category: i % 2 === 0 ? "Infrastructure" : "Maintenance"
    });
  }

  return data;
};

const mockData = generateMockData(300);

const demoMiddleware = (req, res, next) => {
  const path = req.path;
  
  if (req.method === "GET" && mockData[path]) {
    console.log(`[DEMO MODE] Serving 300 mock records for: ${path}`);
    return res.json(mockData[path]);
  }

  if (path === "/api/auth/login" && req.method === "POST") {
    const { email } = req.body;
    return res.json({
      message: "Login successful (Demo Mode)",
      token: "demo-token-123",
      user: { id: "demo-user", name: "Staff Demo", email: email || "staff@demo.com", role: "user" }
    });
  }

  next();
};

module.exports = demoMiddleware;
