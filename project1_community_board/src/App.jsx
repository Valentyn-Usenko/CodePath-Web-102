import React from 'react';
import SportEventCard from './SportEventCard';



const sportEvents = [
  {id: 1, eventName: 'World Cup', sport: 'soccer', imageUrl: 'https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2025/05/1280/720/2026-fifa-world-cup-logo.jpg?ve=1&tl=1', websiteUrl: 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup'  },
  {id: 2, eventName: 'Superbowl', sport: 'football', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Super_Bowl_LX.png', websiteUrl: 'https://www.nfl.com/super-bowl/'  },
  {id: 3, eventName: 'The World Series', sport: 'baseball', imageUrl: 'https://playncs.blob.core.windows.net/documents/images/Events/Logos/11469-2026-ncs-southeast-scenic-city-world-series.png?t=638930686160530000', websiteUrl: 'https://www.mlb.com'  },
  {id: 4, eventName: 'NBA Finals ', sport: 'basketball', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/44/NBA_Finals_logo_%282022%29.svg', websiteUrl: 'https://www.nba.com/finals'  },
];

const App = () => {
  return (
  <>
    <h1>Choose Any Sport Of Your Interest</h1>
    <div className = "events-container">
      {sportEvents.map(event => (
        <SportEventCard
        key = {event.id}
        eventName = {event.eventName}
        sport = {event.sport}
        imageUrl = {event.imageUrl}
        websiteUrl = {event.websiteUrl}
        />
        
      ))}
    </div>
  </>
  );
};

export default App;
