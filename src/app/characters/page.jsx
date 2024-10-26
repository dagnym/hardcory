"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function CharacterInfo() {
  const { data: session } = useSession();
  console.log("session data: ", session);
  const [characterEquipment, setCharacterEquipment] = useState([]);
  const [characterStats, setCharacterStats] = useState([]);
  const [characterProfile, setCharacterProfile] = useState(null);
  const [characterMedia, setCharacterMedia] = useState(null);
  // const [characterAppearance, setCharacterAppearance] = useState(null);
  // const [error, setError] = useState(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await fetch("/api/character-data");
        const data = await response.json();
        const {
          characterEquipmentArray,
          characterStatsArray,
          characterProfileArray,
          characterMediaArray,
        } = data;
        setCharacterEquipment(characterEquipmentArray);
        setCharacterStats(characterStatsArray);
        setCharacterProfile(characterProfileArray);
        setCharacterMedia(characterMediaArray);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    // const fetchCharacterProfile = async () => {
    //   try {
    //     const response = await fetch(`/api/character-profile`);
    //     console.log("character response: ", response);
    //     const data = await response.json();
    //     console.log("character profile data: ", data);
    //     setCharacterProfile(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // const fetchCharacterAppearance = async () => {
    //   try {
    //     const response = await fetch("/api/character-appearance");
    //     const data = await response.json();
    //     console.log("characer appearance data:", data);
    //     setCharacterAppearance(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    fetchCharacterData();
    // fetchCharacterProfile();
    // fetchCharacterAppearance();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!loading) {
    return (
      <div className="relative">
        <div className="fixed top-0 left-0 w-full h-full bg-darkshire bg-cover -z-10"></div>
        <button
          className="px-3 py-2 mt4 ml-4 border absolute rounded-sm mt-2"
          onClick={() => router.push("/")}
        >
          home
        </button>
        <div className="p-14 grid grid-cols-4 gap-10">
          {characterEquipment.map((character, index) => {
            const stats = characterStats[index];
            const profile = characterProfile[index];
            const media = characterMedia[index];
            return (
              <div
                key={character.name || `character-${index}`}
                className="border p-10 rounded-md bg-black bg-opacity-85 flex flex-col"
              >
                <Image
                  priority
                  width={100}
                  height={100}
                  alt="uhh"
                  src={media.data.assets[0].value}
                  className="self-center bg-red-500 border border-gray-300 rounded-sm mb-4 "
                />
                <h1 className="text-orange-400 self-center text-lg">
                  {character.character.toString().toUpperCase()}
                </h1>
                <br></br>

                <ul className="flex flex-col items-center">
                  {character.data.equipped_items.map((item) => {
                    return (
                      <p className="text-green-500" key={item.slot.type}>
                        {item.name}{" "}
                      </p>
                    );
                  })}
                </ul>
                <h1 className="text-lg">Level:</h1>
                <pre className="text-blue-400">
                  {JSON.stringify(profile.data.level, null, 2)}
                </pre>
                <h1 className="text-lg">Status:</h1>
                {profile.data.is_ghost ? (
                  <div className="text-red-600">
                    👎 DEAD LIKE TIM ALLEN SHOULD BE 👎
                  </div>
                ) : (
                  <h2 className="text-green-400">
                    👌 this brotha is still alive 👌
                  </h2>
                )}
                <h2 className="text-lg">Health: </h2>
                <pre className="text-red-400">
                  {JSON.stringify(stats.data.health, null, 2)}
                </pre>
              </div>
            );
          })}
          <br></br>
        </div>
      </div>
    );
  }
}
