import React, { Component } from 'react';
import Header from './layout/Header'
import PostsPage from './PostsPage'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      selectedPost: null
    }
  }
  selectPost(uniqueID){
    this.setState({
      selectedPost: uniqueID
    })
  }
  render() {
    return (
      <div className="App">
        <Header />
        <PostsPage selectPost={this.selectPost.bind(this)} />
      </div>
    );
  }
}

export default App;
