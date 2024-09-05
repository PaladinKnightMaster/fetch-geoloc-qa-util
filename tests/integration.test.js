const axios = require("axios");
const { getGeoData } = require("../src/utils");
jest.mock("axios");

describe("GeoLocation API", () => {
  test("Fetch geolocation for valid city/state", async () => {
    axios.get.mockResolvedValue({
      data: [{ name: "Madison", lat: 43.0731, lon: -89.4012 }],
    });
    const data = await getGeoData("Madison, WI");
    expect(data).toHaveProperty("lat");
    expect(data).toHaveProperty("lon");
    expect(data.name).toBe("Madison");
  });

  test("Fetch geolocation for valid zip code", async () => {
    axios.get.mockResolvedValue({
      data: { name: "Schenectady", lat: 42.8142, lon: -73.9396 },
    });
    const data = await getGeoData("12345");
    expect(data).toHaveProperty("lat");
    expect(data).toHaveProperty("lon");
  });

  // test('Handle invalid location', async () => {
  //     axios.get.mockRejectedValue(new Error('Location not found'));
  //     const data = await getGeoData('Invalid, XX');
  //     expect(data).toBeUndefined();
  // });

  // test('Handle rate-limiting error', async () => {
  //     axios.get.mockRejectedValue({
  //     response: { status: 429, data: 'Rate limit exceeded' }
  //     });
  //     const data = await getGeoData('Madison, WI');
  //     expect(data).toBeUndefined();
  // });

  test("Handle invalid location", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    axios.get.mockRejectedValue(new Error("Location not found"));
    const data = await getGeoData("Invalid, XX");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching data for Invalid, XX:",
      "Location not found"
    );
    expect(data).toBeUndefined();
    consoleSpy.mockRestore();
  });

  test("Handle rate-limiting error", async () => {
    const consoleSpy = jest.spyOn(console, "error");
    axios.get.mockRejectedValue({
      response: { status: 429, data: "Rate limit exceeded" },
    });
    const data = await getGeoData("Madison, WI");

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching data for Madison, WI:",
      "Rate limit exceeded"
    );
    expect(data).toBeUndefined();
    consoleSpy.mockRestore();
  });
});
