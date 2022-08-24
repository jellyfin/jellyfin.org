import fetch from 'node-fetch';
import * as fs from 'node:fs/promises';
import path from 'node:path';

// 1xx, 2xx, and 3xx http status do not indicate errors
const isErrorStatus = (status) => Math.floor(status / 100) > 3;

// A path parameter is required to provide a JSON file containing a list of URLs to check
const [, , pathArg] = process.argv;
if (!pathArg) {
  throw new Error('path is required');
}
const filePath = path.resolve(process.cwd(), pathArg);
const urls = JSON.parse(await fs.readFile(filePath));

// The host to check can be overriden by an environment variable
const HOST = process.env.CHECK_URL_HOST || 'http://localhost:3000';

// List of any failed requests
const failures = [];

await Promise.allSettled(
  urls.map(async (url) => {
    console.log(`Checking URL >> ${HOST}${url}`);

    try {
      const response = await fetch(`${HOST}${url}`);

      if (isErrorStatus(response.status)) {
        failures.push({
          url,
          error: new Error(`HTTP Error: ${response.status} ${response.statusText}`),
          response
        });
      }
    } catch (error) {
      failures.push({ url, error });
    }
  })
);

if (failures.length === 0) {
  console.log('All URLs successful');
} else {
  console.error('The following errors were encountered', failures);
  process.exit(1);
}
