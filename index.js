const { Client } = require('@notionhq/client');
require('dotenv').config();
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const open = require('open');

let today = new Date();
if (today.getHours() < 5) {
  today.setDate(today.getDate() - 1);
}
const todayString =
  today.getFullYear() +
  '-' +
  String(today.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(today.getDate()).padStart(2, '0');

function openPage(id) {
  url =
    'notion://www.notion.so/' +
    String(today.getMonth() + 1) +
    '-' +
    String(today.getDate()) +
    '-' +
    id.split('-').join('');
  open(url);
}

const findPage = async () => {
  const databaseId = process.env.DATABASE_ID;
  const pageResponse = await notion.databases.query({
    database_id: databaseId
  });
  let found = false;
  pageResponse.results.map(page => {
    let pageDate = page.properties.Date.date.start;
    if (pageDate === todayString) {
      found = true;
      openPage(page.id);
    }
  });
  if (!found) {
    createPage();
  }
};

const createPage = async () => {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.DATABASE_ID
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content:
                String(today.getMonth() + 1) + '/' + String(today.getDate())
            }
          }
        ]
      },
      Date: {
        date: {
          start: todayString
        }
      }
    }
  });
  openPage(response.id);
};

findPage();
