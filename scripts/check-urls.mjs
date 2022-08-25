import fetch from 'node-fetch';
import * as fs from 'node:fs/promises';
import path from 'node:path';

// 1xx, 2xx, and 3xx http status do not indicate errors
const isErrorStatus = (status) => Math.floor(status / 100) > 3;

// HACK: URLs containing periods are not handled correctly by the docusaurus test server currently. The following URLs
// return 404s even though they exist and work as expected on GH Pages.
const isProblematicUrl = (url) =>
  ['/posts/roku-v1.5.0/', '/posts/android-v2.4.0/', '/posts/android-v2.3.0/', '/posts/android-v2.1.0/'].includes(url);

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
const warnings = [];

await Promise.allSettled(
  urls.map(async (url) => {
    console.log(`Checking URL >> ${HOST}${url}`);

    try {
      const response = await fetch(`${HOST}${url}`);

      if (isErrorStatus(response.status)) {
        if (response.status === 404 && isProblematicUrl(url)) {
          warnings.push({ url, response });
        } else {
          failures.push({
            url,
            error: new Error(`HTTP Error: ${response.status} ${response.statusText}`),
            response
          });
        }
      }
    } catch (error) {
      failures.push({ url, error });
    }
  })
);

if (warnings.length > 0) {
  console.warn(
    [
      '⚠ The following URLs returned 404s, but should have succeeded',
      ...warnings.map((warning) => `${HOST}${warning.url}`)
    ].join('\n')
  );
}

if (failures.length > 0) {
  console.error(['❌ The following URLs failed', ...failures.map((failure) => `${HOST}${failure.url}`)].join('\n'));
  process.exit(1);
}

if (warnings.length === 0) {
  console.log('🚀 All URLs successful');
}
