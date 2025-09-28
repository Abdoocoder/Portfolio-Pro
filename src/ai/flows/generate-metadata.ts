'use server';

/**
 * @fileOverview An AI agent that generates SEO-friendly metadata.
 *
 * - generateMetadata - A function that generates metadata for a portfolio.
 * - GenerateMetadataInput - The input type for the generateMetadata function.
 * - GenerateMetadataOutput - The return type for the generateMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMetadataInputSchema = z.object({
  siteName: z.string().describe('The name of the portfolio site.'),
  title: z.string().describe('The title of the content.'),
  description: z.string().describe('The main content description.'),
  authorName: z.string().describe('The name of the author.'),
  authorJobTitle: z.string().describe('The job title of the author.'),
  keywords: z.string().describe('Comma separated list of keywords related to the content.'),
});
export type GenerateMetadataInput = z.infer<typeof GenerateMetadataInputSchema>;

const GenerateMetadataOutputSchema = z.object({
  metaDescription: z.string().describe('A concise and SEO-friendly meta description.'),
  openGraph: z.string().describe('Open Graph tags for social media sharing.'),
  jsonLd: z.string().describe('JSON-LD Person schema for structured data.'),
});
export type GenerateMetadataOutput = z.infer<typeof GenerateMetadataOutputSchema>;

export async function generateMetadata(input: GenerateMetadataInput): Promise<GenerateMetadataOutput> {
  return generateMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMetadataPrompt',
  input: {schema: GenerateMetadataInputSchema},
  output: {schema: GenerateMetadataOutputSchema},
  prompt: `You are an SEO expert. Generate metadata for a portfolio site.

  Site Name: {{{siteName}}}
  Title: {{{title}}}
  Description: {{{description}}}
  Author Name: {{{authorName}}}
  Author Job Title: {{{authorJobTitle}}} 
  Keywords: {{{keywords}}}

  Instructions:
  1. Create a concise and SEO-friendly meta description (under 160 characters).
  2. Generate Open Graph tags for social media sharing (title, description, url, image, type).
  3. Create a JSON-LD Person schema with the following fields (name, jobTitle, description, url, sameAs).

  Output:
  {
    "metaDescription": "[Generated Meta Description]",
    "openGraph": "[Generated Open Graph Tags]",
    "jsonLd": "[Generated JSON-LD Person Schema]"
  }`,
});

const generateMetadataFlow = ai.defineFlow(
  {
    name: 'generateMetadataFlow',
    inputSchema: GenerateMetadataInputSchema,
    outputSchema: GenerateMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
