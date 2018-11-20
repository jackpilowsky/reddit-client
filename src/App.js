import React, { Component } from 'react';
import Header from './layout/Header'
import PostsPage from './PostsPage'
import CommentsPage from './CommentsPage'

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
  unselectPost(){
    this.setState({
      selectedPost: null
    }) 
  }
  render() {
    return (
      <div className="App">
        <Header />
        {!this.state.selectedPost &&
          <PostsPage selectPost={this.selectPost.bind(this)} />
        }
        {this.state.selectedPost &&
          <CommentsPage post={this.state.selectedPost} unselectPost={this.unselectPost.bind(this)} />
        }
      </div>
    );
  }
}

export default App;
