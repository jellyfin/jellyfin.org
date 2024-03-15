import React from 'react';

export default function CodeOther() {
  return (
    <div>
      <div className='margin-top--md'>
        Jellyfin has several other sub-projects that use various languages. If any of these suit you, head over to the
        relevant project page and begin hacking.
      </div>
      <ul>
        <li>
          <b>Kotlin/Java:</b> The <a href='https://github.com/jellyfin/jellyfin-androidtv'>Android TV</a> and{' '}
          <a href='https://github.com/jellyfin/jellyfin-android'>Android</a> apps are written in Kotlin and Java for
          some legacy code.
        </li>
        <li>
          <b>Python:</b> The <a href='https://github.com/jellyfin/jellyfin-kodi'>Kodi</a> client is written in Python.
        </li>
        <li>
          <b>BrightScript:</b> The <a href='https://github.com/jellyfin/jellyfin-roku'>Roku</a> client is written in
          BrightScript.
        </li>
      </ul>
      <div>
        Feel free to browse around the <a href='https://github.com/jellyfin'>project page</a> for the full list of
        official sub-projects.
      </div>
    </div>
  );
}
