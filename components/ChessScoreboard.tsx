import { Chess } from "chess.js";
import { Dispatch, SetStateAction } from "react";
import { Icon } from "./Icon";

type ChessScoreboardProps = {
  game: Chess | undefined;
  viewCurrentMoveNumber: number;
  setViewCurrentMoveNumber: Dispatch<SetStateAction<number>>;
  numberOfMoves: number;
};

export const ChessScoreboard = ({
  game,
  viewCurrentMoveNumber,
  setViewCurrentMoveNumber,
  numberOfMoves,
}: ChessScoreboardProps) => {
  // Ensure viewCurrentMoveNumber is within bounds

  return (
    <div className="flex flex-col gap-2 justify-between min-w-48">
      <div>
        {game?.history().map((move, index, movesArray) => {
          if (index % 2 === 0) {
            const moveNumber = Math.floor(index / 2) + 1;
            const whiteMove = move;
            const blackMove = movesArray[index + 1] || "";

            return (
              <div key={index} className="flex gap-x-8">
                <p className="flex-1 -mr-7">{moveNumber}.</p>{" "}
                {/* Move Number */}
                <p
                  className={`flex-1 rounded-xl px-2 ${
                    index === viewCurrentMoveNumber ? "bg-tigers-eye " : ""
                  }`}
                >
                  {whiteMove}
                </p>{" "}
                {/* White Move */}
                <p
                  className={`flex-1 rounded-xl px-2 ${
                    index + 1 === viewCurrentMoveNumber ? "bg-tigers-eye" : ""
                  }`}
                >
                  {blackMove}
                </p>{" "}
                {/* Black Move */}
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="flex flex-row items-center justify-center">
        <div
          onClick={() => {
            setViewCurrentMoveNumber(0);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="first_page"></Icon>
        </div>
        <div
          onClick={() => {
            setViewCurrentMoveNumber(viewCurrentMoveNumber - 1);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="chevron_backward"></Icon>
        </div>

        <div
          onClick={() => {
            setViewCurrentMoveNumber(viewCurrentMoveNumber + 1);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="chevron_forward"></Icon>
        </div>

        <div
          onClick={() => {
            setViewCurrentMoveNumber(numberOfMoves - 1);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="last_page"></Icon>
        </div>
      </div>
    </div>
  );
};
