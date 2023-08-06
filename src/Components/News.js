import React, { useEffect, useState } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {

  const [articles, setArticles] = useState([]);
  const [loading , setLoading] = useState(true);
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
 

  
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }




  const updateNews =async () =>{
    props.setProgress(20);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(35);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    settotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
     document.title = `${capitalizeFirstLetter(props.category)} - API-NEWS`;
    updateNews()
  }, [])
  

//  const  handlePreClick = async () => {
//   setPage(page-1)
//     updateNews();

//   }


//   const handleNxtClick = async () => {
//     setPage(page+1)
//     updateNews();
//   }


  const fetchMoreData = async () => {
    
    const url =  `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles))
    settotalResults(parsedData.totalResults)
  }



    return (
      <>
        <h2 className='d-flex justify-content-center color:red text-light bg-dark py-2' style={{margin:'50px 0px', marginTop:'50px'}}>{capitalizeFirstLetter(props.category)} </h2>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            {/* {this.state.loading && <Spinner />} */}
            <div className="row">

              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <Newsitem title={element.title ? element.title : ""} desc={element.desc ? element.desc : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
      </ >
    )

}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News