---
uid: contrib-release-procedure
title: Releases
---

# Release Procedure

This document is a guide for the core team, provided publicly to ensure transparency in the release process.

## Versioning

Jellyfin uses [semantic versioning](https://semver.org). All releases will have versions in the `X.Y.Z` format, starting from `10.0.0`. Note however that the `10.Y.Z` release chain represents the "cleanup" of the codebase, so it should be accepted that `10.Y.Z` breaks all compatibility, at some point, with previous Emby-compatible interfaces, and may also break compatibility with previous `10.Y` releases if required for later cleanup work. Our versioning will typically follow the patterns below:

### X: Major Versions

* Breaks compatibility with the HTTP or plugin APIs

### Y: Minor Versions

* Introduces new features
* Makes minor backwards-compatible API changes

### Z: Hotfix Versions

* Critical bug fixes or minor changes

## General Release Philosophy

Releases will generally be performed on Sundays "when ready". For Major/Minor releases, the "when ready" is generally quite flexible and is whenever the release is truly ready without major breaking bugs. After a major release, each Sunday the Admin team should review the recently merged PRs and, if backports are required, perform a Hotfix release containing those PRs.

### Major Release Procedure

#### Preparation

1. Testing is ongoing via `master` nightly builds, so `master` should be generally unbroken before proceeding. The version of `master` should already reflect the upcoming major release version (i.e. `X.Y.0`).

1. Once `master` is in a generally stable state after extensive work, announce a "golden nightly" is incoming via the [jellyfin-dev](https://matrix.to/#/#jellyfin-dev:matrix.org) Matrix/Riot channel and Reddit.

1. Collect testing information and repeat as needed.

1. Once the release is considered stable and working, announce full PR freeze via the [jellyfin-dev](https://matrix.to/#/#jellyfin-dev:matrix.org) Matrix/Riot channel.

1. Allow one further "golden nightly" and at least 48 hours of testing time. Restart this process if major breaking bugs are found.

1. Once all testing is complete and the release remains stable, proceed.

#### Release Web Client

1. Create a release branch on the [jellyfin-web](https://github.com/jellyfin/jellyfin-web) repository via CLI from `master`, named `release-X.Y.z`, where `X` and `Y` are the new version number, and `z` is a literal `z`. Push the new branch to GitHub.

2. Create a GitHub release for the new version, based on the newly-created `release-X.Y.z` branch. The tag should be named `vX.Y.Z` (i.e. `vX.Y.0`) and the release named "Release X.Y.Z". The release body should contain the following link only, replacing the version as required:

    ```md
    [Please see the release announcement on the main repository.](https://github.com/jellyfin/jellyfin/releases/tag/vX.Y.Z)
    ```

3. Publish the release.

#### Release Server

1. Create a release branch on the [jellyfin](https://github.com/jellyfin/jellyfin) repository via CLI from `master`, named `release-X.Y.z`, where `X` and `Y` are the new version number, and `z` is a literal `z`. Push the new branch to GitHub.

2. Create a GitHub release for the new version, based on the newly-created `release-X.Y.z` branch. The tag should be named `vX.Y.Z` (i.e. `vX.Y.0`) and the release named "Release X.Y.Z". The release body should contain the following components:

   a. A quick top blurb under a `# Jellyfin X.Y.Z` header.

   a. A list of features, including in-line links to Fider if available, under a `## New Features and Major Improvements` header.

   a. A list of known release notes, categorized by the relevant platform (e.g. `[All]` or `[Windows]`), under a `## Important Release Notes` header.

   a. If applicable, a set of release notes/comments about FFmpeg, under a `## FFmpeg` header.

   a. A full changelog, split by repository with `### [repo](https://github.com/jellyfin/repo)` subheaders, under a `## Changelog` header. Each element should be a PR number and the PR title.

3. Publish the release.

4. Wait for builds to complete.

5. Announce the new release in the [jellyfin-announce](https://matrix.to/#/#jellyfin-announce:matrix.org) Matrix/Riot channel and anywhere else required (e.g. Reddit, etc.).

### Hotfix Release Procedure

1. During normal work on the `master` branch, select PRs suitable for backporting by tagging them with the `stable-backport` label during the PR lifecycle. All PRs will target `master` and thus bugfixes for the stable release must include this label to be included.

1. Collect the list of merged `stable-backport` PRs from all relevant repositories.

1. For each repository, perform stable branch reconciliation for the relevant PRs:

   1. For each PR slated for backport:

      1. Grab the *merge commit* hash for the PR from `master` branch.

      1. Cherry-pick the merge commit into the `release-x.y.z` branch via: `git cherry-pick -sx -m1 <merge-commit-hash>`.

      1. Fix any merge conflicts, generally keeping what's in the merge. If there are significant merge conflicts, this likely indicates that the fix is too large for backporting.

      1. Finalize the cherry-pick via: `git add` and `git commit -v`.

   1. For the main [jellyfin](https://github.com/jellyfin/jellyfin) repository, bump the version of the repository to the new hotfix version with the `bump_version` script and commit the result with the message "Bump version for X.Y.Z".

   1. Push the updated release branch to GitHub.

#### Web Client

1. Create a GitHub release for the new version, based on the relevant `release-X.Y.z` branch. The tag should be named `vX.Y.Z` and the release named "Release X.Y.Z". The release body should contain the following link only, replacing the version as required:

    ```md
    [Please see the release announcement on the main repository.](https://github.com/jellyfin/jellyfin/releases/tag/vX.Y.Z)
    ```

2. Publish the release on GitHub and the archive repository.

#### Server

1. Create a GitHub release for the new version, based on the relevant `release-X.Y.z` branch. The tag should be named `vX.Y.Z` and the release named "Release X.Y.Z". The release body should contain the following components:

   a. A quick top blurb under a `# Jellyfin X.Y.Z` header.

   a. A list of known release notes, categorized by the relevant platform (e.g. `[All]` or `[Windows]`), under a `## Important Release Notes` header.

   a. If applicable, a set of release notes/comments about FFmpeg, under a `## FFmpeg` header.

   a. A full changelog, split by repository with `### [repo](https://github.com/jellyfin/repo)` subheaders, under a `## Changelog` header. Each element should be a PR number and the PR title.

1. Publish the release.

1. Wait for builds to complete.

1. Announce the new release in the [jellyfin-announce](https://matrix.to/#/#jellyfin-announce:matrix.org) channel and anywhere else as required.
