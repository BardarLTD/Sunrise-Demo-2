import { OpenRouter } from '@openrouter/sdk';
import type { Message } from '@openrouter/sdk/models';

// Type for chat completion responses
export interface ChatCompletionResponse {
  content: string;
  model: string;
  usage?:
    | {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
      }
    | undefined;
}

// Error types for better error handling
export class OpenRouterError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly status?: number,
  ) {
    super(message);
    this.name = 'OpenRouterError';
  }
}

class OpenRouterClient {
  private client: OpenRouter | null = null;
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000; // 1 second

  private getClient(): OpenRouter {
    if (!this.client) {
      this.client = new OpenRouter({
        apiKey: process.env.OPENROUTER_API_KEY,
        httpReferer: process.env.OPENROUTER_APP_URL,
        xTitle: process.env.OPENROUTER_APP_NAME,
      });
    }

    return this.client;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async chatCompletion(
    prompt: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
    } = {},
  ): Promise<ChatCompletionResponse> {
    const {
      model = process.env.OPENROUTER_MODEL,
      temperature = 0.7,
      maxTokens = 4000,
      systemPrompt,
    } = options;

    const messages: Message[] = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: systemPrompt,
      });
    }

    messages.push({
      role: 'user',
      content: prompt,
    });

    let lastError: Error | null = null;

    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const client = this.getClient();
        const response = await client.chat.send({
          model: model ?? 'anthropic/claude-3-5-sonnet',
          messages,
          temperature,
          maxTokens,
        });

        const choice = response.choices[0];
        if (!choice?.message?.content) {
          throw new OpenRouterError('No content in response');
        }

        const content =
          typeof choice.message.content === 'string'
            ? choice.message.content
            : choice.message.content
                .map((block) => ('text' in block ? block.text : ''))
                .join('');

        return {
          content,
          model: response.model,
          usage: response.usage
            ? {
                prompt_tokens: response.usage.promptTokens,
                completion_tokens: response.usage.completionTokens,
                total_tokens: response.usage.totalTokens,
              }
            : undefined,
        };
      } catch (error) {
        lastError = error as Error;

        // Check for client errors (4xx) that shouldn't be retried
        if (error instanceof Error && 'status' in error) {
          const status = (error as Error & { status?: number }).status ?? 500;
          if (status >= 400 && status < 500) {
            throw new OpenRouterError(
              error.message,
              'code' in error ? String(error.code) : 'CLIENT_ERROR',
              status,
            );
          }
        }

        // Wait before retrying (exponential backoff)
        if (attempt < this.maxRetries - 1) {
          await this.delay(this.retryDelay * Math.pow(2, attempt));
        }
      }
    }

    // If we've exhausted all retries, throw the last error
    throw new OpenRouterError(
      lastError?.message || 'Failed after maximum retries',
      'MAX_RETRIES_EXCEEDED',
    );
  }

  async generateJSON<T>(
    prompt: string,
    options: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      systemPrompt?: string;
    } = {},
  ): Promise<T> {
    const systemPrompt =
      options.systemPrompt ||
      'You are a helpful assistant that generates valid JSON responses. Always respond with valid JSON only, no additional text.';

    const response = await this.chatCompletion(prompt, {
      ...options,
      systemPrompt,
    });

    try {
      // Try to extract JSON from markdown code blocks if present
      let content = response.content.trim();
      const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch && jsonMatch[1]) {
        content = jsonMatch[1].trim();
      }

      return JSON.parse(content) as T;
    } catch (error) {
      throw new OpenRouterError(
        `Failed to parse JSON response: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'JSON_PARSE_ERROR',
      );
    }
  }
}

// Singleton instance
export const openRouterClient = new OpenRouterClient();
