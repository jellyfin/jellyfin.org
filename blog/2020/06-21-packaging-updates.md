---
title: "Packaging Updates for 10.6.0"
description: "Some backend packaging changes are here: what you should know"
authors: joshuaboniface
date: 2020-06-21
slug: packaging-updates
---

Packaging and building binaries for releases and testing has long been an issue for us. From fighting with duct-tape-and-coat-hanger scripts, to testing breaking changes, to massaging official releases, how we were doing things for the last year-and-a-half needed some improvements.

Luckily, today they are all completed. In this post, I'll detail the changes as well as what the entail for our users.

For a brief TL;DR: for most users of our stable releases, not much will change, and you will upgrade to 10.6.0 as you always have. For anyone using nightlies for testing, advanced setups, or who are just curious - read on!

<!-- truncate -->

### Split Builds

The first main component of the packaging changes is split builds. Previously, we were relying on some serious hackery in order to build both the Web UI ([https://github.com/jellyfin/jellyfin-web](https://github.com/jellyfin/jellyfin-web)) and Server ([https://github.com/jellyfin/jellyfin](https://github.com/jellyfin/jellyfin)) and combine them into one package. Ultimately, with the sheer number of changes in both repositories and speed at which updates happen, along with our eventual goal to decouple the two from each other for releases, this sort of solution had reached its limits. This is perhaps best exemplified by the mostly-unseen work I had to do to get 10.5.4 and 10.5.5 to build at all.

With split packages, the two repositories are now built completely independently for all platforms. If you build the `jellyfin-web` repository, you get out a Docker image, `.deb` packages, `.rpm` packages, or a `.tar.gz` archive that just contains the Web UI. Similarly, if you build the `jellyfin` repository, you get out the various Docker, `.deb`, `.rpm`, `.tar.gz`, and `.zip` archives you know and love.

The main difference is the naming - the `jellyfin-web` repository binaries are named, well, `jellyfin-web`, and the `jellyfin` repository binaries are named `jellyfin-server`. So, to use Debian as an example, where there was once `jellyfin`, there is now `jellyfin-web` and `jellyfin-server`. But don't worry, `jellyfin` is not gone - we'll get to that shortly.

### Azure Pipelines builds

Our previous build infrastructure consisted of a veritable spaghetti factory of Bash, Python, and Docker scripts that were executed on our build server, a DigitalOcean droplet. For the most part, it worked, but the process was very fragile, opaque (I'm not even sure *I* understand how it all worked all the time, and I wrote it all!), and resource-intensive.

As we've moved more and more functions to Azure for testing, verification, linting, etc. in the various repositories, it became obvious that Azure Pipelines had a lot of flexibility, and would be able to perform nearly all of our build steps for us. This eliminated at least 2/3 of the build server, and gives us another cool option - unstable builds, which I'll touch on shortly.

The Azure Pipelines build handles the actual building of all the archives for both repositories mentioned in the previous section, uploads the binary artifacts to the build server, and then kicks off a single script to handle the last 1/3 of the process, making things much clearer, more obvious, and with results visible to everyone in our Azure project page.

### Metapackages and Metaimages

I previously mentioned that the package which used to be called `jellyfin` is now called `jellyfin-server`, and does not contain the Web UI. So, how do you get it all? And how will upgrades be seamless? The answer is metapackages, metaarchives, and metaimages! These new components can be found in [this repository page](https://github.com/jellyfin/jellyfin-metapackages), specifically the Docker images which will now be the source of truth for those configurations. I'll outline how each platform behaves below.

For Docker, the Azure pipelines split builds create docker images called `jellyfin/jellyfin-server` and `jellyfin/jellyfin-web`. On their own they're not too useful, but exist to enable the next step. When an Azure build finishes and has uploaded these images, a script is kicked off on our build server which builds the `jellyfin/jellyfin` "metaimage", which will take the two separate images, and combine them into a single Docker image along with all the components to run them, like `jellyfin-ffmpeg`, then push the resulting image. The end result is a single image, `jellyfin/jellyfin`, like there has always been, but the builds are done independently rather than relying on `git clone`/archive downloads inside the build steps and other shenanigans.

For Debian and Ubuntu, the Azure pipelines split builds create separate `.deb` packages for each component. Unlike Docker, these are fully usable on their own, and installing Jellyfin in 10.6.0+ can be done with `apt install jellyfin-server jellyfin-web` if one wishes. The metapackage is a separate `.deb`, called `jellyfin`, who's only function is to have dependencies on these two component packages. Thus, installing `jellyfin` will automatically install `jellyfin-server` and `jellyfin-web`, along with the other required dependencies from each. This is how upgrades will be seamless from previous versions: upgrading from the old `jellyfin` to the new `jellyfin` will automatically pull in the two new subpackages and remove the old one, with no interruptions.

For Fedora and CentOS, the setup is similar to Debian/Ubuntu, with the only difference being the metapackage is a component of the `jellyfin-server` repository and is thus only rebuilt when that repository is. However, since we do not provide a "proper" repository for these packages like we do for Debian/Ubuntu, the impact should be quite low, and will be nonexistent for stable releases.

For Windows installers and MacOS `.app` packages, the process remains a little more complicated and a WIP, but those will continue to work on release.

For the remaining platforms, including the archive packages for Windows, MacOS, Linux, and .NET portable, the process takes the two separate `.tar.gz` / `.zip` archives from the build process, and combines them into a single `jellyfin` archive of the same type, which puts the two component parts in their respective places. Thus, like all the others mentioned above, the change should be invisible to users by downloading the "combined" version of the archives.

### Unstable builds

One of the cool things that this new setup enables is "unstable" builds. For quite a while now, we've been providing (when not broken) "nightly" builds, which as their name implies are build every night if there were merged PRs from the previous day. However, these had a number of drawbacks. First, they broke a lot; second, on a busy day it would be possible for there to be up to a dozen separate PRs that made up the nightly changeset; third, they could often be totally messed up in terms of contents, for instance if the unsplit build grabbed the wrong version of Web.

The new split builds, Azure builds, and metapackages/metaimages instead let us do something far superior: build "unstable" releases for *every merged PR*. We don't have to worry about resource usage (Azure provides this), disk space, or other aspects of the build process. We can know immediately if something breaks. And most importantly, it lets anyone test our master branch in a very clear way, knowing *exactly* what version of the repository you are using and what the last merged PR was if something goes wrong.

Unstable builds are versioned based on the Azure build ID, which is in the format "[date].[id]", for example "20200620.12" for the 12th build on June 20th 2020. Thus this version string will tell you exactly which Azure build generated the binary, and thus which PR in which repository triggered it. For those binaries with changelogs (`.deb` and `.rpm` packages only for now), the changelog data includes the PR ID explicitly as well.

### Using Unstable builds

Using unstable builds is a bit different than the previous nightlies. For those, the packages/images were named `jellyfin-nightly` or `jellyfin:nightly` (for Docker) and were stored in the same repositories. This has now changed somewhat, and I'll detail the changes to each platform below. Note that, at least until 10.6.0 is released, we will continue to build `nightly` images as we always have, after which they will be turned off in favour of `unstable` builds exclusively, so if you like to live on the bleeding edge, please review this section in detail and make the required changes as soon as you can.

For Docker, the new unstable builds are available with the `unstable` tag, e.g. `jellyfin/jellyfin:unstable`, or at a specific version tag, for instance `jellyfin/jellyfin:20200620.12-unstable`. Following the main `unstable` tag will ensure you can always grab the latest unstable build, while the versioned tags allow you to pull specific builds for testing or debugging.

For Debian and Ubuntu, where the unstable images are stored has changed. As mentioned, previously they were part of the `main` section of the repository with the alternate name `jellyfin-nightly`, and this is no longer the case for unstable. Instead, a separate repository "component" called `unstable` has been created to house the unstable builds, and they are not renamed. To enable this extra component, add a line to your `/etc/apt/sources.list.d/jellyfin.list` like the following, which is identical to the existing line except with `main` replaced by `unstable`: `deb [arch=amd64] https://repo.jellyfin.org/debian buster unstable`. Because of how the versioning works, once you enable this additional source, you will always get the `unstable` packages with their "very high" version numbers over the stable releases, so to disable unstable builds, you must remove this extra line, run `apt update`, remove the old package(s), then install the stable version.

For all other releases, since the source was always files downloaded from [our repository site](https://repo.jellyfin.org/releases), not much will change - instead of downloading files from the `nightly/` folder of your platform, download from the `unstable/` folder. Note that these folders will, because of the split builds, contain separate subfolders for `server`, `web`, and `combined`; generally you will want `combined`. You can then use these archives as you always have.

### Conclusions

Thank you for reading this description of our build changes. We continue to test these extensively to work out any bugs, but if you have questions or feedback, please drop us a message on Matrix!

We hope to see you very soon for 10.6.0, and many future releases with this new format!
