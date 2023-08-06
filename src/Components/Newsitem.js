import React from 'react'

const Newsitem =(props)=> {

    let { title, desc, imageUrl, newsUrl, author, date, source } =props;
    return (
      <div className='my-3'>
        <div className="card"> 
          <img src={!imageUrl ? "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} <span className=" badge rounded-pill bg-danger" >
              {source}</span>
              </h5>
            <p className="card-text">{desc}</p>
            <p className="card-text"><small className="text-body-secondary">By <b>{author ? author : "Unkown"}</b>  on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default Newsitem