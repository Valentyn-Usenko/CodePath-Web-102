import React from "react";  

const SportEventCard = ({eventName, sport, imageUrl, websiteUrl}) => {
    return(
        <div className="sport-event-card">
            <img src={imageUrl} alt = {eventName}/>
            <h3>{eventName}</h3>
            <p>Sport: {sport}</p>
            <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
              <button>Go to website</button>
            </a>

        </div>
    );
};

export default SportEventCard;