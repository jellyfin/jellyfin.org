---
uid: clients-css-customization
title: CSS Customization
---

# CSS Customization

Jellyfin allows users to customize the appearance of the web interface by applying custom CSS. This feature is intended for advanced customization and should be used with care. Support is not provided for issues caused by custom CSS.

Custom CSS is only applied to clients that load Jellyfin Web from your server. As a result, it does not affect all Jellyfin clients. Some web-based clients bundle their own version of Jellyfin Web and therefore do not load custom CSS from the server.

To add custom CSS, navigate to `Dashboard > Branding` and enter your stylesheet in the "Custom CSS" field. Custom CSS is loaded after Jellyfin's default styles, allowing you to override existing rules and customize elements such as colors, layouts and sizing.

![Screenshot of the 'Custom CSS' setting in the administrator dashboard of the web client](/images/docs/custom-css-customcssfield.png)

If you have little or no experience with CSS, consider reviewing the community resources and tutorials linked below.

## General Information About CSS

CSS rules are applied in the order they are written, although declarations marked with `!important` take precedence over most other rules. For more information, see the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) on CSS and CSS specificity.

You can learn more about CSS using sites like [w3schools](https://www.w3schools.com/css/default.asp) and [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS). Below are some very basic CSS knowledge that will let you do rough edits to the pre-made tweaks below.

### Colors

CSS supports multiple color formats, but typically the hex color codes are used for specific colors. To get a specific color, exact color data such as the hex codes below have to be used.

Some examples of hex color codes:

- Green: `#5dd000`
- Blue: `#0000d0`
- Red: `#d00000`
- Transparent Black: `#00000058`

Use the [HTML Color Picker](https://htmlcolorcodes.com/color-picker) to find the hex code for any given color.

If you are looking for a more standard and less specific color, typing the literal name of colors suits that purpose well. For example, to get the color "yellow" you can simply write "yellow", this will use a preset yellow color.

`yellow` Yellow <br />
`red` Red <br />
`aquamarine` Aquamarine <br />
`lightseagreen` Light Sea Green

You can find a list of supported color names on the [W3Schools Color Names reference](https://www.w3schools.com/colors/colors_names.asp).

### Comments

A section of code or text in-between `/*` and `*/` indicates a comment, and will be ignored.
This allows you to add descriptions for any particular section of code.
It can also be used to disable code without deleting it.

`/* This might be added above code to tell you what it does */`

### CSS Chaining

CSS can be "chained" together to modify different sections together at the same time. An example of this is the "Border Color" tweak. It lists the elements to be modified, and performs a change that is applied to all of them.

"Border Color" tweak:

```css
.emby-input,
.emby-textarea,
.emby-select {
  border-color: #d00000;
}
```

## Community Links

The community maintains a wide range of themes and guides for CSS customization. Some useful resources can be found below.

### Community Themes

- [Ultrachromic - A custom theme for Jellyfin mediaserver created using CSS overrides](https://github.com/CTalvio/Ultrachromic)
- [JellySkin - Vibrant Jellyfin theme with a lot a animations](https://github.com/prayag17/JellySkin)
- [Hint of Green](https://github.com/looi-wh/HintOfGreenCSS)
- [Scyfin - A modern Jellyfin theme](https://github.com/loof2736/scyfin)
