import { anthropic } from '@ai-sdk/anthropic'
import { generateObject, jsonSchema, streamObject } from 'ai'

import { exampleOutput } from '../example.js'

export const generateRichText = async (text: string, options: any) => {
  const params = {
    model: anthropic(options.model),
    prompt: text,
    schema: jsonSchema(options.schema),
    system: `${options.system}

RULES:
- Strictly adhere to the specified layout and formatting instructions.

LAYOUT INSTRUCTIONS:
${options.layout}

RICH TEXT EDITOR TOOLS:
- Use appropriate formatting tools such as bold, italic, or underline for emphasis where needed.
- Apply correct heading levels (h1, h2, h3) for hierarchical structure.
- Utilize bullet points or numbered lists as required by the layout.

SAMPLE OUTPUT OBJECT:
${JSON.stringify(exampleOutput)}`,
  }

  if(options.stream) {
    const streamResult = await streamObject(params)
    return streamResult.toTextStreamResponse()
  }

  const generateResult = await generateObject(params)
  console.log("generateResult : ", generateResult);

  return Response.json({text: generateResult.object})
}
