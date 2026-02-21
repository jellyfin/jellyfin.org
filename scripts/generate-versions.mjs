/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { graphql } from '@octokit/graphql';
import path from 'node:path';
import fs from 'fs/promises';

const config = {
  logins: ['jellyfin', 'jellyfin-labs'],
  output: path.join(import.meta.dirname, '../src/data/versions.json'),
  ghToken: process.env.GITHUB_TOKEN
};

console.log(config.output);

const request = graphql.defaults({
  headers: {
    authorization: `token ${config.ghToken}`
  }
});

async function getVersions(login) {
  let repos = {};
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const query = `
          query ($login: String!, $cursor: String) {
            organization(login: $login) {
              repositories(visibility: PUBLIC, isArchived: false, first: 100, after: $cursor, orderBy: {field: NAME, direction: ASC}) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  nameWithOwner
                  latestRelease {
                    tagName
                  }
                  releases(first: 1, orderBy: {field: CREATED_AT, direction: DESC}) {
                    nodes {
                      tagName
                    }
                  }
                }
              }
            }
          }
        `;

    const result = await request(query, { login, cursor });
    const { pageInfo, nodes } = result.organization.repositories;

    for (const { nameWithOwner, latestRelease, releases } of nodes) {
      let latestPrerelease = releases?.nodes?.[0];
      // Only set prerelease if different from latest release
      if (latestPrerelease?.tagName === latestRelease?.tagName) latestPrerelease = null;

      // Skip repositories without releases
      if (!latestRelease && !latestPrerelease) continue;

      repos[nameWithOwner] = {
        latest: latestRelease?.tagName ?? null,
        prerelease: latestPrerelease?.tagName ?? null
      };
    }

    hasNextPage = pageInfo.hasNextPage;
    cursor = pageInfo.endCursor;
  }

  return repos;
}

let repos = {};
for (const login of config.logins) {
  console.log(`Searching releases for ${login}`);
  repos = { ...repos, ...(await getVersions(login)) };
}

console.log(`Writing releases to ${config.output}`);
const json = JSON.stringify(repos, undefined, '  ');
await fs.writeFile(config.output, json);
