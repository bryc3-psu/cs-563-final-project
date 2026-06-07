# CS-563 Final Prject Journal

## Commit 1: Initial setup

In this first commit I created the initial file structure:

```
- 
| - index.html
| - main.js
| - styles.css
| - assets/
```

and setup the initial base-line HTML and styling.

**HTML:** In addition to the usual HTML boilerplate for the header/footer, I setup the four required `<section>`'s for the page (#about, 
#work, #projects, #contact). I also included the links to each of those sections in the nav-bar and added an aria-label for accessibility. 

**CSS:** For the initial basic styling I added CSS custom properties under `:root` for the colors (using solarized colorscheme). I also added
the smooth scroll attribute since it is a single page site.

I also styled the nav-bar, using a flexbox layout, with the page title on the left and the links (list) on the right. I included underline/accent
color hover effects for the links.

**Outside Sources:**

- Solarized Color Palette: https://ethanschoonover.com/solarized/

## Commit 2: Static Sections

**What I worked on:** In this commit I built all the static sections of the page (#about, #work, #contact, and #footer) as follows:

**About:**
I setup a two-column grid layout via grid-template-columns with 1fr 2fr and center alignment in order to vertically center the photo next to the biographical text content. As shown in class I also wrapped the photo in the <figure> and <figcaption> elements.

**Work:**
I used two <article> elements within a grid container 1fr 1fr in order to make two "job cards". Each card has a different background-color and a 1px solid border so as to pop out. For the dates I used the more semantic <time> elements with the datetime attributes. The company name also uses the --accent color to create a visual visual hierarchy. I also gave the whole section a background to visually separate it from the earlier About section.

**Skills:**
For this section I also used a grid display (repeat(3, 1fr))  with three <div class="skills-group"> styled columns. The individual skill items are then listed with <li> elements with but using list-style of none.

**Contact:**
Three <div class="form-group"> wrappers each containing a <label> with display: block and a corresponding <input> or <textarea>. Inputs use width: 100% to fill the container. Added :focus styles swapping the border to --accent and removing the default outline. I will be implementing the JS validation in a seperate commit.

**Footer:**
This simple footer is just a flex display with a space-between justify-content. The contect is just copyright text on the left and a GitHub link on the right. I styled the link with --text-muted color for default and --accent on hover. I plan to add more links down here in later commits.

**Issues:**
None at this stage.

**Outside sources:**
None.
