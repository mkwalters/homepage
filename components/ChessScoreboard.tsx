import { Chess } from "chess.js";
import { Dispatch, SetStateAction } from "react";
import { Icon } from "./Icon";

type ChessScoreboardProps = {
  game: Chess | undefined;
  viewCurrentMoveNumber: number | undefined;
  setViewCurrentMoveNumber: Dispatch<SetStateAction<number | undefined>>;
  numberOfMoves: number;
};

export const ChessScoreboard = ({
  game,
  viewCurrentMoveNumber,
  setViewCurrentMoveNumber,
  numberOfMoves,
}: ChessScoreboardProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between">
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
                  className={`flex-1 ${
                    index === viewCurrentMoveNumber
                      ? "bg-tigers-eye rounded-xl px-2"
                      : ""
                  }`}
                >
                  {whiteMove}
                </p>{" "}
                {/* White Move */}
                <p
                  className={`flex-1 ${
                    index + 1 === viewCurrentMoveNumber
                      ? "bg-tigers-eye rounded-xl px-2"
                      : ""
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

      <div className="flex flex-row">
        <div onClick={() => setViewCurrentMoveNumber(0)}>
          <Icon iconName="first_page"></Icon>
        </div>
        <div
          onClick={() => setViewCurrentMoveNumber((prev) => (prev ?? 0) - 1)}
        >
          <Icon iconName="chevron_backward"></Icon>
        </div>

        <div
          onClick={() => setViewCurrentMoveNumber((prev) => (prev ?? 0) + 1)}
        >
          <Icon iconName="chevron_forward"></Icon>
        </div>

        <div onClick={() => setViewCurrentMoveNumber(numberOfMoves - 1)}>
          <Icon iconName="last_page"></Icon>
        </div>
      </div>
    </div>
  );
};
