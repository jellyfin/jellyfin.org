---
uid: clients-css-customization
title: CSS Customization
---

# CSS Customization

In `Dashboard > Branding`, the "Custom CSS" field can be used to override current CSS in Jellyfin's stylesheet.

[Custom CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) provides customization such as changing colors, changing layouts, and item size and behavior. Below is a list of various tweaks that can be applied. The CSS tweaks work on all clients that load Jellyfin-Web from the Server. The code will apply in the order that it is written, however `!important` will overrule everything. To learn more about `!important` and more, see [CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) or [specifishity](https://specifishity.com/). To implement these changes, go to `Dashboard > Branding > Custom CSS` to start.

If you have little or no experience with CSS, various resources and tutorials can be found online. Using the tweaks and examples below makes it quite easy to get started with making your own changes to your Jellyfin instance.

![Screenshot of the 'Custom CSS' setting in the administrator dashboard of the web client](/images/docs/custom-css-customcssfield.png)

## General Information About CSS

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

Some links to places where custom CSS has been discussed and shared!

### Community Posts

Keep in mind that these posts may have been made under previous versions of Jellyfin. Some of these tweaks listed in these guides may not work anymore!

- [Custom CSS Guide](https://www.reddit.com/r/jellyfin/comments/fgmu6k/custom_css_updated_for_1050)
- ["But wait, there is more Custom CSS!"](https://www.reddit.com/r/jellyfin/comments/htrfrx/but_wait_there_is_more_custom_css)
- [Customizable Plug n' Play CSS for Jellyfin](https://www.reddit.com/r/jellyfin/comments/g9gmjj/customizable_plug_n_play_css_for_jellyfin)
- [Easy Jellyfin custom CSS](https://www.reddit.com/r/jellyfin/comments/crxqk5/easy_jellyfin_custom_css)
- [Custom CSS - updated for 10.5.0](https://www.reddit.com/r/jellyfin/comments/fgmu6k/custom_css_updated_for_1050)
- [Sharing even more custom CSS (and some fixes to previous stuff)](https://www.reddit.com/r/jellyfin/comments/bvnt65/sharing_even_more_custom_css_and_some_fixes_to)
- [Posting my Jellyfin Custom CSS](https://www.reddit.com/r/jellyfin/comments/p13yqg/posting_my_jellyfin_custom_css/)

### Community Themes

- [Ultrachromic - A custom theme for Jellyfin mediaserver created using CSS overrides](https://github.com/CTalvio/Ultrachromic)
- [JellySkin - Vibrant Jellyfin theme with a lot a animations](https://github.com/prayag17/JellySkin)
- [JellyFlix - The Best Netflix Clone for Jellyfin](https://github.com/prayag17/JellyFlix)
- [Jellyfin Netflix Dark - The Best Netflix Dark Theme for Jellyfin Around!](https://github.com/DevilsDesigns/Jellyfin-Netflix-Dark)
- [Dark and Green - A Emby like night mode skin](https://github.com/mbcooper83/jellyfin-css-darkandgreen)
- [Hint of Green](https://github.com/looi-wh/HintOfGreenCSS)
- [Scyfin - A modern Jellyfin theme](https://github.com/loof2736/scyfin)
