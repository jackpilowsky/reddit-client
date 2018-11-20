const AWS = require("aws-sdk"); // from AWS SDK
const fs = require("fs"); // from node.js
const path = require("path"); // from node.js


// configuration
const config = {
  s3BucketName: 'reddit-client',
  folderPath: 'build' // path relative script's location
};

// initialize S3 client
const s3 = new AWS.S3();

// resolve full folder path
function loopThroughDir(dir = config.folderPath, s3Path = ''){
  const distFolderPath = path.join(__dirname, dir);

  // get of list of files from 'dist' directory
  fs.readdir(distFolderPath, (err, files) => {

    if(!files || files.length === 0) {
      console.log(`provided folder '${distFolderPath}' is empty or does not exist.`);
      console.log('Make sure your project was compiled!');
      return;
    }

    // for each file in the directory
    for (const fileName of files) {

      // get the full path of the file
      const filePath = path.join(distFolderPath, fileName);
      
      // ignore if directory
      if (fs.lstatSync(filePath).isDirectory()) {
        loopThroughDir(dir + '/' + fileName, s3Path + fileName +'/')
        continue;
      }
      const extension = path.extname(filePath);
      let contentType = 'text/plain; charset=us-ascii';
      if(extension === '.html'){
        contentType = 'text/html; charset=us-ascii'
      }

      // read file contents
      fs.readFile(filePath, 'utf8', (error, fileContent) => {
        // if unable to read file contents, throw exception
        if (error) { throw error; }
        
  //=> {ext: 'png', mime: 'image/png'}
        // upload file to S3
        s3.putObject({
          Bucket: config.s3BucketName,
          Key: s3Path + fileName,
          Body: fileContent,
          ContentType: contentType
        }, (res) => {
          console.log(`Successfully uploaded '${s3Path + fileName}'!`);
        });

      });
    }
  });
}
loopThroughDir();
