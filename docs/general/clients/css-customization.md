---
uid: clients-css-customization
title: CSS Customization
---

# CSS Customization

In `Dashboard > General`, the "Custom CSS" field can be used to override current CSS in Jellyfin's stylesheet.

[Custom CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) provides customization such as changing colors, changing layouts, and item size and behavior. Below is a list of various tweaks that can be applied. The CSS tweaks work on both the web client, and the [Android application](https://play.google.com/store/apps/details?id=org.jellyfin.mobile&hl=en_US). The code will apply in the order that it is written, however `!important` will overrule everything. To learn more about `!important` and more, see [CSS Specificity](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity) or [specifishity](https://specifishity.com/). To implement these changes, go to `Dashboard > General > Custom CSS` to start.

If you have little or no experience with CSS, various resources and tutorials can be found online. Using the tweaks and examples below makes it quite easy to get started with making your own changes to your Jellyfin instance.

![Screenshot of the 'Custom CSS' setting in the administrator dashboard of the web client](~/images/custom-css-customcssfield.png)

## General Information About CSS

You can learn more about CSS using sites like [w3schools](https://www.w3schools.com/css/default.asp) and [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS). Below are some very basic CSS knowledge that will let you do rough edits to the pre-made tweaks below.

### Colors

CSS supports multiple color formats, but typically the hex color codes are used for specific colors. To get a specific color, exact color data such as the hex codes below have to be used.

Some examples of hex color codes:

* Green: `#5dd000`
* Blue: `#0000d0`
* Red: `#d00000`
* Transparent Black: `#00000058`

Go [here](https://htmlcolorcodes.com/color-picker) for a hex color chart to get a code for any given color.

If you are looking for a more standard and less specific color, typing the literal name of colors suits that purpose well. For example, to get the color "yellow" you can simply write "yellow", this will use a preset yellow color.

`yellow` Yellow <br>
`red` Red <br>
`aquamarine` Aquamarine <br>
`lightseagreen` Light Sea Green

Go [here](https://www.w3schools.com/colors/colors_names.asp) for a list of color names supported.

### Comments

A section of code or text inbetween `/*` and `*/` indicates a comment, and will be ignored.
This allows you to add descriptions for any particular section of code.
It can also be used to disable code without deleting it.

`/* This might be added above code to tell you what it does */`

### CSS Chaining

CSS can be "chained" together to modify different sections together at the same time. An example of this is the "Border Color" tweak. It lists the elements to be modified, and performs a change that is applied to all of them.

"Border Color" tweak:

```css
.emby-input, .emby-textarea, .emby-select { border-color: #d00000; }
```

## Tweak List

To apply any one of these tweaks, copy and paste the CSS code from the example into the "Custom CSS" field. To use multiple tweaks, simply add them one after another into the field. Any applied code will remain in the field. To remove a tweak, delete or comment out the code for it from the field. Changes apply immediately when the settings page is saved and doesn't require restarting your Jellyfin server.

### Played Indicator

This will affect the played/watched indicator. Replace the hex color with any value you like.

### Indicators Without Tweak

![Screenshot of the default watched indicators](~/images/custom-css-normalwatched.png)

### Green Indicators

```css
.playedIndicator { background: #5dd000; }
```

![Screenshot of watched indicators with a custom green color applied](~/images/custom-css-greenwatched.png)

### Transparent And Dark Indicators

```css
/* Make watched icon dark and transparent */
.playedIndicator {background: #00000058;}
```

![Screenshot of watched indicators with a custom transparent color applied](~/images/custom-css-transparentwatched.png)

### Display external links in mobile layout

The mobile app disables display of external links to IMDb, TheMovieDB, Trakt, etc by default.
To enable the external links again, add the following snippet:

```css
.layout-mobile .itemExternalLinks {
    display: block !important;
}
```

### Hide Home Icon from Header

```css
.headerHomeButton { display: none; }

.headerButton.headerButtonRight.headerUserButton.paper-icon-button-light { display: none; }
```

### Hide Cast Icon from Header

```css
.headerCastButton { display: none; }
```

### Hide Sync Icon from Header

```css
.headerSyncButton { display: none; }
```

### Hide User Settings from Header

```css
.material-icons.person { display: none; }
```

### Hide Live TV Channel Listings

```css
.guideChannelNumber { display: none; }
```

### Reduce Live TV Channel Width

```css
.channelsContainer { max-width: 8em; }
```

### Hide Cast & Crew

```css
#castCollapsible { display: none; }
```

### Hide More Like This

```css
#similarCollapsible { display: none; }
```

### Hide Next Up

```css
div.nextUpSection { display: none; }
```

### Hide Star Ratings

```css
div.starRatingContainer { display: none; }
```

### Replace "Latest Movies" text with Custom Text such as "Recently Added Movies"

```css
#homeTab > div > div.section2 > div:nth-child(1) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a > h2 {display: none;}
#homeTab > div > div.section2 > div:nth-child(1) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a > span {display: none;}
#homeTab > div > div.section2 > div:nth-child(1) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a:after {
content: 'Recently Added Movies ›';
font-size: 24px;
font-weight: normal;
}
```

### Replace Latest TV Shows text with Custom Text such as "Recently Added TV Shows"

```css
#homeTab > div > div.section2 > div:nth-child(2) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a > h2 {display: none;}
#homeTab > div > div.section2 > div:nth-child(2) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a > span {display: none;}
#homeTab > div > div.section2 > div:nth-child(2) > div.sectionTitleContainer.sectionTitleContainer-cards.padded-left > a:after {
content: 'Recently Added TV Shows ›';
font-size: 24px;
font-weight: normal;
}
```

### Background Image on Login Page

```css
#loginPage {
  background: url("https://i.ytimg.com/vi/avCWDDox1nE/maxresdefault.jpg");
  background-size: cover;
}
```

### Background Image on Homepage

```css
.backdropImage { display: none; }

.backgroundContainer {
  background-color: rgba(0, 0, 0, 0);
  background-image: url("https://i.ytimg.com/vi/avCWDDox1nE/maxresdefault.jpg");
  filter: blur(10px);
  background-size: cover;
}
```

[Additional MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/background)

### Transparent Top Menu

```css
.skinHeader.focuscontainer-x.skinHeader-withBackground.skinHeader-blurred {background:none; background-color:rgba(0, 0, 0, 0);}
.skinHeader.focuscontainer-x.skinHeader-withBackground.skinHeader-blurred.noHomeButtonHeader {background:none; background-color:rgba(0, 0, 0, 0);}
```

### Image Edge Rounded

```css
.cardContent-button,
.itemDetailImage {
  border-radius: 0.25em;
}
```

### Enlarge Tab Buttons

Enlarges the tab buttons, suggested, genres, etc. By default they are really tiny, especially on mobile.

```css
/* Adjust both "size-adjust" and "size" to modify size */
.headerTabs.sectionTabs {text-size-adjust: 110%;  font-size: 110%;}
.pageTitle {margin-top: auto; margin-bottom: auto;}
.emby-tab-button {padding: 1.75em 1.7em;}
```

**The enlarged tab buttons and transparent menu look like this:**

![Screenshot of enlarged tab buttons and transparent menu](~/images/custom-css-transparenttopbarenlargedtabs.png)

### Minimalistic Login Page

This looks even better together with the transparent top menu!

```css
/* Narrow the login form */
#loginPage .readOnlyContent, #loginPage form {max-width: 22em;}

/* Hide "please login" text, margin is to prevent login form moving too far up */
#loginPage h1 {display: none}
#loginPage .padded-left.padded-right.padded-bottom-page {margin-top: 50px}

/* Hide "manual" and "forgot" buttons */
#loginPage .raised.cancel.block.btnManual.emby-button {display: none}
#loginPage .raised.cancel.block.btnForgotPassword.emby-button {display: none}
```

![Screenshot of the minimalistic login page](~/images/custom-css-minimallogin.png)

### Stylized Episode Previews

The episode previews in season view are sized based on horizontal resolution. This leads to a lot of wasted space on the episode summary and a high vertical page, which  requires a lot of scrolling. This code reduces the height of episode entries, which solves both problems.

```css
/* Size episode preview images in a more compact way */
.listItemImage.listItemImage-large.itemAction.lazy {height: 110px;}
.listItem-content {height: 115px;}
.secondary.listItem-overview.listItemBodyText {height: 61px; margin: 0;}
```

![Screenshot of a TV show page with stylized episode previews](~/images/custom-css-episodepreview.png)

### Stylized and Smaller Cast & Crew Info

This will drastically change the style of cast info into something very similar to how Plex approaches it. This override will lead to somewhat smaller thumbnails, and also works with all themes.

```css
/* Shrink and square (or round) cast thumnails */
#castContent .card.overflowPortraitCard.personCard.card-hoverable.card-withuserdata {width: 4.2cm !important; font-size: 90% !important;}
#castContent .card.overflowPortraitCard.personCard.card-withuserdata {width: 4.2cm !important; font-size: 90% !important;}

/* Correct image aspect ratio behaviour, set border-radius to zero for square tiles */
#castContent .cardContent-button.cardImageContainer.coveredImage.cardContent.cardContent-shadow.itemAction.lazy {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardContent-button.cardImageContainer.coveredImage.defaultCardBackground.defaultCardBackground1.cardContent.cardContent-shadow.itemAction {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardContent-button.cardImageContainer.coveredImage.defaultCardBackground.defaultCardBackground2.cardContent.cardContent-shadow.itemAction {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardContent-button.cardImageContainer.coveredImage.defaultCardBackground.defaultCardBackground3.cardContent.cardContent-shadow.itemAction {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardContent-button.cardImageContainer.coveredImage.defaultCardBackground.defaultCardBackground4.cardContent.cardContent-shadow.itemAction {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardContent-button.cardImageContainer.coveredImage.defaultCardBackground.defaultCardBackground5.cardContent.cardContent-shadow.itemAction {background-size: cover; !important; border-radius: 2.5cm;}
#castContent .cardScalable {width: 3.8cm !important; height: 3.8cm !important; border-radius: 2.5cm;}
#castContent .cardOverlayContainer.itemAction {border-radius: 2.5cm;}

/* Center the mouseover buttons */
#castContent .cardOverlayButton-br {bottom: 4%; right: 15%; width: 70%;}
#castContent .cardOverlayButton.cardOverlayButton-hover.itemAction.paper-icon-button-light {margin:auto;}
```

![Screenshot of stylized and smaller Cast & Crew info](~/images/custom-css-stylizedcast.png)

### Pictureless Cast & Crew

```css
#castContent .card.overflowPortraitCard { width: 4.2cm; font-size: 90%; }

#castContent .personCard { width: auto; }

#castContent .personCard .cardBox { margin-bottom: 0px; margin-right: 0px; }

#castContent { flex-wrap: wrap; max-height: 9.75em; }

div.personCard > :first-child > :first-child { display: none; }

.itemDetailPage .cardText { text-align: left; }

.itemDetailPage .textActionButton { text-align: left; }
```

![Screenshot of Pictureless Cast & Crew info](~/images/custom-css-nopicturecast.png)

### Custom Background Color

```css
.backgroundContainer, .dialog, html { background-color: #0fd0d0; }
```

### Darken the Background

This darkens the background on Blue Radiance and Purple Haze, edit the percentage depending how dark you want it. Lower is darker.

```css
/* Darken background, only works with blue radiance */
.backgroundContainer {background-color: #000000; filter: brightness(50%);}
```

### Right Header Color

This modifies the colors of the cast, search and user buttons in the top right.

```css
.headerRight { color: yellow; }
```

![Screenshot of a custom yellow color for the icon buttons in the top right of the screen](~/images/custom-css-rightheader.png)

### Console Panel Custom Color

Modifies the color of the left menu panel.

```css
.mainDrawer-scrollContainer { color: yellow; }
```

![Screenshot of a custom yellow color on the left menu panel](~/images/custom-css-consolepanel.png)

### General Page Custom Color

```css
.dashboardGeneralForm { color: yellow; }
```

![Screenshot of a custom yellow color on the General Page](~/images/custom-css-generalcolor.png)

### Custom Border Color

This will change the border color for text fields and drop-down menus.

```css
.emby-input, .emby-textarea, .emby-select { border-color: #d00000; }
```

This will affect the border color of highlighted (selected) text fields and drop-down menus.

```css
.emby-input:focus, .emby-textarea:focus, .emby-select-withcolor { border-color: #ffffff !important; }
```

![Screenshot of a custom red border color](~/images/custom-css-bordercolor.png)

### Full Header Tweak

```css
.skinHeader, .mainDrawer, .emby-input, .emby-textarea, .emby-select, .navMenuOption-selected, .cardBox, .paperList { background: #ff9475; }
```

![Screenshot of the full header tweak](~/images/custom-css-full-header-mod.png)

### Disable Image Carousel for Libraries

This will make it so libraries and media fit neatly onto the homepage with no left to right scrolling required.

```css
@media all and (min-width: 50em) {
  .homePage .emby-scroller {
    margin-right: 0;
  }
  .homePage .emby-scrollbuttons {
    display: none;
  }
  .homePage .itemsContainer {
    flex-wrap: wrap;
  }
}
```

### Shift Scroller Buttons

```css
.emby-scrollbuttons {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    justify-content: space-between;
    pointer-events: none;
}

.emby-scrollbuttons-button {
    pointer-events: initial;
}
```

### "Hotdogs and Catsup" Color Theme Example

An example of a color theme.

![Screenshot of the "Hotdogs and Catsup" color theme](~/images/custom-css-hotdog-and-catsup.png)

```css
.skinHeader, .mainDrawer, .emby-input, .emby-textarea, .emby-select, .navMenuOption-selected, .cardBox, .paperList {
    background: #ff9475;
}

.emby-input, .emby-textarea, .emby-select {
    border-color: #fdbe7d;
}

.backgroundContainer.withBackdrop, .backdropContainer, .backgroundContainer {
    background: #fdbe7d;
}

#myPreferencesMenuPage .listItemBodyText,
.emby-tab-button[data-index="0"],
#myPreferencesMenuPage > div > div > div > a:nth-child(odd),
.button-submit,
.mainAnimatedPage *:nth-child(odd),
.dashboardGeneralForm *:nth-child(odd),
.mainDrawer-scrollContainer *:nth-child(odd),
.headerRight *:nth-child(odd) {
    color: red;
}

#myPreferencesMenuPage .listItemIcon,
.emby-tab-button[data-index="1"],
#myPreferencesMenuPage > div > div > div > a:nth-child(even),
.mainAnimatedPage *:nth-child(even),
.dashboardGeneralForm *:nth-child(even),
.mainDrawer-scrollContainer *:nth-child(even),
.headerRight *:nth-child(even)
.cancel {
    color: yellow;
}
```

### Floating Now Playing Controls

![Screenshot of the floating "Now Playing" controls](~/images/custom-css-floatingnowplaying.png)

```css
/* fixed height for the bottom row */
:root {
  --element-fixed-top: 95px;
}

/* Now playing bar in the footer */
.nowPlayingBar {
       width: 650px;
       z-index: 10;
       position: fixed;
       top: 300px;
       height: 120px;
      border-style: solid;
      border-color: white;
      background-color: black;
      margin-left: 50%;
}

/* Only child of nowPlayingBar */
.nowPlayingBarTop {
     height: 5px !important;
     max-width: 500px
     top: 10px;
}

/* Song progress seekbar */
.nowPlayingBarPositionContainer {
     position: relative;
     top: 1.0em !important;
}

/* Container that holds album thumbnail, artist and album name */
.nowPlayingBarInfoContainer {
     position: fixed !important;
     left: 12px;
     top: 34px;
     height: 60px;
     width: 1100px;
}

/* Holds the next, previous track, play/pause, next and time elements */
.nowPlayingBarCenter {
     position: relative !important;
     left: 32px;
     top: var(--element-fixed-top);
     min-width: 500px;
}

/* Hold mute, volume slider container, repeat, favorite and remote control buttons */
.nowPlayingBarRight {
     width: 402px !important;
     left: -60px;
}

/* Mute button */
.muteButton {
    position: relative;
    top: var(--element-fixed-top);
}

/* Volume slider */
.nowPlayingBarVolumeSliderContainer {
     position: relative;
     left: -4px;
     top: var(--element-fixed-top);
}

/* Toggle repeat */
.toggleRepeatButton {
     position: relative !important;
     left: -20px;
     top: var(--element-fixed-top);
}

/* Favorite */
.nowPlayingBarUserDataButtons {
     position: relative;
     left: -4px;
     top: var(--element-fixed-top);
}

/* Remote control */
.remoteControlButton {
     left: -110px;
     top: var(--element-fixed-top);
}
```

### Change Icon Pack

You can choose between Material Icons (Icon Pack used by Jellyfin) and Fontawesome icons.
Material Icons:

* Outlined:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Outline.css");
  ```

* Rounded:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/round.css");
  ```

* Sharp:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Sharp.css");
  ```

Fontawesome Icons:

* Solid:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Font%20Awesome/solid.css");
  ```

* Regular:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Font%20Awesome/regular.css");
  ```

* Light:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Font%20Awesome/light.css");
  ```

* duotone:

  ```css
  @import url(https://cdn.jsdelivr.net/gh/prayag17/Jellyfin-Icons/Font%20Awesome/duotone.css");
  ```

## Community Links

Some links to places where custom CSS has been discussed and shared!

### Community Posts

Keep in mind that these posts may have been made under previous versions of Jellyfin. Some of these tweaks listed in these guides may not work anymore!

* [Custom CSS Guide](https://www.reddit.com/r/jellyfin/comments/fgmu6k/custom_css_updated_for_1050)
* ["But wait, there is more Custom CSS!"](https://www.reddit.com/r/jellyfin/comments/htrfrx/but_wait_there_is_more_custom_css)
* [Customizable Plug n' Play CSS for Jellyfin](https://www.reddit.com/r/jellyfin/comments/g9gmjj/customizable_plug_n_play_css_for_jellyfin)
* [Easy Jellyfin custom CSS](https://www.reddit.com/r/jellyfin/comments/crxqk5/easy_jellyfin_custom_css)
* [Custom CSS - updated for 10.5.0](https://www.reddit.com/r/jellyfin/comments/fgmu6k/custom_css_updated_for_1050)
* [Sharing even more custom CSS (and some fixes to previous stuff)](https://www.reddit.com/r/jellyfin/comments/bvnt65/sharing_even_more_custom_css_and_some_fixes_to)
* [Posting my Jellyfin Custom CSS](https://www.reddit.com/r/jellyfin/comments/p13yqg/posting_my_jellyfin_custom_css/)

### Community Themes

* [Monochromic - A custom theme for Jellyfin mediaserver created using CSS overrides](https://github.com/CTalvio/Monochromic)
* [Kaleidochromic - Yet another custom theme for Jellyfin mediaserver created using CSS overrides, built on top of Monochromic](https://github.com/CTalvio/Kaleidochromic)
* [Novachromic - A light theme, built on top of Monochromic](https://github.com/CTalvio/Novachromic)
* [JellySkin - Vibrant Jellyfin theme with a lot a animations](https://github.com/prayag17/JellySkin)
* [JellyFlix - The Best Netflix Clone for Jellyfin](https://github.com/prayag17/JellyFlix)
* [Jellyfin Netflix Dark - The Best Netflix Dark Theme for Jellyfin Around!](https://github.com/DevilsDesigns/Jellyfin-Netflix-Dark)
* [Dark and Green - A Emby like night mode skin](https://github.com/mbcooper83/jellyfin-css-darkandgreen)
* [Hint of Green](https://github.com/looi-wh/HintOfGreenCSS)
