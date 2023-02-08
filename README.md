# Neumorphic Music App

This project started as an experiment in nuemorphic design, with the idea of a music app as a good template for experimentation. After designing the first page, I decided to continue to expand the web pages functionality to simulate an actual music app. The intent at this point was to stretch my JavaScript skills and attempt to integrate all the functionality of a real music app into this project. This involved learning new techniques for dynamic calculations and DOM-updates, new HTML structuring for utilizing CSS properties, and combining CSS animations with JS functions to achieve what I believe is a fairly decent, albeit simulated, music app experience.

## Installation

Simply clone the repository and open the index.html file in your browser of choice.

## Page Structure

The 'app' consists of four pages, three of which are connected in a hierarchical schema. These pages are the Playlist Page, the Songs Page, and the Song Player Page. From any of these pages you can access the Options Page, where a simple color theme selector can be used.

#### Playlists Page
This page lists the available playlists to select.

#### Songs Page
This page lists all songs in the selected playlist.

#### Song Player Page
This page shows the album cover and song information for the selected song. It also features a progress bar which updates in real-time when 'playing' a song.

#### Options Page
This page consists of a simple theme selector and a 'disable' button for the selector. The theme selector will update all app colors, and the disable button will simply stop the theme selector from functioning.

## File Structure

The app is structured in a basic HTML/CSS/JS format, with an images folder from which to pull album covers and a 'songinfo.js' file which contains three arrays containing song data objects. When selecting a playlist or song, data from the song objects is injected into the HTML to update the DOM for the next page.

## Contributing

As this project is a demonstration of my use of JavaScript, pull requests will not be taken. Any feedback is absolutely appreciated, however any updates to this repository must be a reflection of my own knowledge and skills.

Use of any components or strategies in this project are allowed with proper reference to this project.

## License

[Unlicense](https://choosealicense.com/licenses/unlicense/)