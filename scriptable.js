const database_id = args.shortcutParameter.database_id;
const notion_api_key = 'Bearer ' + args.shortcutParameter.notion_api_key;
const headers = {
  'Notion-Version': '2021-05-13',
  Authorization: notion_api_key,
  'Content-Type': 'application/json'
};

let today = new Date();
if (today.getHours() < 4) {
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
  console.log(url);
  Safari.open(url);
}

const createPage = async () => {
  console.log('creating');
  const createPageURL = 'https://api.notion.com/v1/pages';
  const createPage = new Request(createPageURL);
  createPage.method = 'POST';
  createPage.headers = headers;
  const body = {
    parent: {
      database_id: database_id
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
  };
  createPage.body = JSON.stringify(body);
  const createdPage = await createPage.loadJSON();
  console.log(createdPage);
  openPage(createdPage.id);
};

const findPage = async () => {
  const getPagesURL =
    'https://api.notion.com/v1/databases/' + database_id + '/query';
  const getPages = new Request(getPagesURL);
  getPages.method = 'POST';
  getPages.headers = headers;
  const pageResponse = await getPages.loadJSON();
  let found = false;
  pageResponse.results.map(page => {
    let pageDate = page.properties.Date.date.start;
    if (pageDate === todayString) {
      found = true;
      console.log(page.id);
      openPage(page.id);
    }
  });
  if (!found) {
    createPage();
  }
};

findPage();
