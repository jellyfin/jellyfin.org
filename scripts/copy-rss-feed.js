const fs = require('fs');
const path = require('path');

fs.copyFile(
  path.resolve(__dirname, '../build/posts/rss.xml'),
  path.resolve(__dirname, '../build/index.xml'),
  (error) => {
    if (error) {
      throw error;
    } else {
      console.log('RSS feed has been copied to index.xml');
    }
  }
);
