import axios from "axios";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const HeroBanner = () => {
  const api =
    "https://api.rawg.io/api/platforms?key=dfd7125c549a402798b4303017d5b598";
  const [games, setGames] = useState([]);

  const getPictues = async () => {
    const local_api = await api;
    axios
      .get(local_api)
      .then((res) => setGames(res.data.results))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPictues();
  });

  return (
    <div className="flex justify-center items-center gap-4 h-full">
      {games.length < 1 ? (
      <div>
          <ClipLoader color={"black"} size={50} />
        </div>
      ) : games.map((game) => (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 slider">
            <div key={game.id} className="w-48 h-48 overflow-hidden rounded-lg">
              <img className="w-full h-full" src={game.image_background} />
            </div>
          </div>

          <div className="flex flex-col gap-4 slider">
            <div key={game.id} className="w-48 h-48 overflow-hidden rounded-lg">
              <img className="w-full h-full" src={game.image_background} />
            </div>
          </div>

          <div className="flex flex-col gap-4 slider">
            <div key={game.id} className="w-48 h-48 overflow-hidden rounded-lg">
              <img className="w-full h-full" src={game.image_background} />
            </div>
          </div>

        </div>
      ))}
    </div>
  );
};
