import type { GenerationModel } from '../../types.js'

import { AnthropicConfig } from './anthropic/index.js'
import { ElevenLabsConfig } from './elevenLabs/index.js'
import { OpenAIConfig } from './openai/index.js'
import * as process from 'node:process'

export const GenerationModels: GenerationModel[] = [
  ...(process.env.ANTHROPIC_API_KEY ? AnthropicConfig.models : []),
  ...(process.env.ELEVENLABS_API_KEY ? ElevenLabsConfig.models : []),
  ...OpenAIConfig.models,
]
