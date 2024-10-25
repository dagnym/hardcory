// /components/CharacterInfo.js

import { useEffect, useState } from "react";

const CharacterInfo = ({ accessToken }: any) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacterInfo = async () => {
      try {
        const response = await fetch(
          "https://oauth.battle.net/oauth/authorize?response_type=code&client_id=17e3bc82fc94419d9856972373f64dcb&scope=wow.profile%20sc2.profile&redirect_uri=https://develop.battle.net/documentation/world-of-warcraft-classic/game-data-apis&state='test'" +
            accessToken
        );
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        console.log("error fetching character info: ", err);
      }
    };

    if (accessToken) {
      fetchCharacterInfo();
    }
  }, [accessToken]);

  if (!character) {
    return <div>Loading character info...</div>;
  }

  return (
    <div>
      <h2>Character Info:</h2>
      <pre>{JSON.stringify(character, null, 2)}</pre>
    </div>
  );
};

export default CharacterInfo;
