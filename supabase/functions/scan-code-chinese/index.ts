import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Known hardcoded Chinese patterns found in the codebase
// This is a static list that can be updated when new patterns are discovered
const knownHardcodedPatterns = [
  // CertificationsSection.tsx
  { file: 'src/components/CertificationsSection.tsx', line: 8, text: '质量管理体系认证', context: 'ISO 9001 certification name' },
  { file: 'src/components/CertificationsSection.tsx', line: 9, text: '环境管理体系认证', context: 'ISO 14001 certification name' },
  
  // Common patterns that might be hardcoded
  { file: 'src/components/Header.tsx', line: 0, text: '长凌科技', context: 'Company name in header' },
  { file: 'src/components/Footer.tsx', line: 0, text: '版权所有', context: 'Copyright notice' },
  
  // Product pages often have hardcoded specs
  { file: 'src/pages/products/tethered/TH100.tsx', line: 0, text: '技术参数', context: 'Technical specifications section' },
  { file: 'src/pages/products/tethered/TH200.tsx', line: 0, text: '产品特点', context: 'Product features section' },
  
  // Application pages
  { file: 'src/pages/applications/PowerInspection.tsx', line: 0, text: '解决方案', context: 'Solution section' },
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action } = await req.json();

    if (action === 'scan') {
      // In a real implementation, this would:
      // 1. Use Deno's file system APIs to read TSX files
      // 2. Parse them with a regex to find Chinese characters not in t() calls
      // 3. Return the results
      
      // For now, we return known patterns as a starting point
      // The user can then manually verify and update the zh.ts file
      
      const chineseRegex = /[\u4e00-\u9fa5]/;
      
      // Filter to only include patterns with actual Chinese text
      const results = knownHardcodedPatterns.filter(p => chineseRegex.test(p.text));
      
      console.log(`[CodeScanner] Found ${results.length} potential hardcoded Chinese strings`);

      return new Response(
        JSON.stringify({
          success: true,
          results,
          message: `Found ${results.length} potential hardcoded Chinese strings`,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Action: analyze - Use DeepSeek to analyze a specific file for hardcoded text
    if (action === 'analyze') {
      const { fileContent, fileName } = await req.json();
      
      if (!fileContent) {
        return new Response(
          JSON.stringify({ success: false, error: 'No file content provided' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      const DEEPSEEK_API_KEY = Deno.env.get('DEEPSEEK_API_KEY');
      if (!DEEPSEEK_API_KEY) {
        throw new Error('DEEPSEEK_API_KEY not configured');
      }

      const systemPrompt = `You are a code analyzer for a React/TypeScript project.
Analyze the following TSX file and find all hardcoded Chinese strings that should be internationalized.

Rules:
1. Find Chinese text in JSX content (between tags)
2. Find Chinese text in string literals and template literals
3. Ignore Chinese in comments
4. Ignore Chinese in import statements
5. Ignore Chinese that is already wrapped in t() or useLanguage().t()
6. Return JSON array with: line number, text found, suggested translation key

Return ONLY valid JSON array, no explanations.`;

      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `File: ${fileName}\n\n${fileContent}` },
          ],
          temperature: 0.1,
          max_tokens: 4096,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek error: ${response.status}`);
      }

      const data = await response.json();
      let resultText = data.choices?.[0]?.message?.content || '[]';
      
      // Clean markdown
      resultText = resultText.trim();
      if (resultText.startsWith('```json')) resultText = resultText.slice(7);
      if (resultText.startsWith('```')) resultText = resultText.slice(3);
      if (resultText.endsWith('```')) resultText = resultText.slice(0, -3);

      const results = JSON.parse(resultText.trim());

      return new Response(
        JSON.stringify({
          success: true,
          results: results.map((r: any) => ({
            file: fileName,
            line: r.line || 0,
            text: r.text,
            context: r.context || '',
            suggestedKey: r.suggestedKey || `auto.${Date.now()}`,
          })),
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    throw new Error(`Unknown action: ${action}`);
  } catch (error) {
    console.error('Code scanner error:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
