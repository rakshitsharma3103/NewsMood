import React from 'react'

const NewsItem = (props)=> {

    let {title, Description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
        }}>
          <span className="badge rounded-pill bg-danger"> {source} </span>

          </div>
        <img className="card-img-top" src={!imageUrl?"https://images.indianexpress.com/2023/08/MAGNUS-VS-GUKESH-CROPPED-FIDE-Stev-Bonhage.jpg?w=750":imageUrl} alt="..."/>   {/*here i used ternary operator because if when i fetch data and there is null image url then i show this image otherwise its own imageUrl . */}
        <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{Description}...</p>
            <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()} </small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
</div>
      </div>
    )
  
}

export default NewsItem
