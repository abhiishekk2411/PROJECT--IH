const http = require('http');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        resolve({ statusCode: res.statusCode, body });
      });
    });
    req.on('error', (err) => reject(err));
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

async function verify() {
  console.log("--- Verifying Endpoints ---");

  // 1. Dashboard
  try {
    const res1 = await makeRequest({ hostname: 'localhost', port: 5000, path: '/api/dashboard', method: 'GET' });
    console.log("1. /api/dashboard:", res1.statusCode, res1.body.substring(0, 150));
  } catch (e) {
    console.error("1. /api/dashboard failed:", e.message);
  }

  // 2. History
  try {
    const res2 = await makeRequest({ hostname: 'localhost', port: 5000, path: '/api/history', method: 'GET' });
    console.log("2. /api/history:", res2.statusCode, res2.body.substring(0, 150));
  } catch (e) {
    console.error("2. /api/history failed:", e.message);
  }

  // 3. Trend
  try {
    const res3 = await makeRequest({ hostname: 'localhost', port: 5000, path: '/api/markets/trend?crop=tomato&mandi=pimpalgaon&variety=hybrid&days=30', method: 'GET' });
    console.log("3. /api/markets/trend:", res3.statusCode, res3.body.substring(0, 150));
  } catch (e) {
    console.error("3. /api/markets/trend failed:", e.message);
  }
  
  // 4. Decision Analyze
  try {
    const payload = JSON.stringify({
      cropId: "tomato",
      varietyId: "hybrid",
      quantityKg: 800,
      location: "Nashik"
    });
    const res4 = await makeRequest({
      hostname: 'localhost',
      port: 5000,
      path: '/api/decision/analyze',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, payload);
    console.log("4. /api/decision/analyze:", res4.statusCode, res4.body.substring(0, 300));
  } catch (e) {
    console.error("4. /api/decision/analyze failed:", e.message);
  }
}

verify();
