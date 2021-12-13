import React from 'react'

function Pagination({postPerPage,totalPosts,paginate}) {
    const style = {
        colors: 'black',
        fontSize: 20
      };
    const pageNumber=[];
    for(let i=1;i<=Math.ceil(totalPosts/postPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <nav>
          
            <ul className="pagination" style={style}>
                {
                  pageNumber.map((number)=>{
                     
                     return(
                      <li key={number} className="page-item">
                        <a href="#" className="page-link" onClick={()=>paginate(number)}>
                            {number}
                        </a>
                      </li>
                     )
                     
                  })  
                }
            </ul>
        </nav>
    )
}

export default Pagination
