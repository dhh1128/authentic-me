const B64ChrByIdx = new Map([
    [0, 'A'],
    [1, 'B'],
    [2, 'C'],
    [3, 'D'],
    [4, 'E'],
    [5, 'F'],
    [6, 'G'],
    [7, 'H'],
    [8, 'I'],
    [9, 'J'],
    [10, 'K'],
    [11, 'L'],
    [12, 'M'],
    [13, 'N'],
    [14, 'O'],
    [15, 'P'],
    [16, 'Q'],
    [17, 'R'],
    [18, 'S'],
    [19, 'T'],
    [20, 'U'],
    [21, 'V'],
    [22, 'W'],
    [23, 'X'],
    [24, 'Y'],
    [25, 'Z'],
    [26, 'a'],
    [27, 'b'],
    [28, 'c'],
    [29, 'd'],
    [30, 'e'],
    [31, 'f'],
    [32, 'g'],
    [33, 'h'],
    [34, 'i'],
    [35, 'j'],
    [36, 'k'],
    [37, 'l'],
    [38, 'm'],
    [39, 'n'],
    [40, 'o'],
    [41, 'p'],
    [42, 'q'],
    [43, 'r'],
    [44, 's'],
    [45, 't'],
    [46, 'u'],
    [47, 'v'],
    [48, 'w'],
    [49, 'x'],
    [50, 'y'],
    [51, 'z'],
    [52, '0'],
    [53, '1'],
    [54, '2'],
    [55, '3'],
    [56, '4'],
    [57, '5'],
    [58, '6'],
    [59, '7'],
    [60, '8'],
    [61, '9'],
    [62, '-'],
    [63, '_'],
]);
function readInt(array) {
    let value = 0;
    for (let i = 0; i < array.length; i++) {
        value = value * 256 + array[i];
    }
    return value;
}
function intToB64(i, l = 1) {
    let out = '';
    while (l != 0) {
        out = B64ChrByIdx.get(i % 64) + out;
        i = Math.floor(i / 64);
        if (i == 0) {
            break;
        }
    }
    const x = l - out.length;
    for (let i = 0; i < x; i++) {
        out = 'A' + out;
    }
    return out;
}
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function b(s) {
    return encoder.encode(s);
}
function d(u) {
    return decoder.decode(u);
}

function base64_encode(bytes) {
    // Convert the byte array to a binary string
    let bstring = "";
    for (let i = 0; i < bytes.length; i++) {
        bstring += String.fromCharCode(bytes[i]);
    }
    let b64 = btoa(bstring);
    // Convert Base64 to Base64url by replacing '+' with '-' and '/' with '_'
    let b64url = b64.replace(/\+/g, '-').replace(/\//g, '_');
    // Remove padding
    return b64url.replace(/=+$/, '');
}
function base64_decode(cesr) {
    // Convert from base64url to base64
    let b64 = cesr.replace(/-/g, '+').replace(/_/g, '/');
    // Pad if needed.
    b64 = b64.padEnd(b64.length + (4 - b64.length % 4) % 4, '=');
    const bstring = atob(b64);
    return Uint8Array.from(bstring, c => c.charCodeAt(0));
}
export class EmptyMaterialError {
    constructor(err) {
        this._err = new Error(err);
    }
    get err() {
        return this._err;
    }
}
export class Codex {
    has(prop) {
        const m = new Map(Array.from(Object.entries(this), (v) => [v[1], v[0]]));
        return m.has(prop);
    }
}
export class MatterCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Ed25519_Seed = 'A'; // Ed25519 256 bit random seed for private key
        this.Ed25519N = 'B'; // Ed25519 verification key non-transferable, basic derivation.
        this.X25519 = 'C'; // X25519 public encryption key, converted from Ed25519 or Ed25519N.
        this.Ed25519 = 'D'; // Ed25519 verification key basic derivation
        this.Blake3_256 = 'E'; // Blake3 256 bit digest self-addressing derivation.
        this.SHA3_256 = 'H'; // SHA3 256 bit digest self-addressing derivation.
        this.SHA2_256 = 'I'; // SHA2 256 bit digest self-addressing derivation.
        this.ECDSA_256k1_Seed = 'J'; // ECDSA secp256k1 256 bit random Seed for private key
        this.X25519_Private = 'O'; // X25519 private decryption key converted from Ed25519
        this.X25519_Cipher_Seed = 'P'; // X25519 124 char b64 Cipher of 44 char qb64 Seed
        this.ECDSA_256r1_Seed = 'Q'; // ECDSA secp256r1 256 bit random Seed for private key
        this.Salt_128 = '0A'; // 128 bit random salt or 128 bit number (see Huge)
        this.Ed25519_Sig = '0B'; // Ed25519 signature.
        this.ECDSA_256k1_Sig = '0C'; // ECDSA secp256k1 signature.
        this.ECDSA_256r1_Sig = '0I'; // ECDSA secp256r1 signature.
        this.StrB64_L0 = '4A'; // String Base64 Only Lead Size 0
        this.StrB64_L1 = '5A'; // String Base64 Only Lead Size 1
        this.StrB64_L2 = '6A'; // String Base64 Only Lead Size 2
        this.ECDSA_256k1N = '1AAA'; // ECDSA secp256k1 verification key non-transferable, basic derivation.
        this.ECDSA_256k1 = '1AAB'; // ECDSA public verification or encryption key, basic derivation
        this.X25519_Cipher_Salt = '1AAH'; // X25519 100 char b64 Cipher of 24 char qb64 Salt
        this.ECDSA_256r1N = '1AAI'; // ECDSA secp256r1 verification key non-transferable, basic derivation.
        this.ECDSA_256r1 = '1AAJ'; // ECDSA secp256r1 verification or encryption key, basic derivation
        this.StrB64_Big_L0 = '7AAA'; // String Base64 Only Big Lead Size 0
        this.StrB64_Big_L1 = '8AAA'; // String Base64 Only Big Lead Size 1
        this.StrB64_Big_L2 = '9AAA'; // String Base64 Only Big Lead Size 2
    }
}
export const MtrDex = new MatterCodex();
export class NonTransCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Ed25519N = 'B'; // Ed25519 verification key non-transferable, basic derivation.
        this.ECDSA_256k1N = '1AAA'; // ECDSA secp256k1 verification key non-transferable, basic derivation.
        this.Ed448N = '1AAC'; // Ed448 non-transferable prefix public signing verification key. Basic derivation.
        this.ECDSA_256r1N = '1AAI'; // ECDSA secp256r1 verification key non-transferable, basic derivation.
    }
}
export const NonTransDex = new NonTransCodex();
export class DigiCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Blake3_256 = 'E'; // Blake3 256 bit digest self-addressing derivation.
        this.Blake2b_256 = 'F'; // Blake2b 256 bit digest self-addressing derivation.
        this.Blake2s_256 = 'G'; // Blake2s 256 bit digest self-addressing derivation.
        this.SHA3_256 = 'H'; // SHA3 256 bit digest self-addressing derivation.
        this.SHA2_256 = 'I'; // SHA2 256 bit digest self-addressing derivation.
        this.Blake3_512 = '0D'; // Blake3 512 bit digest self-addressing derivation.
        this.Blake2b_512 = '0E'; // Blake2b 512 bit digest self-addressing derivation.
        this.SHA3_512 = '0F'; // SHA3 512 bit digest self-addressing derivation.
        this.SHA2_512 = '0G'; // SHA2 512 bit digest self-addressing derivation.
    }
}
export const DigiDex = new DigiCodex();
export class NumCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Short = 'M'; // Short 2 byte b2 number
        this.Long = '0H'; // Long 4 byte b2 number
        this.Big = 'N'; // Big 8 byte b2 number
        this.Huge = '0A'; // Huge 16 byte b2 number (same as Salt_128)
    }
}
export const NumDex = new NumCodex();
export class BexCodex extends Codex {
    constructor() {
        super(...arguments);
        this.StrB64_L0 = '4A'; // String Base64 Only Leader Size 0
        this.StrB64_L1 = '5A'; // String Base64 Only Leader Size 1
        this.StrB64_L2 = '6A'; // String Base64 Only Leader Size 2
        this.StrB64_Big_L0 = '7AAA'; // String Base64 Only Big Leader Size 0
        this.StrB64_Big_L1 = '8AAA'; // String Base64 Only Big Leader Size 1
        this.StrB64_Big_L2 = '9AAA'; // String Base64 Only Big Leader Size 2
    }
}
export const BexDex = new BexCodex();
class SmallVarRawSizeCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Lead0 = '4'; // First Selector Character for all ls == 0 codes
        this.Lead1 = '5'; // First Selector Character for all ls == 1 codes
        this.Lead2 = '6'; // First Selector Character for all ls == 2 codes
    }
}
export const SmallVrzDex = new SmallVarRawSizeCodex();
class LargeVarRawSizeCodex extends Codex {
    constructor() {
        super(...arguments);
        this.Lead0_Big = '7'; // First Selector Character for all ls == 0 codes
        this.Lead1_Big = '8'; // First Selector Character for all ls == 1 codes
        this.Lead2_Big = '9'; // First Selector Character for all ls == 2 codes
    }
}
export const LargeVrzDex = new LargeVarRawSizeCodex();
export class Sizage {
    constructor(hs, ss, fs, ls) {
        this.hs = hs;
        this.ss = ss;
        this.fs = fs;
        this.ls = ls;
    }
}
export class Matter {
    constructor({ raw, code = MtrDex.Ed25519N, qb64b, qb64, qb2, rize, }) {
        this._code = '';
        this._size = -1;
        this._raw = new Uint8Array(0);
        let size = -1;
        if (raw != undefined) {
            if (code.length == 0) {
                throw new Error('Improper initialization need either (raw and code) or qb64b or qb64 or qb2.');
            }
            if (SmallVrzDex.has(code[0]) || LargeVrzDex.has(code[0])) {
                if (rize !== undefined) {
                    if (rize < 0)
                        throw new Error(`missing var raw size for code=${code}`);
                }
                else {
                    rize = raw.length;
                }
                const ls = (3 - (rize % 3)) % 3; // calc actual lead (pad) size
                size = Math.floor((rize + ls) / 3); // calculate value of size in triplets
                if (SmallVrzDex.has(code[0])) {
                    if (size <= 64 ** 2 - 1) {
                        const hs = 2;
                        const s = Object.values(SmallVrzDex)[ls];
                        code = `${s}${code.substring(1, hs)}`;
                    }
                    else if (size <= 64 ** 4 - 1) {
                        const hs = 4;
                        const s = Object.values(LargeVrzDex)[ls];
                        code = `${s}${'AAAA'.substring(0, hs - 2)}${code[1]}`;
                    }
                    else {
                        throw new Error(`Unsupported raw size for code=${code}`);
                    }
                }
                else {
                    if (size <= 64 ** 4 - 1) {
                        const hs = 4;
                        const s = Object.values(LargeVrzDex)[ls];
                        code = `${s}${code.substring(1, hs)}`;
                    }
                    else {
                        throw new Error(`Unsupported raw size for code=${code}`);
                    }
                }
            }
            else {
                const sizage = Matter.Sizes.get(code);
                if (sizage.fs == -1) {
                    // invalid
                    throw new Error(`Unsupported variable size code=${code}`);
                }
                rize = Matter._rawSize(code);
            }
            raw = raw.slice(0, rize); // copy only exact size from raw stream
            if (raw.length != rize) {
                // forbids shorter
                throw new Error(`Not enougth raw bytes for code=${code} expected ${rize} got ${raw.length}.`);
            }
            this._code = code; // hard value part of code
            this._size = size; // soft value part of code in int
            this._raw = raw; // crypto ops require bytes not bytearray
        }
        else if (qb64 !== undefined) {
            this._exfil(qb64);
        }
        else if (qb64b !== undefined) {
            const qb64 = d(qb64b);
            this._exfil(qb64);
        }
        else if (qb2 !== undefined) {
            this._bexfil(qb2);
        }
        else {
            throw new EmptyMaterialError('EmptyMaterialError');
        }
    }
    get code() {
        return this._code;
    }
    get size() {
        return this._size;
    }
    get raw() {
        return this._raw;
    }
    get qb64() {
        return this._infil();
    }
    get qb64b() {
        return b(this.qb64);
    }
    get transferable() {
        return !NonTransDex.has(this.code);
    }
    get digestive() {
        return DigiDex.has(this.code);
    }
    static _rawSize(code) {
        const sizage = this.Sizes.get(code); // get sizes
        const cs = sizage.hs + sizage.ss; // both hard + soft code size
        if (sizage.fs === -1) {
            throw Error(`Non-fixed raw size code ${code}.`);
        }
        return Math.floor(((sizage.fs - cs) * 3) / 4) - sizage.ls;
    }
    static _leadSize(code) {
        const sizage = this.Sizes.get(code);
        return sizage.ls;
    }
    get both() {
        const sizage = Matter.Sizes.get(this.code);
        return `${this.code}${intToB64(this.size, sizage.ss)}`;
    }
    _infil() {
        const code = this.code;
        const size = this.size;
        const raw = this.raw;
        const ps = (3 - (raw.length % 3)) % 3; // pad size chars or lead size bytes
        const sizage = Matter.Sizes.get(code);
        if (sizage.fs === undefined) {
            // Variable size code, NOT SUPPORTED
            const cs = sizage.hs + sizage.ss;
            if (cs % 4) {
                throw new Error(`Whole code size not multiple of 4 for variable length material. cs=${cs}`);
            }
            if (size < 0 || size > 64 ** sizage.ss - 1) {
                throw new Error(`Invalid size=${size} for code=${code}.`);
            }
            const both = `${code}${intToB64(size, sizage.ss)}`;
            if (both.length % 4 !== ps - sizage.ls) {
                throw new Error(`Invalid code=${both} for converted raw pad size=${ps}.`);
            }
            const bytes = new Uint8Array(sizage.ls + raw.length);
            for (let i = 0; i < sizage.ls; i++) {
                bytes[i] = 0;
            }
            for (let i = 0; i < raw.length; i++) {
                const odx = i + ps;
                bytes[odx] = raw[i];
            }
            return both + base64_encode(bytes);
        }
        else {
            const both = code;
            const cs = both.length;
            if (cs % 4 != ps - sizage.ls) {
                // adjusted pad given lead bytes
                throw new Error(`Invalid code=${both} for converted raw pad size=${ps}, ${raw.length}.`);
            }
            // prepad, convert, and replace upfront
            // when fixed and ls != 0 then cs % 4 is zero and ps==ls
            // otherwise  fixed and ls == 0 then cs % 4 == ps
            const bytes = new Uint8Array(ps + raw.length);
            for (let i = 0; i < ps; i++) {
                bytes[i] = 0;
            }
            for (let i = 0; i < raw.length; i++) {
                const odx = i + ps;
                bytes[odx] = raw[i];
            }
            return both + base64_encode(bytes).slice(cs % 4);
        }
    }
    _exfil(qb64) {
        if (qb64.length == 0) {
            throw new Error('Empty Material');
        }
        const first = qb64[0];
        if (!Array.from(Matter.Hards.keys()).includes(first)) {
            throw new Error(`Unexpected code ${first}`);
        }
        const hs = Matter.Hards.get(first);
        if (qb64.length < hs) {
            throw new Error(`Shortage Error`);
        }
        const hard = qb64.slice(0, hs);
        if (!Array.from(Matter.Sizes.keys()).includes(hard)) {
            throw new Error(`Unsupported code ${hard}`);
        }
        const sizage = Matter.Sizes.get(hard);
        const cs = sizage.hs + sizage.ss;
        let size = -1;
        if (sizage.fs == -1) {
            // Variable size code, Not supported
            throw new Error('Variable size codes not supported yet');
        }
        else {
            size = sizage.fs;
        }
        if (qb64.length < sizage.fs) {
            throw new Error(`Need ${sizage.fs - qb64.length} more chars.`);
        }
        qb64 = qb64.slice(0, sizage.fs);
        const ps = cs % 4;
        const pbs = 2 * (ps == 0 ? sizage.ls : ps);
        let raw;
        if (ps != 0) {
            const base = new Array(ps + 1).join('A') + qb64.slice(cs);
            const paw = base64_decode(base); // decode base to leave prepadded raw
            const pi = readInt(paw.subarray(0, ps)); // prepad as int
            if (pi & (2 ** pbs - 1)) {
                // masked pad bits non-zero
                throw new Error(`Non zeroed prepad bits = {pi & (2 ** pbs - 1 ):<06b} in {qb64b[cs:cs+1]}.`);
            }
            raw = paw.subarray(ps); // strip off ps prepad paw bytes
        }
        else {
            const base = qb64.slice(cs);
            const paw = base64_decode(base);
            const li = readInt(paw.subarray(0, sizage.ls));
            if (li != 0) {
                if (li == 1) {
                    throw new Error(`Non zeroed lead byte = 0x{li:02x}.`);
                }
                else {
                    throw new Error(`Non zeroed lead bytes = 0x{li:04x}`);
                }
            }
            raw = paw.subarray(sizage.ls);
        }
        this._code = hard; // hard only
        this._size = size;
        this._raw = Uint8Array.from(raw); // ensure bytes so immutable and for crypto ops
    }
    _bexfil(qb2) {
        throw new Error(`qb2 not yet supported: ${qb2}`);
    }
}
Matter.Sizes = new Map(Object.entries({
    A: new Sizage(1, 0, 44, 0),
    B: new Sizage(1, 0, 44, 0),
    C: new Sizage(1, 0, 44, 0),
    D: new Sizage(1, 0, 44, 0),
    E: new Sizage(1, 0, 44, 0),
    F: new Sizage(1, 0, 44, 0),
    G: new Sizage(1, 0, 44, 0),
    H: new Sizage(1, 0, 44, 0),
    I: new Sizage(1, 0, 44, 0),
    J: new Sizage(1, 0, 44, 0),
    K: new Sizage(1, 0, 76, 0),
    L: new Sizage(1, 0, 76, 0),
    M: new Sizage(1, 0, 4, 0),
    N: new Sizage(1, 0, 12, 0),
    O: new Sizage(1, 0, 44, 0),
    P: new Sizage(1, 0, 124, 0),
    Q: new Sizage(1, 0, 44, 0),
    '0A': new Sizage(2, 0, 24, 0),
    '0B': new Sizage(2, 0, 88, 0),
    '0C': new Sizage(2, 0, 88, 0),
    '0D': new Sizage(2, 0, 88, 0),
    '0E': new Sizage(2, 0, 88, 0),
    '0F': new Sizage(2, 0, 88, 0),
    '0G': new Sizage(2, 0, 88, 0),
    '0H': new Sizage(2, 0, 8, 0),
    '0I': new Sizage(2, 0, 88, 0),
    '1AAA': new Sizage(4, 0, 48, 0),
    '1AAB': new Sizage(4, 0, 48, 0),
    '1AAC': new Sizage(4, 0, 80, 0),
    '1AAD': new Sizage(4, 0, 80, 0),
    '1AAE': new Sizage(4, 0, 56, 0),
    '1AAF': new Sizage(4, 0, 8, 0),
    '1AAG': new Sizage(4, 0, 36, 0),
    '1AAH': new Sizage(4, 0, 100, 0),
    '1AAI': new Sizage(4, 0, 48, 0),
    '1AAJ': new Sizage(4, 0, 48, 0),
    '2AAA': new Sizage(4, 0, 8, 1),
    '3AAA': new Sizage(4, 0, 8, 2),
    '4A': new Sizage(2, 2, undefined, 0),
    '5A': new Sizage(2, 2, undefined, 1),
    '6A': new Sizage(2, 2, undefined, 2),
    '7AAA': new Sizage(4, 4, undefined, 0),
    '8AAA': new Sizage(4, 4, undefined, 1),
    '9AAA': new Sizage(4, 4, undefined, 2),
    '4B': new Sizage(2, 2, undefined, 0),
    '5B': new Sizage(2, 2, undefined, 1),
    '6B': new Sizage(2, 2, undefined, 2),
    '7AAB': new Sizage(4, 4, undefined, 0),
    '8AAB': new Sizage(4, 4, undefined, 1),
    '9AAB': new Sizage(4, 4, undefined, 2),
}));
Matter.Hards = new Map([
    ['A', 1],
    ['B', 1],
    ['C', 1],
    ['D', 1],
    ['E', 1],
    ['F', 1],
    ['G', 1],
    ['H', 1],
    ['I', 1],
    ['J', 1],
    ['K', 1],
    ['L', 1],
    ['M', 1],
    ['N', 1],
    ['O', 1],
    ['P', 1],
    ['Q', 1],
    ['R', 1],
    ['S', 1],
    ['T', 1],
    ['U', 1],
    ['V', 1],
    ['W', 1],
    ['X', 1],
    ['Y', 1],
    ['Z', 1],
    ['a', 1],
    ['b', 1],
    ['c', 1],
    ['d', 1],
    ['e', 1],
    ['f', 1],
    ['g', 1],
    ['h', 1],
    ['i', 1],
    ['j', 1],
    ['k', 1],
    ['l', 1],
    ['m', 1],
    ['n', 1],
    ['o', 1],
    ['p', 1],
    ['q', 1],
    ['r', 1],
    ['s', 1],
    ['t', 1],
    ['u', 1],
    ['v', 1],
    ['w', 1],
    ['x', 1],
    ['y', 1],
    ['z', 1],
    ['0', 2],
    ['1', 4],
    ['2', 4],
    ['3', 4],
    ['4', 2],
    ['5', 2],
    ['6', 2],
    ['7', 4],
    ['8', 4],
    ['9', 4],
]);
