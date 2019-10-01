import React from 'react';
import NewsDocumentElement from './NewsDocumentElement.js'


export default class HomePage extends React.Component{

  constructor(props){
    super(props);
    this.state={
      articlesElement: false,
      articlesArray: this.props.articles,
      displayedArticle: this.props.articles[0],
    }
  }
  showNewsElement = () =>{
    console.log('open News')
    this.setState({articlesElement: !this.state.articlesElement})
  }

  onClickNextArticle = (num) =>{
    let articleIndex = this.state.articlesArray.findIndex(a=> a == this.state.displayedArticle)
    let artArrayLength = this.state.articlesArray.length
    
    if(num === -1 && articleIndex === 0){
      console.log('already at latest')
      return null

    }else if( num === 1 && articleIndex === artArrayLength-1){
      console.log('already at oldest')
      return null
    }

    else{
      console.log(`moving to other article ${this.state.displayedArticle}`)
      return this.setState({displayedArticle: this.props.articles[articleIndex + num]})
    }
  }

  render(){
    return (
    <div >
        <h1 onClick={this.showNewsElement}>Home</h1>
        {this.state.articlesElement ? <NewsDocumentElement article={this.state.displayedArticle} onClickNextArticle={this.onClickNextArticle} /> : null}
    </div>
    );
  }
}


