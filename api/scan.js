export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers — allows your frontend to call this function
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { url, email } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    const hasEmail = email && email.includes('@');

    const prompt = `You are an expert B2B web and AI consultant. Analyse this website URL: ${url}

Based on the URL, domain, and inferable context, provide a realistic AI readiness assessment. Make educated inferences about their likely tech stack based on company size and industry.

Return ONLY valid JSON (no markdown, no explanation):
{
  "companyName": "Company name from URL",
  "overallScore": 45,
  "dimensions": { "cms": 60, "analytics": 50, "automation": 30, "conversion": 45, "integration": 40 },
  "techStack": [
    {"name": "WordPress", "category": "cms"},
    {"name": "Google Analytics", "category": "analytics"},
    {"name": "HubSpot", "category": "crm"},
    {"name": "Hotjar", "category": "marketing"},
    {"name": "Intercom", "category": "other"}
  ],
  "opportunities": [
    {"title": "AI-Powered Lead Qualification", "impact": "high", "description": "Specific to this business"},
    {"title": "Intelligent Content Personalisation", "impact": "high", "description": "Specific description"},
    {"title": "Predictive Analytics Integration", "impact": "medium", "description": "Specific description"},
    {"title": "AI Chat & Conversion Optimisation", "impact": "medium", "description": "Specific description"},
    {"title": "Automated SEO & Content Intelligence", "impact": "low", "description": "Specific description"}
  ],
  "summary": "2-3 sentence executive summary written directly to the business owner",
  "quickWins": ["Quick win 1 specific to their tech", "Quick win 2", "Quick win 3"],
  "techGaps": ["Gap 1", "Gap 2", "Gap 3"]
}

Rules: overallScore 20-85, all dimension scores 10-90, techStack 4-8 realistic tools, opportunities exactly 5, everything specific to the actual business. ${hasEmail ? 'Provide full detailed recommendations as they shared their email.' : 'Provide a good overview but note full recommendations available by sharing email.'}`;

    // Call Anthropic API using the secret key stored in Vercel environment variables
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic API error:', err);
      return res.status(500).json({ error: 'AI service error. Please try again.' });
    }

    const data = await response.json();
    const text = data.content.find(b => b.type === 'text')?.text || '';
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return res.status(200).json(result);

  } catch (error) {
    console.error('Scan error:', error);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
