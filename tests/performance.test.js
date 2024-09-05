const { getGeoData } = require("../src/utils");
const { performance } = require("perf_hooks");

describe("Performance Testing", () => {
  test("Check response time for Madison, WI", async () => {
    const t0 = performance.now();
    await getGeoData("Madison, WI");
    const t1 = performance.now();
    expect(t1 - t0).toBeLessThan(2000); // Expected response within 2 seconds
  });
});
