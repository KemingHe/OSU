// ./src/utils/fetchHelpers.test.ts
//
// Unittests for the fetchHelpers utility functions.

import { JSDOM } from "jsdom";
// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing target imports.
import {
  getAttributeFromSelector,
  getTextContentFromElement,
  getTextContentFromSelector,
} from "@src/utils/fetchHelpers";

// -----------------------------------------------------------------------------
// Helper function to mock one simple DOM element.
interface MockSimpleElementOptions {
  tagName: string;
  textContent: string | null;
  attribute: string;
  attributeValue: string;
}

function mockSimpleElement({
  tagName,
  textContent,
  attribute,
  attributeValue,
}: MockSimpleElementOptions): Element | null {
  const dom: JSDOM = new JSDOM(`<!DOCTYPE html><${tagName}></${tagName}>`);
  const element: Element | null = dom.window.document.querySelector(tagName);

  // Short-circuit to return null if the element is not found.
  if (element === null) {
    return null;
  }

  // Set the element's text content and attribute.
  element.textContent = textContent;
  element.setAttribute(attribute, attributeValue);

  return element;
}

// -----------------------------------------------------------------------------
// Helper function to mock one simple parent DOM element with a child element.
interface MockParentElementOptions {
  parentTagName: string;
  childOptions: MockSimpleElementOptions;
}

function mockParentElement({
  parentTagName,
  childOptions,
}: MockParentElementOptions): Element | null {
  const dom: JSDOM = new JSDOM(
    `<!DOCTYPE html><${parentTagName}></${parentTagName}>`,
  );
  const parentElement: Element | null =
    dom.window.document.querySelector(parentTagName);

  // Short-circuit to return null if the parent element is not found.
  if (parentElement === null) {
    return null;
  }

  // Mock the child element.
  const childElement: Element | null = mockSimpleElement(childOptions);

  // Short-circuit to return null if the child element is not found.
  if (childElement === null) {
    return null;
  }

  // Append the child element to the parent element.
  parentElement.appendChild(childElement);

  return parentElement;
}

// -----------------------------------------------------------------------------
// Test suite for the getTextContentFromElement function.
describe("The getTextContentFromElement helper function", () => {
  it("returns the text content of a given element", () => {
    const element: Element | null = mockSimpleElement({
      tagName: "p",
      textContent: "Hello, world!",
      attribute: "data-test",
      attributeValue: "test",
    });

    if (element === null) {
      throw new Error("The mock element is null.");
    }

    expect(getTextContentFromElement(element)).toBe("Hello, world!");
  });

  it("returns undefined for an element with no text content", () => {
    const element: Element | null = mockSimpleElement({
      tagName: "p",
      textContent: "",
      attribute: "data-test",
      attributeValue: "test",
    });

    if (element === null) {
      throw new Error("The mock element is null.");
    }

    expect(getTextContentFromElement(element)).toBe(undefined);
  });

  it("return undefined for an element with null text content (will default to empty string)", () => {
    const element: Element | null = mockSimpleElement({
      tagName: "p",
      textContent: null,
      attribute: "data-test",
      attributeValue: "test",
    });

    if (element === null) {
      throw new Error("The mock element is null.");
    }

    expect(getTextContentFromElement(element)).toBe(undefined);
  });

  it("returns undefined for an element with empty text content", () => {
    const element: Element | null = mockSimpleElement({
      tagName: "p",
      textContent: "   ",
      attribute: "data-test",
      attributeValue: "test",
    });

    if (element === null) {
      throw new Error("The mock element is null.");
    }

    expect(getTextContentFromElement(element)).toBe(undefined);
  });
});

// -----------------------------------------------------------------------------
// Test suite for the getTextContentFromSelector function.
describe("The getTextContentFromSelector helper function", () => {
  it("returns the text content of a child element by selector", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: "test",
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getTextContentFromSelector({
        element: parentElement,
        selector: "p",
      }),
    ).toBe("Hello, world!");
  });

  it("returns undefined for a child element not found by selector", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: "test",
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getTextContentFromSelector({
        element: parentElement,
        selector: "h1",
      }),
    ).toBe(undefined);
  });
});

// -----------------------------------------------------------------------------
// Test suite for the getAttributeFromSelector function.
describe("The getAttributeFromSelector helper function", () => {
  it("returns the attribute value of a child element by selector", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: "test",
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getAttributeFromSelector({
        element: parentElement,
        selector: "p",
        attribute: "data-test",
      }),
    ).toBe("test");
  });

  it("returns undefined for a child element whose attribute is emplay string after sanitization", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: '" ."',
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getAttributeFromSelector({
        element: parentElement,
        selector: "p",
        attribute: "data-test",
      }),
    ).toBe(undefined);
  });

  it("returns undefined for a child element not found by selector", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: "test",
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getAttributeFromSelector({
        element: parentElement,
        selector: "h1",
        attribute: "data-test",
      }),
    ).toBe(undefined);
  });

  it("returns undefined for a child element with no attribute", () => {
    const parentElement: Element | null = mockParentElement({
      parentTagName: "div",
      childOptions: {
        tagName: "p",
        textContent: "Hello, world!",
        attribute: "data-test",
        attributeValue: "test",
      },
    });

    if (parentElement === null) {
      throw new Error("The mock parent element is null.");
    }

    expect(
      getAttributeFromSelector({
        element: parentElement,
        selector: "p",
        attribute: "data-unknown",
      }),
    ).toBe(undefined);
  });
});
