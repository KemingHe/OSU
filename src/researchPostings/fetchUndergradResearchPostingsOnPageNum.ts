// ./src/utils/fetchUndergradResearchPostingsOnPageNum.ts
//
// Main helper function for fetching research postings from a specific page number.

// jsdom essential imports.
import { JSDOM } from "jsdom";

// Local type and util imports.
import type { ResearchPosting } from "@src/schemas/ResearchPosting";
import {
  getAttributeFromSelector,
  getTextContentFromElement,
  getTextContentFromSelector,
  randomUserAgent,
} from "@src/utils/fetchHelpers";

/**
 * Fetches research postings from a specific page number of the OSU Undergraduate Research Office website.
 *
 * @param {number} [pageNum] - The page number to fetch research postings from. If not provided or less than 1, the first page will be fetched.
 * @returns {Promise<ResearchPosting[] | undefined>} - A promise that resolves to an array of research postings or undefined if no postings are found.
 */
export async function fetchUndergradResearchPostingsOnPageNum(
  pageNum?: number,
): Promise<ResearchPosting[] | undefined> {
  // Research posting URL.
  const url: string = "https://ugresearch.osu.edu/research-postings";

  // Research posting field selectors.
  const postingSelector: string =
    "div.researchposting--view.researchposting__view > ul > li.views-row > article.node.node--type--research-position-posting";

  const titleSelector: string = "h3 > a > span";
  const linkSelector: string = "h3 > a";
  const applicationDeadlineSelector: string =
    "div.node__content > div.field--name-field-posting-app-deadline.field--type-datetime > div.field__item > time";
  const departmentSelector: string =
    "div.node__content > div.field--name-field-posting-fac-lead-dept > div.field__item";
  const publicOrPrivateSelector: string =
    "div.node__content > div.field--name-private.field--type-private > div.field__item";
  const hoursPerWeekSelector: string =
    "div.node__content > div.field--name-field-posting-hours-per-week.field--type-integer > div.field__item";
  const compensationTypesSelector: string =
    "div.node__content > div.field--name-field-posting-compensation-type.field--type-list-string > div.field__items > div.field__item";

  try {
    // Step 1: Construct the target url with the (optional) page number.
    let targetUrl: string = url;

    if (pageNum && pageNum > 0) {
      targetUrl = `${url}?page=${pageNum}`;
    }

    console.log(`Fetching research postings from ${targetUrl}`);

    // Step 2: Fetch the entire research postings html page.
    const res: Response = await fetch(targetUrl, {
      method: "GET",

      // Mimic cache-less real browser request headers.
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language": "en-US,en;q=0.9",
        "Cache-Control": "no-store",
        Pragma: "no-cache",
        Referer: `${url}`,
        "Sec-Ch-Ua":
          '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"macOS"',
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-User": "?1",
        "Sec-Gpc": "1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": randomUserAgent(),
      },
      cache: "no-store",
    });

    // Strictly throw an error if the response is not ok.
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }

    // Step 3: Convert the response to text and parse into DOM object.
    const htmlText: string = await res.text();
    const dom: JSDOM = new JSDOM(htmlText);
    const doc: Document = dom.window.document;

    // Step 4: Extract the research postings from the DOM object.
    const researchPostings: ResearchPosting[] = [];

    const allPostingElements: NodeListOf<Element> =
      doc.querySelectorAll(postingSelector);

    // Strictly return undefined if no postings are found.
    if (allPostingElements.length === 0) return undefined;

    // biome-ignore lint/complexity/noForEach: Must use forEach to iterate through NodeListOf<Element>.
    allPostingElements.forEach((postingNode: Element) => {
      // Extract research posting "title" field, short-circuit if not found.
      const title: string | undefined = getTextContentFromSelector({
        element: postingNode,
        selector: titleSelector,
      });
      if (!title) return;

      // Extract research posting "link" field, short-circuit if not found.
      const link: string | undefined = getAttributeFromSelector({
        element: postingNode,
        selector: linkSelector,
        attribute: "href",
      });
      if (!link) return;

      // Extract research posting "application deadline" field, short-circuit if not found.
      const applicationDeadline: string | undefined =
        getTextContentFromSelector({
          element: postingNode,
          selector: applicationDeadlineSelector,
        });
      if (!applicationDeadline) return;

      // Extract research posting "department" field, short-circuit if not found.
      const department: string | undefined = getTextContentFromSelector({
        element: postingNode,
        selector: departmentSelector,
      });
      if (!department) return;

      // Extract research posting "public or private" field, short-circuit if not found.
      const publicOrPrivate: string | undefined = getTextContentFromSelector({
        element: postingNode,
        selector: publicOrPrivateSelector,
      });
      if (!publicOrPrivate) return;

      // Extract research posting "hours per week" field, short-circuit if not found.
      const hoursPerWeek: string | undefined = getTextContentFromSelector({
        element: postingNode,
        selector: hoursPerWeekSelector,
      });
      if (!hoursPerWeek) return;

      // Extract research posting "compensation types" field,
      // iterate and sanitize through all sub-fields, short-circuit if not
      const compensationTypes: string[] = [];

      const allCompensationTypeElements: NodeListOf<Element> =
        postingNode.querySelectorAll(compensationTypesSelector);

      // biome-ignore lint/complexity/noForEach: Must use forEach to iterate through NodeListOf<Element>.
      allCompensationTypeElements.forEach((compensationTypeNode: Element) => {
        const compensationType: string | undefined =
          getTextContentFromElement(compensationTypeNode);
        if (compensationType) {
          compensationTypes.push(compensationType);
        }
      });
      if (compensationTypes.length === 0) return;

      researchPostings.push({
        title,
        link: `https://ugresearch.osu.edu${link}`,
        applicationDeadline,
        department,
        publicOrPrivate,
        hoursPerWeek,
        compensationTypes,
      });
    });

    // Strictly return undefined if no valid postings are found.
    if (researchPostings.length === 0) return undefined;

    return researchPostings;

    // Catch and log any errors that occur during the fetch process.
    // Strictly return undefined if any error occurs.
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
