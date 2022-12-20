import React from "react";

function Hero(props) {
  return (
    <div className="hero" onClick={props.hideSearch}>
      <h1 className="heroText">{props.title}</h1>
      <h2 className="heroText">{props.text}</h2>
    </div>
  );
}

export default Hero;
