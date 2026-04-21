<section class="hero">

<img class="hero-icon" src="/blob/app-icon.png" alt="" width="128" height="128">

# blob

<p class="tagline">blob brings binary to your shortcuts.</p>

</section>

## What is it

![A demo shortcut chaining blob actions — Show alert Text, Read Text as text, Show alert blob, Print blob in hex, Show alert hex, Print blob in binary.](/blob/shortcut-blob-demo.jpeg)

blob turns Shortcuts into a proper toolkit for binary data. It ships a suite of actions for encoding, decoding, and transforming bytes, plus a type-safe native format ("blob") that keeps binary and text visibly separate as they flow through a shortcut.

## blob encoding

blob uses a base-256 encoding built from Braille Unicode characters. Every possible byte gets its own glyph — an assortment like <code>⢀⡀⠢⣒⢕⣾⢛⣿</code>. One character, one byte. Binary data becomes compact, copy-pasteable, and visually distinct from any other encoding — so when a Shortcuts variable holds blob, you know at a glance it's bytes.

## Supported encodings

Here are the five bytes of `Hello` rendered in every encoding blob understands:

| encoding | example |
| --- | --- |
| **blob** | `⠊⢖⠞⠞⢾` |
| **binary** | `01001000 01100101 01101100 01101100 01101111` |
| **decimal** | `72 101 108 108 111` |
| **hex** | `48 65 6c 6c 6f` |
| **base32** | `JBSWY3DP` |
| **base64** | `SGVsbG8=` |
| **base64url** | `SGVsbG8` |
| **utf8** | `Hello` |

## Shortcuts actions

![The Shortcuts action picker showing every blob action: Print Base32, Print Base64, Print Binary, Print Bytes, Print Decimal, Print Hex, Print Text, Random Bytes, Read Bytes, Substring.](/blob/action-list.jpeg)

**Read Bytes** is the main input action. Point it at any supported encoding and it returns a blob. It auto-detects by default, or you can pick the encoding explicitly.

**Print Bytes** goes the other way — render a blob in any encoding. For convenience, **Print Hex**, **Print Binary**, **Print Decimal**, **Print Base32**, and **Print Base64** are available as dedicated actions, each returning a variable named after the encoding so chained shortcuts stay readable.

**Print Text** interprets a blob as UTF-8, falling back to ASCII with `.` placeholders for non-printable bytes.

**Substring** slices any string by character position.

**Random Bytes** returns pseudo-random bytes as a blob. (Not cryptographically secure.)

## Type safety

![A shortcut that takes an AWS-style access key, slices off the prefix, reads the remainder as base32, and prints the decimal account number 581039954779.](/blob/shortcut-account-number.jpeg)

Each action is strict about what it takes in and what it produces. You can't accidentally encode an already-encoded string, and you can't interpret encoded data as if it were text. Parameter and return labels are consistent across every action, so shortcut variables stay self-describing.

The example here is a shortcut that takes an AWS-style access key, strips the prefix, reads the rest as base32, and prints the account number in decimal — each step carrying its type through to the next.

## The app

![The blob app showing a history thread — utf8, decimal, base64url, and blob encoded messages — with the in-app info sheet explaining blob encoding and app features.](/blob/app-info-sheet.jpeg)

blob is primarily a Shortcuts extension — but the app itself is a history viewer. As actions run, it records input, output, and each step of a chain so you can inspect, share, and debug.

- **Tap** a message to copy.
- **Long-press** for the system share sheet.
- **Chained actions** collapse into a single thread showing the first input, the final output, and the operation icons in between.
- **Large payloads** (over 2 kB) show a summary in the UI. The full data is always processed and returned in Shortcuts.
- **Shake to undo** recovers a thread right after you clear it.
- **Pause History** bypasses the app entirely — actions keep working, but nothing is recorded.

None of this is sent anywhere — everything stays on your device. Full details in the [privacy policy](/blob/privacy).

## Install

<p class="actions">
  <a class="app-store-link" href="https://apps.apple.com/us/app/blob-better-binary/id6749558236" aria-label="Download blob on the App Store">
    <img src="/blob/app-store.svg" alt="Download on the App Store" width="160" height="54">
  </a>
</p>

Bug reports, questions, or beta access — see [support](/blob/support).
