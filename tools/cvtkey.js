import { el, reset } from './util.js';

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const VARIANTS = {
  'hex': {'pat': /^(\s*)([a-fA-F0-9]){64}?/gm, 'toRaw': hexToRawBytes, 'fromRaw': rawBytesToHex},
  'SSH': {'pat': /^\s*(ssh-[a-z0-9]+[ \t]+)?(AAAA[-_=+\/a-zA-Z0-9]+)(?:[ \t]([^ \t\r\n]+))?/gm, 'toRaw': SSHToRawBytes, 'fromRaw': rawBytesToSSH},
  'CESR': {'pat': /^\s*([A-Z])([-_=+\/a-zA-Z0-9]{43}\s*$)?/gm, 'toRaw': CESRToRawBytes, 'fromRaw': rawBytesToCESR},
  'did:peer': {'pat': /^\s*(did:peer:0z6Mk)([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44})(?:\?|$)/gm, 'toRaw': base58Decode, 'fromRaw': rawBytesToDIDPeer},
  'did:key': {'pat': /^\s*(did:key:z6Mk)?([123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{43,44})/gm, 'toRaw': base58Decode, 'fromRaw': rawBytesToDIDKey}
};

function reportParse(msg, isError) {
  const parseMsgElement = el('parsemsg');
  if (isError) {
    parseMsgElement.classList.add('error');
  } else {
    parseMsgElement.classList.remove('error');
  }
  parseMsgElement.innerText = msg;
}

function cvtkey() {
  const val = el('val').value;
  reset();
  let rawBytes = null;
  for (const key in VARIANTS) {
    const v = VARIANTS[key];
    const pat = v['pat'];
    // Reset the regex to start from the beginning. This is necessary because the regex is stateful.
    pat.lastIndex = 0;
    const match = pat.exec(val);
    if (match) {
      rawBytes = v['toRaw'](match[2]);
      reportParse("Detected " + key + " input.");
      break;
    }
  }
  if (!rawBytes) {
    reportParse("Unrecognized input format.", true);
    return;
  }
  for (const key in VARIANTS) {
    const v = VARIANTS[key];
    el(key).value = v['fromRaw'](rawBytes);
  }
}
document.querySelector('#converter').addEventListener('click', cvtkey);

function SSHToRawBytes(base64Key) {
  const rawKey = Uint8Array.from(atob(base64Key), c => c.charCodeAt(0));
  function readUint32BE(buffer, offset) {
      return (buffer[offset] << 24) | (buffer[offset + 1] << 16) | 
            (buffer[offset + 2] << 8) | buffer[offset + 3];
  }
  let offset = 0;
  const algLength = readUint32BE(rawKey, offset);
  offset += 4;
  const algorithm = String.fromCharCode(...rawKey.slice(offset, offset + algLength));
  offset += algLength;
  if (algorithm !== "ssh-ed25519") {
      throw new Error("Not an Ed25519 key.");
  }
  const pubKeyLength = readUint32BE(rawKey, offset);
  offset += 4;
  if (pubKeyLength !== 32) {
      throw new Error("Invalid Ed25519 public key length. Expected 32 bytes.");
  }
  const bytes = rawKey.slice(offset, offset + pubKeyLength);
  return bytes;
}

function CESRToRawBytes(cesr) {
  // Convert from base64url to base64
  let b64 = cesr.replace(/-/g, '+').replace(/_/g, '/');
  // Pad if needed.
  b64 = b64.padEnd(b64.length + (4 - b64.length % 4) % 4, '=');
  const bstring = atob(b64);
  return Uint8Array.from(bstring, c => c.charCodeAt(0));
}

function rawBytesToSSH(rawBytes, comment="user@host") {
    // Helper function to convert a string to Uint8Array (for the key type).
    function stringToUint8Array(str) {
        return new Uint8Array([...str].map(char => char.charCodeAt(0)));
    }

    // SSH key type prefix "ssh-ed25519" in bytes
    const keyType = stringToUint8Array("ssh-ed25519");

    // Length of the key type prefix in 4 bytes (big-endian)
    const keyTypeLength = new Uint8Array(4);
    // Store length in the last byte (big-endian)
    keyTypeLength[3] = keyType.length;
    const keyLength = new Uint8Array(4);
    keyLength[3] = rawBytes.length;

    // Concatenate the length-prefixed key type and the length-prefixed raw key bytes
    const sshBuffer = new Uint8Array([...keyTypeLength, ...keyType, ...keyLength, ...rawBytes]);

    // Base64 encode the concatenated buffer
    const base64Key = btoa(String.fromCharCode(...sshBuffer));

    // Return the full SSH formatted key
    return `ssh-ed25519 ${base64Key} ${comment}`;
}

function hexToRawBytes(hex) {
  const bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substr(i, 2), 16));
  }
  return new Uint8Array(bytes);
}

function rawBytesToHex(rawBytes) {
  return Array.from(rawBytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function rawBytesToBase64Url(bytes) {
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

function rawBytesToCESR(rawBytes) {
  const base64String = rawBytesToBase64Url(rawBytes);
  const base64Url = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return 'B' + base64Url;
}

// source of this and next func: https://gist.github.com/diafygi/90a3e80ca1c2793220e5/
function base58Encode(bytes) {
  var digits = [],
      encoded = "",
      i,
      j,
      carry,    //overflow from the current base58 digit to the next base58 digit
      n;        //a temporary placeholder variable for the current base58 digit
  for(i in bytes) {
      j = 0,
      carry = bytes[i];                        //set the initial carry amount equal to the current byte amount
      encoded += carry || encoded.length ^ i ? "" : 1; //prepend the result string with a "1" (0 in base58) if the byte stream is zero and non-zero bytes haven't been seen yet (to ensure correct decode length)
      while(j in digits || carry) {             //loop through the digits until there are no more digits and no carry amount
          n = digits[j];                    //set the placeholder for the current base58 digit
          n = n ? n * 256 + carry : carry;     //shift the current base58 one byte and add the carry amount (or just add the carry amount if this is a new digit)
          carry = n / 58 | 0;              //find the new carry amount (floored integer of current digit divided by 58)
          digits[j] = n % 58;               //reset the current base58 digit to the remainder (the carry amount will pass on the overflow)
          j++;
      }
  }
  while(j--)        //since the base58 digits are backwards, loop through them in reverse order
      encoded += BASE58_ALPHABET[digits[j]];
  return encoded;
}

function base58Decode(base58str) {
  var digits = [],
      bytes = [],
      i,
      j,
      carry,        //overflow from the current byte to the next byte
      n;        //a temporary placeholder variable for the current byte
  for(i in base58str) {
      j = 0,                             //reset the byte iterator
      carry = BASE58_ALPHABET.indexOf( base58str[i] );             //set the initial carry amount equal to the current base58 digit
      if(carry < 0)                          //see if the base58 digit lookup is invalid (-1)
          return undefined;              //if invalid base58 digit, bail out and return undefined
      carry || bytes.length ^ i ? i : bytes.push(0); //prepend the result array with a zero if the base58 digit is zero and non-zero characters haven't been seen yet (to ensure correct decode length)
      while(j in digits || carry) {               //loop until there are no more bytes and no carry amount
          n = digits[j];                      //set the placeholder for the current byte
          n = n ? n * 58 + carry : carry;        //shift the current byte 58 units and add the carry amount (or just add the carry amount if this is a new byte)
          carry = n >> 8;                    //find the new carry amount (1-byte shift of current byte value)
          digits[j] = n % 256;                //reset the current byte to the remainder (the carry amount will pass on the overflow)
          j++;
      }
  }
  while(j--)               //since the byte array is backwards, loop through it in reverse order
      bytes.push( digits[j] );
  return new Uint8Array(bytes);
}

function rawBytesToDIDKey(rawBytes) {
  return 'did:key:z6Mk' + base58Encode(rawBytes);
}

function rawBytesToDIDPeer(rawBytes) {
  return 'did:peer:0z6Mk' + base58Encode(rawBytes);
}

document.getElementById('val').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
      event.preventDefault();
      cvtkey();
  }
});
