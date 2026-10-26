# LightPix Studios Official Website

LightPix Studios is an independent creative media startup founded by two friends in 2022. We are building a home for filmmakers, photographers, writers, artists, musicians, editors, and every other kind of storyteller who wants to bring an idea into the world.

Our aim is to create good-quality entertainment and meaningful collaboration while helping smaller creators reach a wider audience. A story does not need to begin with a large studio, a huge budget, or an established name. LightPix Studios wants to give creators a platform where their films, photographs, novels, short stories, comic books, artwork, music, and other ideas can grow, be shared, and find the people they are meant to reach.

At its heart, LightPix Studios is about thinking big and looking beyond the limits placed on creativity. We believe creativity has no fixed boundary: you can be anything, make anything, and tell a story in any form. Every story deserves to be heard, and every good story deserves an audience.

## About this website

This website is the developing online home of LightPix Studios. It introduces the studio, explains the creative services we hope to offer, shares our future original work, and makes it easier for creators to discover and collaborate with us.

The current website includes:

- A studio introduction and mission
- Film and video production information
- Photography services and visual storytelling
- Writing, novels, short stories, scripts, and comic-book development
- Art, illustration, design, music, and sound concepts
- Editing and post-production information
- A project process showing how an idea can move from development to creation and final delivery
- The LightPix Reader, a browser-based demo for reading uploaded PDF books
- A section for original LightPix films, stories, comics, art, and music that will be added as they are ready

The website is still under construction. Some sections, content, portfolio examples, contact features, and original releases are not complete yet. Suggestions, design ideas, writing, development help, creative collaboration, testing, and other contributions are genuinely appreciated as the studio and this website continue to grow.

## LightPix Reader demo

The Stories & Comics page includes a LightPix Reader demo. Visitors can choose a sample PDF and read it inside the website, with an option to open the PDF in a new browser tab if needed. The feature demonstrates how future LightPix books, novels, stories, and comics could be made easy to access and read online.

The current files in `Books/` are demo books by other authors. They are not LightPix Studios originals. They are included only to demonstrate the Reader and will be replaced with original or properly licensed LightPix material in the future.

To add an original book later, place its PDF in `Books/` and add a reader card in `books.html` with:

```html
class="book-card"
data-pdf="Books/filename.pdf"
data-title="Book title"
```

The shared `script.js` file opens the selected PDF in the LightPix Reader and provides the new-tab fallback. Before publishing any book, confirm that LightPix Studios owns the work or has permission to distribute it.

## Current creative work and future direction

LightPix Studios is being shaped as a complete media partner. Depending on the project, the studio may support an idea through story development, writing, production, photography, illustration, music, sound, editing, visual design, and final delivery. A creator may commission one discipline or combine several into one connected creative package.

The studio also plans to develop original intellectual property, including films, novels, short stories, comics, artwork, and music. Verified titles, credits, releases, and portfolio work will be added as they become available.

## Important asset notice

Any dummy books, sample PDFs, placeholder images, cover images, photographs, artwork, names, and other reference material currently used on this website belong to their respective owners. They do not belong to LightPix Studios unless explicitly identified as LightPix work. This website does not claim ownership of third-party material; it is used only for demonstration, testing, layout, or educational purposes.

Please check the rights and distribution permissions for every third-party asset before publishing the website publicly. Replace demo material with original or properly licensed work as the project moves toward launch.

## Project inquiries

The project inquiry form is currently disabled while the studio confirms a working contact inbox. Once an official email address is ready, set `inquiryEmail` in `script.js` to enable the prepared email-draft workflow. The static website does not send or store form submissions by itself.

## Contributing

Contributions are welcome while LightPix Studios and this website are being built. Useful contributions may include:

- Improving layout, accessibility, responsiveness, or performance
- Refining the writing and visual direction
- Adding original portfolio material supplied by its owner
- Testing the LightPix Reader and reporting issues
- Developing future film, story, comic, art, music, and collaboration features

Please make sure that any contribution is original, properly licensed, or accompanied by permission from its owner.

## A closing thought

> “Imagination is the spark. Creativity is the magic. Together, they can light up worlds that have not been seen yet.”

**Think beyond the frame. Tell the story. Make the impossible feel possible.**
