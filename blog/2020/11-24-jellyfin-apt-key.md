---
title: 'Please refresh your Jellyfin Apt key on Debian/Ubuntu'
description: 'Our old key is expiring December 15th, read on to find out how to update'
authors: joshuaboniface
date: 2020-11-24
slug: jellyfin-apt-key
---

Our GPG key for signing our Debian and Ubuntu repositories (`https://repo.jellyfin.org/debian` and `https://repo.jellyfin.org/ubuntu`) is set to expire next month.

<!-- truncate -->

Unfortunately this was an oversight when we first set up this repo, and we never provided any convenient way to update this. As a remedy, we've removed the expiry on the key and put a new version on the repo. This brings us into line with numerous other 3rd-party Debian repositories, such as the Microsoft .NET and Docker repositories which also use an expiry-less key, and should avoid any such issues again, barring a need to rotate it. This does however require manually refreshing the key on your system.

Doing this is as easy as re-running the command from the install docs; it will overwrite the old key with the new one:

```console
wget -O- https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo apt-key add -
```

You can verify this worked by checking the `apt-key` output like so; this is a good practice anyways to verify that the key has not been altered, as its signatures and fingerprint should all match:

```console
$ apt-key list | grep -C2 jellyfin  # Notice the expires: field
Warning: apt-key output should not be parsed (stdout is not a terminal)
pub   rsa3072 2018-12-16 [SC] [expires: 2020-12-15]
      4918 AABC 486C A052 358D  778D 4902 3CD0 1DE2 1A7B
uid           [ unknown] Jellyfin Team <team@jellyfin.org>
sub   rsa3072 2018-12-16 [E] [expires: 2020-12-15]

$ wget -O- https://repo.jellyfin.org/jellyfin_team.gpg.key | sudo apt-key add -
[...]

$ apt-key list | grep -C2 jellyfin  # Notice the expires: is now gone
Warning: apt-key output should not be parsed (stdout is not a terminal)
pub   rsa3072 2018-12-16 [SC]
      4918 AABC 486C A052 358D  778D 4902 3CD0 1DE2 1A7B
uid           [ unknown] Jellyfin Team <team@jellyfin.org>
sub   rsa3072 2018-12-16 [E]
```

If you find this didn't work, try removing the key first with this command, then re-add it again:

```console
sudo apt-key remove 1DE21A7B
```

We've also published the key to the Ubuntu keyserver as a backup, just in case, or if you prefer this method. Our docs will retain the direct-file method however. You can use this command to obtain the key directly from the Ubuntu keyserver:

```console
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv 1DE21A7B
```

**Please ensure you refresh the key before December 15th, or you will find that `apt update` no longer works!**

GitHub Issue for reference: [https://github.com/jellyfin/jellyfin/issues/4528](https://github.com/jellyfin/jellyfin/issues/4528)

Reddit thread for reference: [https://www.reddit.com/r/jellyfin/comments/jz6u9o/debian_ubuntu_repo_users_our_key_is_expiring/](https://www.reddit.com/r/jellyfin/comments/jz6u9o/debian_ubuntu_repo_users_our_key_is_expiring/)

Thanks,
Joshua
