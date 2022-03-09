/**
 * A template jest test file.
 */
import { foo } from "../index";

describe("foo test function", () => {
  it("should pass", () => {
    expect(foo()).toEqual(1);
  });
});
