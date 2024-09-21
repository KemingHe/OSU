// ./src/utils/fetchUndergradResearchPostings.ts
//
// Fetches all available research postings from official OSU undergraduate research website(s).

import { fetchUndergradResearchPostingsOnPageNum } from "@src/researchPostings/fetchUndergradResearchPostingsOnPageNum";
import type { ResearchPosting } from "@src/schemas/ResearchPosting";
// Local type and util imports.
import { randomDelay } from "@src/utils/fetchHelpers";

/**
 * Fetches undergraduate research postings from multiple pages until no more postings are found.
 * Includes a random 0~1s delay between each page fetch to prevent rate limiting.
 *
 * @returns {Promise<ResearchPosting[] | undefined>} A promise that resolves to an array of research postings or undefined if no postings are found.
 */
export async function fetchUndergradResearchPostings(): Promise<
  ResearchPosting[] | undefined
> {
  const allResearchPostings: ResearchPosting[] = [];

  let pageNum = 0;
  while (true) {
    try {
      const currentPageResearchPostings: ResearchPosting[] | undefined =
        await fetchUndergradResearchPostingsOnPageNum(pageNum);

      if (
        !currentPageResearchPostings ||
        currentPageResearchPostings.length === 0
      ) {
        console.log(`No more research postings found on page ${pageNum}.`);
        break;
      }

      allResearchPostings.push(...currentPageResearchPostings);

      // Add a random delay between 0 to 1 seconds to prevent rate limiting.
      await randomDelay({ min: 0, max: 1000 });

      pageNum++;
    } catch (error) {
      console.error(
        `Error fetching research postings from page ${pageNum}:`,
        error,
      );
      break;
    }
  }

  // Strictly return undefined if no postings are found.
  if (allResearchPostings.length === 0) return undefined;

  return allResearchPostings;
}

// TESTING ONLY!! --------------------------------------------------------------
// Enable standalone function call with tsx, comment out when done.
// fetchUndergradResearchPostings()
//   .then((researchPostings) => {
//     console.log(researchPostings);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
