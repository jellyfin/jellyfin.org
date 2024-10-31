---
uid: testing-index
title: Testing
sidebar_position: 1
---

# Testing Jellyfin

In addition to contributing code, testing is also very important for Jellyfin.

## Testing Basics

Please keep the following things in mind:

1. Make regular backups. Changes from testing might be irreversible.
2. Keep everything local. It is generally not a good idea to expose testing environments to the wider internet.
3. Expect things to break, especially with non-release versions.

## The Testing Process

Below is a quick overview of the testing process:

1. Get a copy of the software to be tested.
2. Setup the testing environment. (Install software and dependencies)
3. Perform test(s).
4. Document and report findings.

## What To Test

There are 2 types of items that need to be tested on Jellyfin:

1. Testing for general bugs. This means trying to find new, previously unknown bugs.
2. Reproduction of unconfirmed issues. This means trying to reproduce issues someone else has reported.

### Testing for General Bugs

To test for general bugs, use Jellyfin normally, or try to come up with edge cases that you think might break Jellyfin and/or edge cases that have broken other pieces of software before. If you have successfully broken Jellyfin, congratulations! You might have found a previously unknown bug.

### Reproducing Unconfirmed Issues

To test for unconfirmed issues, start by browsing the GitHub Issue Tracker. Any issue that hasn't been labeled `confirmed` means that it hasn't been confirmed yet. Testing issues that have been marked `confirmed` but hasn't been tested since the last major release would also be helpful. Find an issue that you have the necessary hardware / software to reproduce, and have fun!

## Reporting Test Findings

To report test findings, start by going to the GitHub Issue Tracker of the respective component. What you would do next depends entirely on what is being tested.

### Reporting General Bugs

Start by searching the issue tracker for similar issues. If you believe an issue is a duplicate to an open issue, comment your findings there. Otherwise, open a new issue report following the template of the specific repo. Please remember to follow **ALL** instructions on the template to avoid problems with other people. After you have submitted the report, the Jellyfin Triage Team will tell you what to do next.

### Successful Reproduction of Unconfirmed Issue

If you have successfully reproduced an unconfirmed issue, please comment your findings, along with reproduction steps you have taken and exact details of your setup. They should be as detailed as possible. Once the Jellyfin Triage Team reviews your report, the issue may be marked confirmed if no further info is required.

### Unsuccessful Reproduction of Unconfirmed Issue

If you have attempted to reproduce an unconfirmed issue but failed to do so, also comment on the original issue. The Jellyfin Triage Team might close the issue or ask for further feedback from another user.
