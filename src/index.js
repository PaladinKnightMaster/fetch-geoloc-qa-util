const { getGeoData } = require('./utils');

// Input locations from command line
const locations = process.argv.slice(2);

const getLocationsData = async (locations) => {
  for (const location of locations) {
    const data = await getGeoData(location);
    if (data) {
      console.log(`Location: ${data.name}, Lat: ${data.lat}, Lon: ${data.lon}`);
    }
  }
};

getLocationsData(locations);