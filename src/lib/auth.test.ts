import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getAdminFallbackUser } from "./auth";

describe("admin fallback credentials", () => {
  it("returns an admin user for the requested credentials", () => {
    const user = getAdminFallbackUser("jijajija422@gamil.com", "holiday(123)");

    assert.deepStrictEqual(user, {
      id: "admin",
      email: "jijajija422@gamil.com",
      name: "Admin",
      role: "ADMIN",
    });
  });

  it("rejects invalid credentials", () => {
    assert.equal(getAdminFallbackUser("wrong@example.com", "wrong-password"), null);
  });
});
