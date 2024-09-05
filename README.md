# Geolocation Utility - Fetch Coding Exercise (SDET)

## Description
This command-line utility fetches latitude, longitude, and location details for U.S. cities or zip codes using the [OpenWeather Geocoding API](https://openweathermap.org/api/geocoding-api). It supports input as either city/state combinations or zip codes, and allows multiple locations at once.

## Features
- Retrieve geolocation data (latitude, longitude, and place name) based on city/state or zip code.
- Supports multiple location inputs.
- Comprehensive QA testing including integration, performance, and rate-limiting tests.

## Requirements
- Node.js (v14.x or later)
- NPM (v6.x or later)

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PaladinKnightMaster/fetch-geoloc-qa-util.git
   cd fetch-geoloc-qa-util
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file in the root directory:
     ```bash
     touch .env
     ```
   - Add your OpenWeather API key to the `.env` file:
     ```bash
     API_KEY=YOUR_OEPNWEATHER_API_KEY
     ```

## Usage
The utility supports two types of location input:
1. City/State combination: `"Madison, WI"`
2. Zip code: `"12345"`

**Example usage:**
```bash
node src/index.js "Madison, WI" "12345" "Chicago, IL"
```

The utility will output the latitude, longitude, and place name for each location.

## Running Tests

We have set up integration, performance, and rate-limiting tests to ensure the utility works as expected.

### Integration Tests:
- To run integration tests:
  ```bash
  npm test
  ```

### Performance Tests:
- Performance tests ensure response time is optimal (under 2 seconds):
  ```bash
  npm run performance
  ```

## CI/CD Integration
This project uses GitHub Actions for Continuous Integration (CI) to automatically run tests on every push. The workflow is defined in `.github/workflows/test.yml`.

## Project Structure
```
/fetch-geoloc-qa-util
  |-- src/
      |-- index.js          # Main script
      |-- utils.js          # Helper functions for fetching API data
  |-- tests/
      |-- integration.test.js  # Integration tests
      |-- performance.test.js  # Performance tests
  |-- .env                 # API key configuration (not included in repo)
  |-- .gitignore           # Ignoring node_modules, env, etc.
  |-- package.json         # Project dependencies and scripts
  |-- README.md            # Project documentation
  |-- .github/
      |-- workflows/
          |-- test.yml      # CI/CD config
```

## Future Improvements
- **More comprehensive performance testing**: Test with larger datasets.
- **Expand unit testing**: Add unit tests for error handling and edge cases.
- **Additional rate-limiting tests**: Extend to simulate production-level API calls.