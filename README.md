# LightPix Studios Official Website
This website is under development. It presents LightPix Studios' commissioned services and has a separate area for future original work.

## LightPix Reader demo

The Stories & Comics page contains three sample PDF books in `Books/`. They demonstrate the on-page LightPix Reader and are clearly labeled as third-party examples, not LightPix originals. The older `Coverpage/` images are not used because their titles do not match these PDFs.

To add an original book later, place its PDF in `Books/` and add a button with `class="book-card"`, `data-pdf="Books/filename.pdf"`, and `data-title="Book title"` to the reader grid in `books.html`. The shared script opens the PDF in the Reader and provides an open-in-new-tab fallback. Replace the demo books and check distribution rights before publishing the current third-party PDFs publicly.

## Project inquiries

The inquiry form is intentionally disabled until a working studio inbox is confirmed. Once it is verified, set `inquiryEmail` in `script.js`; this enables a prepared email draft. The site does not send or store form submissions itself.
