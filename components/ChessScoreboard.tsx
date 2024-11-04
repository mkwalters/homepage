import { Chess } from "chess.js";

type ChessScoreboardProps = {
  game: Chess | undefined;
  viewCurrentMoveNumber: number | undefined;
};

export const ChessScoreboard = ({
  game,
  viewCurrentMoveNumber,
}: ChessScoreboardProps) => {
  return (
    <div className="flex flex-col gap-2 ">
      {game?.history().map((move, index, movesArray) => {
        if (index % 2 === 0) {
          const moveNumber = Math.floor(index / 2) + 1;
          const whiteMove = move;
          const blackMove = movesArray[index + 1] || "";

          return (
            <div key={index} className="flex gap-x-8">
              <p className="flex-1 -mr-7">{moveNumber}.</p> {/* Move Number */}
              <p
                className={`flex-1 ${
                  index === viewCurrentMoveNumber
                    ? "bg-tigers-eye rounded-xl px-2"
                    : ""
                }`}
              >
                {whiteMove}
              </p>{" "}
              {/* White Move */}
              <p className="flex-1">{blackMove}</p> {/* Black Move */}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
