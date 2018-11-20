function get(sortby, options,  cb) {
  const uri = `https://www.reddit.com/r/all/${sortby}.json?nsfw=0&raw_json=1` + stringifyParams(options); 
  return fetch(uri, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function getComments(subreddit, id ,options ={}, cb){
  const uri = `https://www.reddit.com/r/${subreddit}/comments/${id}.json?raw_json=1` + stringifyParams(options);
  return fetch(uri, {
    accept: "application/json"
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
// Yes, I know about npm query-string, but I had had problems with it on build in the past
function stringifyParams(opts){
  var queryStringArray = [];
  for(var key in opts){
    if(opts.hasOwnProperty(key)){
      queryStringArray.push((key + '=' + opts[key])); 
    }
  }
  return '&' + queryStringArray.join('&');
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { get, getComments };
export default Client;