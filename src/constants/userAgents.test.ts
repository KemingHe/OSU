// ./src/constants/userAgents.test.ts
//
// Snapshot test for the UserAgents constant array.

// Vitest essential imports.
import { describe, expect, it } from "vitest";

// Testing target import.
import UserAgents from "@src/constants/userAgents";

// -----------------------------------------------------------------------------
// UserAgents constant array snapshot test suite.
describe("The UserAgents constant array", () => {
  it("matches the snapshot", () => {
    expect(UserAgents).toMatchSnapshot();
  });
});
