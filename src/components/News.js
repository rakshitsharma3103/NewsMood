import React, { useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

//here we change the class based component NewsMood in function based 

const News = (props)=> {
  // static defaultProps = {
  //   country: 'in',
  //   pageSize: 8,                    =>in class based component we used defaultProps and Proptypes here but in-  
  //   category: 'general'            =>-case of function based component these are used in last.
  // }

  // static propTypes = {
  //   country: PropTypes.string,
  //   pageSize: PropTypes.number,
  //   category: PropTypes.string,
  //   apiKey: PropTypes.string
  // }

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
//     constructor(props){
//         super(props);                                                    => constructor are used in cbc so not used here
//         console.log("Hello i am a constructor from News component");
//         this.state = {
//             articles: [],
//             loading: false,
//             page:1,
//             totalResults: 0                               //this is how state are set in constructor using this..
//     }
// }

  //here we make a function updateNews so i can do refactoring and use this same function in others..

    const updateNews = async()=>{
      props.setProgress(10);
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true)
      let data = await fetch(url);
      props.setProgress(30);
      let parsedData = await data.json()
      props.setProgress(70);
      setArticles(parsedData.articles)
      setTotalResults(parsedData.totalResults)
      setLoading(false)
      props.setProgress(100);
    //   this.setState({
    //     articles: parsedData.articles,                =>these are replaced by above 4 lines of set..
    //     totalResults: parsedData.totalResults,
    //     loading: false
    // })
    }

    useEffect(()=>{
      document.title = `${capitalizeFirstLetter(props.category)} - NewsMood`;
      updateNews();                          //this below line is used so that any error in next line will be ignored
      //eslint-disable-next-line        
    }, [])
    
    // async componentDidMount() {
    //  this.updateNews();                               =>the work of componentDidMount is done by useEffect(refer notes)
    // }

  //   const handlePrevClick = async ()=> {
  //     setPage(page - 1)
  //     this.updateNews();
  //   }
  //   const handleNextClick = async ()=> {
  //   //  this.setState({page: this.state.page + 1});        used in cbc
  //   setPage(page + 1)                                  //the above line is worked in this way in fbc
  //   this.updateNews();
  // }

    const fetchMoreData = async ()=>{
      // setPage(page + 1)     isko mene url ke baad isliye bheja kyoki jab mera page scroll hota h to new data fetch hone me thoda time leta h jiske karn kuch news item duplicate ho jate h  
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
      setPage(page + 1)
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      
    };
 
    return (
      <>
        <h1 className="text-center"style={{margin: '30px 0px', marginTop:'90px'}}>NewsMood - Top Headlines from {capitalizeFirstLetter(props.category)}</h1>
         {loading && <Spinner/>}              {/* if the syntax before && is true then only spinner will shown */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className="row"> 
        {articles.map((element)=>{
         return <div className="col-md-4" key={element.url}>             {/*it gives the median divisor in row as we know there is a grid of 12 in bootstrap */} {/*key is used in map function to get the unique key for each element. */} {/*i have to pass the key in this div as i am returning this div */}
              <NewsItem  title={element.title?element.title.slice(0, 45):""} Description={element.description?element.description.slice(0, 88):""} imageUrl={element.urlToImage}
               newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>   
          </div>
        
        }
      )
    }
    </div>
    </div>
    </InfiniteScroll>
    {/*As we implement infinite scroll so we don't need next and previous buttons :) */}
    {/* <div className="container d-flex justify-content-between">
      <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
      <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

     </div> */}
        
      </>
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
  category: PropTypes.string,
  apiKey: PropTypes.string
}
export default News
