import React from 'react';
const NewsDocumentElement = (props) =>{

  const newerArticle = () =>{
    return props.onClickNextArticle(-1)
  }
  const olderArticle = () =>{
    return props.onClickNextArticle(1)
  }

    return (
        <div>
          <div>
            <h1>{props.article.title}</h1>
            <p>{props.article.content}</p>
            <p>{props.article.author}</p>
          </div>
          <div>
            <button id="newArticles" onClick={newerArticle}>{"<< "}Newer</button>
            <button id="oldArticles" onClick={olderArticle}>Older{" >>"}</button>
          </div>
        </div>
    )
}

export default NewsDocumentElement;
