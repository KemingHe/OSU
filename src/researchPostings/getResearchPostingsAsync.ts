// ./src/researchPostings/getResearchPostingsAsync.ts
//
// Async function to retrieve real-time research posting data.

// Local type, constants, and utility imports.
import { fetchUndergradResearchPostings } from "@src/researchPostings/fetchUndergradResearchPostings";
import type { ResearchPosting } from "@src/schemas/ResearchPosting";

// -----------------------------------------------------------------------------
export async function getResearchPostingsAsync(): Promise<
  ResearchPosting[] | undefined
> {
  return fetchUndergradResearchPostings();
}
