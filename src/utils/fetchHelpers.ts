// ./src/utils/fetchHelpers.ts
//
// Helper functions for fetching and querying data.

// Local constant import.
import UserAgents from "@src/constants/userAgents";

// -----------------------------------------------------------------------------
export function getTextContentFromElement(
  element: Element,
): string | undefined {
  // Short-circuit to return undefined if the element has no text content.
  const textContent: string | null = element.textContent;

  // Once element is defined (not null), textContent will never be null,
  // but must be checked for typescript. Thus, ignore next 3 unreachable lines.
  /* v8 ignore next 3 */
  if (textContent === null) {
    return undefined;
  }

  // Short-circuit to return undefined if the text content is empty after sanitization.
  const sanitizedTextContent: string = sanitizeText(textContent);
  if (sanitizedTextContent === "") {
    return undefined;
  }

  return sanitizedTextContent;
}

// -----------------------------------------------------------------------------
export interface GetTextContentFromSelectorOptions {
  element: Element;
  selector: string;
}

export function getTextContentFromSelector({
  element,
  selector,
}: GetTextContentFromSelectorOptions): string | undefined {
  // Short-circuit to return undefined if the target element is not found.
  const targetElement: Element | null = element.querySelector(selector);
  if (targetElement === null) {
    return undefined;
  }

  return getTextContentFromElement(targetElement);
}

// -----------------------------------------------------------------------------
export interface GetAttributeFromSelectorOptions {
  element: Element;
  selector: string;
  attribute: string;
}

export function getAttributeFromSelector({
  element,
  selector,
  attribute,
}: GetAttributeFromSelectorOptions): string | string | undefined {
  // Short-circuit to return undefined if the target element is not found.
  const targetElement: Element | null = element.querySelector(selector);
  if (targetElement === null) {
    return undefined;
  }

  // Short-circuit to return undefined if the target attribute is not found.
  const targetAttribute: string | null = targetElement.getAttribute(attribute);
  if (targetAttribute === null) {
    return undefined;
  }

  // Short-circuit to return undefined if the attribute is empty after sanitization
  const sanitizedAttribute: string = sanitizeText(targetAttribute);
  if (sanitizedAttribute === "") {
    return undefined;
  }

  return sanitizedAttribute;
}

// -----------------------------------------------------------------------------
export function sanitizeText(text: string): string {
  // Remove double quotes around the entire text.
  const qoutesRemovedText: string = text.trim().replace(/^"(.*)"$/, "$1");

  // Remove commas and periods at the start and end of the text.
  const commaDotRemovedText: string = qoutesRemovedText
    .trim()
    .replace(/^[,\.]+|[,\.]+$/g, "");

  // Remove last remaining whitespaces at the start and end of the text.
  return commaDotRemovedText.trim();
}

// -----------------------------------------------------------------------------
export interface RandomDelayOptions {
  min: number;
  max: number;
}

export async function randomDelay({
  min,
  max,
}: RandomDelayOptions): Promise<void> {
  // Handle invalid input by throwing an error.
  if (min < 0) {
    throw new Error("Minimum delay must be greater than or equal to 0.");
  }

  if (max <= 0) {
    throw new Error("Maximum delay must be strictly greater than 0.");
  }

  if (max < min) {
    throw new Error(
      "Maximum delay must be greater than or equal to minimum delay.",
    );
  }

  // ---------------------------------------------------------------------------
  // Short-circuit to return immediately if min and max are the same.
  if (min === max) {
    return new Promise((resolve) => setTimeout(resolve, min));
  }

  // ---------------------------------------------------------------------------
  // Generate a random delay between min and max milliseconds.
  const delay: number = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

// -----------------------------------------------------------------------------
export function randomUserAgent(): string {
  const randomAgent: string | undefined =
    UserAgents[Math.floor(Math.random() * UserAgents.length)];

  // randomeAgent is always defined, but must be checked for typescript.
  /* v8 ignore next 3 */
  if (!randomAgent) {
    throw new Error("Failed to generate random user agent.");
  }
  return randomAgent;
}
