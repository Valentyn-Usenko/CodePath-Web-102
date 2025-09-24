import React from 'react';
import SportEventCard from './SportEventCard';

const sportEvents = [
  {id: 1, eventName: 'World Cup', sport: 'soccer', imageUrl: 'https://a57.foxsports.com/statics.foxsports.com/www.foxsports.com/content/uploads/2025/05/1280/720/2026-fifa-world-cup-logo.jpg?ve=1&tl=1', websiteUrl: 'https://www.fifa.com/fifaplus/en/tournaments/mens/worldcup'  },
  {id: 2, eventName: 'Superbowl', sport: 'football', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9c/Super_Bowl_LX.png', websiteUrl: 'https://www.nfl.com/super-bowl/'  },
  {id: 3, eventName: 'The World Series', sport: 'baseball', imageUrl: 'https://playncs.blob.core.windows.net/documents/images/Events/Logos/11469-2026-ncs-southeast-scenic-city-world-series.png?t=638930686160530000', websiteUrl: 'https://www.mlb.com/world-series'  },
  {id: 4, eventName: 'NBA Finals ', sport: 'basketball', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/44/NBA_Finals_logo_%282022%29.svg', websiteUrl: 'https://www.nba.com/finals'  },
  {id: 5, eventName: 'Formula 1 Grand Prix', sport: 'auto racing', imageUrl: 'https://cdn-5.motorsport.com/images/amp/68ey3q40/s1000/f1-abu-dhabi-gp-2017-f1-logo-6614911.jpg', websiteUrl: 'https://www.formula1.com/en/racing/2024.html' },
  {id: 6, eventName: 'Stanley Cup Finals', sport: 'hockey', imageUrl: 'https://content.sportslogos.net/logos/1/486/full/_stanley_cup_playoffs_logo_finals_2025_sportslogosnet-4950.png', websiteUrl: 'https://www.nhl.com/stanley-cup/' },
  {id: 7, eventName: 'Wimbledon', sport: 'tennis', imageUrl: 'https://www.edigitalagency.com.au/wp-content/uploads/Wimbledon-logo-png-large-size.png', websiteUrl: 'https://www.wimbledon.com/' },
  {id: 8, eventName: 'Cricket World Cup', sport: 'cricket', imageUrl: 'https://images.icc-cricket.com/image/upload/t_ratio16_9-size20-webp/prd/yqm0s8y8mfy2ei0cogp3', websiteUrl: 'https://www.icc-cricket.com/tournaments/womens-cricket-worldcup-2025' },
  {id: 9, eventName: 'The Masters', sport: 'golf', imageUrl: 'https://i.ebayimg.com/images/g/Xl0AAOSwJXNhGYW9/s-l1200.jpg', websiteUrl: 'https://www.masters.com/' },
  {id: 10, eventName: 'Rugby World Cup', sport: 'rugby', imageUrl: 'https://resources.worldrugby-rims.pulselive.com/photo-resources/2023/10/28/91b28a91-71e1-46d6-80fc-d149c37f09e9/4K-static-image.png?width=1440', websiteUrl: 'https://www.rugbyworldcup.com/' },
  {id: 11, eventName: 'World Heavyweight Championship', sport: 'boxing', imageUrl: 'https://www.wwe.com/f/styles/wwe_16_9_xs/public/all/2023/05/WWE_World_Championship--3f7deec341d4257875929ee8ab140834.png', websiteUrl: 'https://wbcboxing.com/' }
];

const App = () => {
  return (
    <>
      <h1>Upcoming Sport Events</h1>
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
