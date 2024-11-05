import { Chess } from "chess.js";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Icon } from "./Icon";

type ChessScoreboardProps = {
  game: Chess | undefined;
  viewMoveNumber: number;
  setViewMoveNumber: Dispatch<SetStateAction<number>>;
  numberOfMoves: number;
};

export const ChessScoreboard = ({
  game,
  viewMoveNumber,
  setViewMoveNumber,
  numberOfMoves,
}: ChessScoreboardProps) => {
  // Ensure viewMoveNumber is within bounds
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      console.log("right");
      if (event.key === "ArrowRight") {
        setViewMoveNumber((prev) => Math.min(prev + 1, numberOfMoves - 1));
      } else if (event.key === "ArrowLeft") {
        setViewMoveNumber((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setViewMoveNumber, numberOfMoves]);

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
                  className={`flex-1 cursor-pointer rounded-xl px-2  ${
                    index === viewMoveNumber
                      ? "bg-tigers-eye"
                      : "hover:bg-tigers-eye/50"
                  }`}
                  onClick={() => {
                    setViewMoveNumber(index);
                  }}
                >
                  {whiteMove}
                </p>
                {/* White Move */}
                <p
                  className={`flex-1 cursor-pointer rounded-xl px-2  ${
                    index + 1 === viewMoveNumber
                      ? "bg-tigers-eye"
                      : "hover:bg-tigers-eye/50"
                  }`}
                  onClick={() => {
                    setViewMoveNumber(index + 1);
                  }}
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
            setViewMoveNumber(0);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="first_page"></Icon>
        </div>
        <div
          onClick={() => {
            setViewMoveNumber((prev) => Math.max(prev - 1, 0));
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="chevron_backward"></Icon>
        </div>

        <div
          onClick={() => {
            setViewMoveNumber((prev) => Math.min(prev + 1, numberOfMoves - 1));
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="chevron_forward"></Icon>
        </div>

        <div
          onClick={() => {
            setViewMoveNumber(numberOfMoves - 1);
          }}
          className=" flex cursor-pointer hover:bg-tigers-eye rounded-lg p-1"
        >
          <Icon iconName="last_page"></Icon>
        </div>
      </div>
    </div>
  );
};
