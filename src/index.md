# byte.glass

Tools for seeing bytes clearly.

Binary doesn't have to look like a wall of hex or slip past you disguised as text. These projects each pick a small seam in how we look at data and pry it open a little.

## Projects

<section class="project">
  <a class="project-icon-link" href="/blob/">
    <img class="project-icon" src="/blob/app-icon.png" alt="blob app icon" width="88" height="88">
  </a>
  <div class="project-body">
    <h3><a href="/blob/">blob</a></h3>
    <p>A Shortcuts toolkit for binary data on iOS. Type-safe encoding, a suite of read/print actions, and a compact Braille-based base-256 format that makes bytes visibly distinct from any other string you'll paste into a shortcut.</p>
    <p>Available on the <a href="https://apps.apple.com/us/app/blob-better-binary/id6749558236">App Store</a>.</p>
  </div>
</section>

<section class="project">
  <a class="project-icon-link project-icon-link--external" href="https://hmac.sh" aria-hidden="true">
    <span class="project-icon project-icon--glyph">$</span>
  </a>
  <div class="project-body">
    <h3><a href="https://hmac.sh">hmac.sh</a></h3>
    <p>A single-page, client-side tool for building HMAC-SHA256 derivation chains. Paste a key, add signing steps, see every intermediate value. The chain is stored in the URL fragment, so a link reproduces it exactly — and nothing is sent to a server.</p>
  </div>
</section>

<section class="project">
  <a class="project-icon-link project-icon-link--external" href="https://github.com/x-amz/swift-base256-blob" aria-hidden="true">
    <span class="project-icon project-icon--glyph">⣧</span>
  </a>
  <div class="project-body">
    <h3><a href="https://github.com/x-amz/swift-base256-blob">swift-base256-blob</a></h3>
    <p>blob's base-256 Braille codec as a standalone Swift package — one character per byte, a byte's hex nibbles as the two dot columns of its cell. The core has no dependencies, not even Foundation.</p>
  </div>
</section>
