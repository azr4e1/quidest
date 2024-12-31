+++
toc = true
hideReply = true
title = "Git rebase"
author = "Lorenzo Drumond"
date = "2024-07-24T23:03:42"
tags = ["boot_dev",  "history",  "commit",  "rebase",  "github",  "git_directory",  "primeagen",  "packed",  "programming",  "plumbing",  "states",  "optimal",  "git",  "fast_forward",  "configuration",  "compressed",  "repos",  "merging",  "index",  "snapshot",  "working_tree",  "computer_science",  "repository",  "workflow",  "stage",  "logs"]
+++



Say we have this commit history:

```
A - B - C    main
   \
    D - E    feature_branch
```

We're working on feature_branch, and want to bring in the changes our team added to main so we're not working with a stale branch. We could merge main into feature_branch, but that would create an additional merge commit. Rebase avoids a merge commit by replaying the commits from feature_branch on top of main. After a rebase, the history will look like this:

```
A - B - C         main
         \
          D - E   feature_branch
```

You generally want to rebase the _feature_ branch to the tip of the base branch, NOT THE OTHER WAY AROUND!. This allows you to merge feature into base with a fast-forward merge, which doesn't clutter commit history with merge commits.

the command to rebase is

```bash
git rebase <branch>
```

## References

- boot.dev

Next -> [git-undoing-changes](/wiki/git-undoing-changes/)
