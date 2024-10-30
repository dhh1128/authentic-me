# Witnesses and Watchers

The calculus of human trust has depended on witnesses since the dawn of history, and that makes sense. Witnesses allow triangulation and prevent cheating. Gathering and comparing reports from multiple witnesses is fundamental.

If my identity solution is worthy of trust, it must be highly resistant to cheating by others *and by me*, and that means it needs some witness-oriented features.

Traditional identity systems don't let users cheat, but they trust big databases to record everything, and sysadmins to enforce (and honor) the rules. They do this without any public witnesses. This is a Bad Idea, as every breach reminds us.

Blockchains remove the sysadmins, and most make behavior public, but their coders become shadowy, unacknowledged pseudo-sysadmins. Plus, they are still logically centralized, and their governance can be arcane, brittle, and susceptible to forks.

Peer DIDs and cousins like did:key completely eliminate many blockchain problems, but they are either too simple or too trusting of those who create identifiers to be useful in long-lived and high-stakes contexts. Variants like did:tdw make other compromises &mdash; possibly valid in some contexts, but not optimal for my use case.

KERI's solution of witnesses (and watchers, who continuously compare what witnesses report) is the most robust and best answer I've encountered so far. However, my [thinking about tech](tech.md) tells me I can't use them directly.

Thus, I need a mechanism that provides approximately the same features as witnesses and watchers, but that provides them for humans, not machines, and that works without KERI dependencies. Also, I don't want to operate any servers, and I don't want to pay anything. It's an ambitious goal.

Here is my solution:

1. The information that I publish about my identity is hosted publicly, as a git repo, in three independent locations: https://github.com/dhh1128/authentic-me, https://bitbucket.org/daniel-hardman/authentic-me, and https://gitlab.com/dhh1128/authentic-me. These provide some of the benefits of independent witnesses (high availability, cross-checking). Each account that I have on these git hosting services uses a different username+password combination. Each is controlled by a different IT organization and hosted in a different place on different infrastructure.

1. To eliminate the risk that the history will be contaminated at creation time (hackers inserting commits), I assert that each git commit (or at least each commit that matters to trust) will either be signed by keys associated with my [daniel-as-git-committer](identifiers/daniel-as-git-commiter.md) identifier, or will be quickly superseded by signed commits that have the same effect as the unsigned commit (if I'm guilty of simple human forgetfulness). You can check whether commits are signed by looking for GitHub's <var>Verified</var> label in commit history.

1. Because I could still cheat by manually altering git history in all 3 sources, I have enabled inclusion of this repo in the [Github Archive Program](https://archiveprogram.github.com/faq/), which preserves a very-long-term record of the repo in additional places outside my control.

1. The web site view of my content is derivable from the the markdown and web code stored in the repo, via GitHub pages, which uses a publicly auditable and reproducible GitHub action. I have configured the website version of the content to be indexed by Google, other robots, and the Internet Archive.

1. I assert that all three copies of my repo will agree on the full git history, so any persistent discrepancy betwen the sources is an error. Referencing secondary archives of the repo, and secondary indexes of the website version of the content, any person can therefore act as a watcher and detect duplicity by comparing history in the secondary sources to history in the repos, and by exporting the git logs of each copy of the repo and comparing them to one another. I might be able to modify git history, but I can't do it on archives of the repos or the website that I don't control.

1. To further guarantee my own lack of duplicity and to provide a tertiary witness/watcher function, I will export my git commit log when I do substantive updates to my identity, and generate a timestamp for it using [OpenTimestamps](https://opentimestamps.org/). This constitutes a timestamped proof of existence for my git activity on the Bitcoin blockchain that I can't modify (and that an attacker who truly did hack me complete can't fake, either). I may also permanently save a copy of my git commit log on [Arweave](https://arweave.org), [IPFS](https://www.ipfs.com/), or similar.

This solution gives you:

* High availability
* A solid audit trail
* Robust, impartial witnesses protected from hackers and me
* Duplicity detection
* Storage that is likely to remain viable for decades