import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // System prompt with NextVerse knowledge
    const systemPrompt = `You are NextVerse AI Assistant, a helpful guide for our VR/AR learning platform.

About NextVerse:
- A revolutionary VR/AR platform for immersive 3D learning environments
- Features an AI teacher/guide that explains concepts step-by-step
- Transforms industry training and education
- Makes hands-on training accessible without expensive physical equipment
- Serves both educational institutions and industries

Key Features:
- Fully immersive 3D environments for practical learning
- AI-powered guidance and explanations
- Accessible anytime, anywhere
- Cost-effective alternative to physical training setups
- Suitable for healthcare, manufacturing, education, military, and more

Use Cases:
- Medical training (surgery simulations, anatomy)
- Industrial equipment operation
- Safety training
- Complex machinery maintenance
- Scientific experiments
- Historical recreations
- Language learning through immersion

Benefits:
- Eliminates geographical barriers
- Reduces training costs dramatically
- Safe practice environment
- Repeatable training scenarios
- Real-time AI feedback
- Scalable to unlimited users

Your role:
- Answer questions about NextVerse features and capabilities
- Explain use cases and benefits
- Help visitors understand how VR/AR learning works
- Offer to schedule a demo when users show interest
- Be friendly, concise, and helpful

If someone asks about pricing or wants to see a demo, let them know they can click "Get Started Free" or "Schedule a Demo" buttons on the page.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: messages.map((msg: any) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        systemInstruction: {
          parts: [{ text: systemPrompt }]
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error("Failed to get AI response");
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      throw new Error("No response from AI");
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
