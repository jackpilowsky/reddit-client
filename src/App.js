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
  selectPost(post){
    this.setState({
      selectedPost: post
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
