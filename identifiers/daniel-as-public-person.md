---
layout: default
title: daniel-as-public-person (EGZ_DdmzryjQOtOdQauTm_YxggbVM7EWelk8IBxsnC-d)
---
<!-- 
CFA1=identifier,,EGZ_DdmzryjQOtOdQauTm_YxggbVM7EWelk8IBxsnC-d
-->
# Root identifier
When cybersecurity and cryptographic evidence matter, this value is the root identifier that I will use to refer to myself publicly as a human being:

    EGZ_DdmzryjQOtOdQauTm_YxggbVM7EWelk8IBxsnC-d

I created this value using a process I'll describe below. I control it, I can [prove this control](#proving-control), no AI or hacker should be able to construct equivalent evidence, and I intend to maintain this control for the foreseeable future, across evolutions of technology and the internet. Anything that I do publicly that needs provable authenticity MUST trace its authority back to this identifier, to be in harmony with what I'm committing to here. I hope you trust this identifier based on my reasoning in [Why trust this source?](../why-trust.md)

I use the label `daniel-as-public-person` to refer to this identifier. If you run into that label and my identity is the context, this identifier is what I'm talking about. However, the label is just a convenience that's not globally unique, and in your local world, you can label it however you like. It is the identifier, not its label, that matters when analyzing security.

## Proving control
I prove control of this identifier with cryptographic keys, via digital signatures. It is a multisig identifier in roughly the way that KERI uses that term. (In fact, nearly all the mechanisms described here come from KERI, with minimal adaptation so humans rather than machines can evaluate them.) Multiple keys control the identifier as a group, not individually. Each key is stored, managed, and protected differently. Variety means that it is very unlikely I will lose control of more than one key at a time. As a result, hacks or changing circumstances should not undermine control of the identifier as a whole.

I can take two kinds of actions with this identifier:

1. **key events**: events that change key state or its rules (substantive edits to this file)
2. **transaction events**: events such as signing arbitrary data

Key events are recorded in a key event log that's a sibling to this document. Its name is [`kel`](kel.md). (Key events are also implied by the [git commit history of this file itself](https://github.com/dhh1128/authentic-me/commits/main/identifiers/daniel-as-public-person.md).) Transaction events are recorded in a transaction event log that's also a sibling. Its name is `tel.md`. (And it also has a [git commit history](https://github.com/dhh1128/authentic-me/commits/main/identifiers/daniel-as-public-person.md) that you can inspect.)

Whenever I take an official action with `daniel-as-public-persona`, I will record the event, and links to the evidence that proves my intention to do it, in the corresponding event log. Actions that are attributed to this identifier MUST be logged appropriately; if they are not, please DO NOT impute them to `daniel-as-public-persona`. 

When I record an event in this way, the log MUST cite enough signatures from different individual keys that the cumulative evidence of my intent exceeds a numeric threshold of 1. If you see an action that doesn't meet that criteria, please DO NOT accept it as legitimate; it could be either an abandoned action or a hacking attempt.

Once an official action has accumulated enough signatures, I will also timestamp the evidence. This establishes a point in time before which the action must have occurred. This is a protection against retrograde attacks; if an attacker ever steals my keys in the future, they will not be able to pretend I took actions in the past, because they will not be able to associate that action with a timestamp in the past. Please DO NOT attribute to any action a timestamp earlier than one that can be proved in this way.

### Signing keys
For transaction events, exactly and only public keys from the following list MUST be used to verify a signature that counts 1/2 a unit toward the required threshold value of 1:

* BB__61OAGzMF9dpfYcbEbmH7X_Q4a__sy-209hZGrXY6
* BHWJwEMi2gGoCWsk6IChJWXB_IxO101SowNSXFkw8dNB
* BP2PbpDx91QUqO8huIs6nR5PV9pUpcHsJTH3vNfP8joZ

(These key values are Ed25519 expressed in CESR format, but you can use [my cvtkey tool](tools/cvtkey.html) or snippets of publicly available or AI-generated code to convert them to SSH, hex, and other formats.)

The rules above mean that I have a 2-of-N scheme: any 2 signatures from these keys constitute binding evidence.

### Rotation keys
The only action that this identifier can take that is governed by different rules is the action of rotating its own signing keys. A rotation is defined as an action that changes the list of signing keys or the threshold rules for those keys.

A rotation MUST still be signed by a threshold of the signing keys. In addition, it MUST also update the signing keys list above by adding new signing keys values having CESR representations that, when hashed as text by a Blake3 algorithm, and re-encoded as CESR, produce one of the values in the following list:

*
* 
* 

In addition, a rotation MUST be signed by the new threshold of new signing keys, demonstrating that I am in control of the new signing keys as well as the old ones. And a rotation MUST designate new rotation keys by adding more hashes to the list above.

I am committing to the rotation key values ahead of time so an attacker who somehow takes over two of my signing keys cannot rotate to an arbitrary value -- only to keys that I control. Because I add additional variety in the management of these keys, a hacker who steals signing keys is still unlikely to subvert the rotation, and I can take back control. I provide hashes of the future keys, rather than the public keys themselves, so the key values are not revealed until they are actually used.

## Key Event Log
Specific details may evolve. For example, I might change signing keys or threshold rules (a rotation). Every time something like this happens, I MUST note it in the table below, or the event is not valid, and my [witnesses and watchers](../witnesses-and-watchers.md) must agree that I have done so.

Actions taken by this identifier (e.g., to sign a document) are handled in a [Transaction Event Log](EGZ_DdmzryjQOtOdQauTm_YxggbVM7EWelk8IBxsnC-d-TEL.md). Some of these actions may be anchored back here.

Non-substantive changes (e.g., to clarify my explanations or fix hyperlinks) are visible in the git commit log but are not logged as formal events because they have no cryptographic significance.

\# | UTC timestamp | prior git commit | type | data
--- | --- | --- | --- | ---
1 | 8 Oct 2024 | | inception | | 

