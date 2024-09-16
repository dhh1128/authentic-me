# Identifiers

Identifiers that I reference here will typically have certain features.

## Canonical form

In general, the canonical form of my identifiers will follow [KERI](https://trustoverip.github.io/tswg-keri-specification/)'s conventions: they will be [CESR](https://trustoverip.github.io/tswg-cesr-specification/)-encoded strings with the same semantics that KERI expects. You can go read the CESR spec, but basically, this means a raw byte stream of some kind is encoded using URL-safe base64 (see [section 5 of RFC 4648](https://www.rfc-editor.org/rfc/rfc4648#section-5)), and prefixed with a single alpha that describes the type and quantity of the bytes. For example, an Ed25519 public key is 32 bytes. Encoding those bytes as URL-safe base64 takes 43 bytes. The CESR prefix for an Ed25519 public key used as an identifier is `B`. Thus, if an Ed25519 public key is encoded in CESR, it becomes a 44-byte string beginning with `B` and followed by 43 bytes from the URL-safe base64 alphabet. You can convert it back to raw bytes and from there into other formats, as needed. Details:

prefix | meaning | full identifier
--- | --- | ---
B | Ed25519 public key as static identifier | 44 bytes including prefix
E | Blake3-256 digest of content, including of inception events for complex identifiers | 44 bytes including prefix
H | SHA3-256 digest of content | 44 bytes including prefix

I may also use UUIDs for certain cases where cryptographic proof of control is unnecessary (e.g., for some [CFA](https://dhh1128.github.io/cfa)s).

## Keys

Except for UUIDs, identifiers will be [resolvable to public keys](resolution.md) that prove control of the identifier.

## Storage

Each important identifiers that I create will have a dedicated folder, here on the site. The folder will have the same name as the identifier's canonical form. It will contain an index file describing the identifier, as well as other artifacts.

## Short form

When an identifier value has already been given once in a given context, subsequent references to that identifier will use a short form that consists of the first 4 and the last 4 characters of the identifier, separated by 3 dots: `E24a...49Cw`.

## Alternate forms

Some identifiers can also be rendered in other forms, such as a DID or a PEM-formatted SSH key. These forms should be considered synonyms as far as what they identify, but using the alternate form may change what kinds of security features are active. 

## Alias

Each identifier that I publish will have a human-friendly name, typically in the form "Daniel-as-<var>role</var>". The role should make it clear why the identifier would be appropriate in some contexts, and inappropriate in others. Aliases are helpful hints about which identifier is intended; they are NOT themselves identifiers. Any evidence will be based on identifiers rather than the aliases that give them easy for humans to reference.

## Log

Each identifier will have a log that records things I do with it.

## Lifecycle

Not all identifiers are intended to last forever. They will all have a creation date, and some will be retired. A retired identifier doesn't cease to convey meaning; it just references something that can't acquire any new scope of reference in the future.
