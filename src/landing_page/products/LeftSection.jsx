import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return(
    <div className="container mt-5">
        <div className="row">
            <div className="col-4">
                <img src={imageURL} alt="" />
            </div>
            <div className="col-2"></div>
            <div className="col-6 p-5 mt-5">
                <h1>{productName}</h1>
                <p>{productDescription}</p>
                <div>
                    <a href={tryDemo} className="link-style" style={{marginRight:"50px"}}>Try Demo <i className='fa fa-long-arrow-right' aria-hidden="true"></i></a>
                    <a href={learnMore} className="link-style">Learn More <i className='fa fa-long-arrow-right' aria-hidden="true"></i></a>
                </div>
                <div className="mt-3">
                    <a href={googlePlay} style={{marginRight:"50px"}}>
                        <img src="media/images/googlePlayBadge.svg" />
                    </a>
                    <a href={appStore}><img src="media/images/appStoreBadge.svg" /></a>
                </div>
                
            </div>
        </div>
    </div>
  );
}

export default LeftSection;
