# quick-notion-journaling


Two methods (NodeJS and Scriptable Siri Shortcut) that will find the current day's journal entry in a database and open it right in the app. If no journal entry exists, the script will create a new one and open that one instead.

This tool assumes that journal entries are titled in a month/day format. Example: 9/3 for September 3rd.

Both require:

- The ID of the Notion database you want to track.
- Your Notion API Key (Internal Integration Token)

## Scriptable Siri Shortcut

The Scriptable script in the "Scriptable" folder is triggered by a Siri Shortcut that can be found here: https://routinehub.co/shortcut/9166/

Input the information above in the dictionary and select the right Scriptable script to run within the shortcut.

## NodeJS

Install modules with npm i.

Replace the information above in the .env file. Do not include quotations or line breaks.

Run with node index.js.
