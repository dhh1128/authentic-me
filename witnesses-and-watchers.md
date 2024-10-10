# Witnesses and Watchers

I need a mechanism that provides the same benefits as KERI witnesses and watchers, but that provides them for any human who has trust questions, wehther or not they know KERI. Plus, I don't want to operate any servers, and I don't want to pay anything. Here is my solution:

1. The information that I publish about my identity is hosted publicly, as a git repo, in three independent locations: https://github.com/dhh1128/authentic-me, https://bitbucket.org/daniel-hardman/authentic-me, and https://gitlab.com/dhh1128/authentic-me. I guarantee that each account that I have on these git hosting services uses a different username+password combination. Each is controlled by a different IT organization and hosted in a different place on different infrastructure.

1. I assert that all three sources will agree on the full git history, so any persistent discrepancy betwen the sources is an error.

1. The web site view of my content is derivable from the the markdown and web code stored in the repo, via GitHub pages, which uses a publicly auditable and reproducible GitHub action.

1. I assert that each git commit (or at least each commit that matters to trust) will either be signed by keys associated with my [daniel-as-git-committer](identifiers/daniel-as-git-commiter.md) identifier, or will be quickly superseded by signed commits that have the same effect as the unsigned commit (if I'm guilty of simple human forgetfulness). You can check whether commits are signed by looking for GitHub's <var>Verified</var> label in commit history.

1. To guarantee my own lack of duplicity, I will export my git commit log when I do substantive updates to my identity, and generate a timestamp for it using [OpenTimestamps](https://opentimestamps.org/). This constitutes a timestamped proof of existence for my git activity on the Bitcoin that I can't modify (and that an attacker who truly did hack me complete can't fake, either). I may also permanently save a copy of my git commit log on [Arweave](https://arweave.org), [IPFS](https://www.ipfs.com/), or similar.

This solution gives you:

* A solid audit trail
* High availability
* Robust, impartial witnesses protected from hackers and me
* Duplicity detection
* Storage that is likely to remain viable for decades

