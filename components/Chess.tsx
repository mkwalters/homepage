"use client";
import { useCallback, useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, Move } from "chess.js";
import { Spinner, Typography } from "@material-tailwind/react";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import Card from "./TypographyCard";
import { Icon } from "./Icon";
import React from "react";

type SquareStyles = Record<string, React.CSSProperties | undefined>;

const ChessGame: React.FC = () => {
  const [game, setGame] = useState<Chess | undefined>(undefined);
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({});
  const [myPiecesColor, setMyPiecesColor] = useState<"w" | "b" | undefined>(
    undefined
  );
  const [currentColorToPlay, setCurrentColorToPlay] = useState<
    "w" | "b" | undefined
  >(undefined);
  const [boardOrientation, setBoardOrientation] =
    useState<BoardOrientation>("white");

  // TODO lets properly type this API response
  useEffect(() => {
    // Fetch all moves from the API and update the game state
    async function fetchMoves() {
      try {
        const response = await fetch("/api/game");
        const data = await response.json();

        if (response.ok) {
          // Create a new Chess instance and apply all moves sequentially
          const gameCopy = new Chess();
          data.game.moves.forEach((move: Move) => {
            gameCopy.move({
              from: move.from,
              to: move.to,
              promotion: move.promotion,
            });
          });
          setBoardOrientation(
            data.game.playerColor !== "w" ? "white" : "black"
          );

          // Update the game state
          setMyPiecesColor(data.game.playerColor as "w" | "b");
          setCurrentColorToPlay(data.game.moves.length % 2 === 0 ? "w" : "b");
          setGame(gameCopy);
        } else {
          console.error("Failed to fetch moves:", data.error);
        }
      } catch (error) {
        console.error("Error fetching moves:", error);
      }
    }

    fetchMoves();
  }, []);

  function getMoveOptions(square: Square): boolean {
    if (!game) return false;
    const moves = game.moves({ square, verbose: true }) as Move[];
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    const newSquares: SquareStyles = {};
    moves.forEach((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to)!.color !== game.get(square)!.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });

    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
    return true;
  }

  async function sendMoveToApi(from: Square, to: Square, promotion?: string) {
    try {
      const response = await fetch("/api/move", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ from, to, promotion }),
      });
      const data = await response.json();
      console.log("Move transmitted to API:", data);
    } catch (error) {
      console.error("Failed to transmit move:", error);
    }
  }

  const onSquareClick = useCallback(
    (square: Square) => {
      if (myPiecesColor === currentColorToPlay) {
        return;
      }

      setRightClickedSquares({});

      if (!moveFrom) {
        // Select the starting square
        if (getMoveOptions(square)) setMoveFrom(square);
        return;
      }

      if (!moveTo) {
        const moves = game!.moves({
          square: moveFrom,
          verbose: true,
        }) as Move[];

        const foundMove = moves.find(
          (m) => m.from === moveFrom && m.to === square
        );

        if (!foundMove) {
          if (getMoveOptions(square)) setMoveFrom(square);
          return;
        }

        if (
          (foundMove.color === "w" &&
            foundMove.piece === "p" &&
            square[1] === "8") ||
          (foundMove.color === "b" &&
            foundMove.piece === "p" &&
            square[1] === "1")
        ) {
          setMoveTo(square);
          setShowPromotionDialog(true);
          return;
        }

        const gameCopy = new Chess(game!.fen());
        const move = gameCopy.move({
          from: moveFrom,
          to: square,
        });

        if (move === null) {
          if (getMoveOptions(square)) setMoveFrom(square);
          return;
        }

        sendMoveToApi(moveFrom, square);

        setGame(gameCopy);
        setMoveFrom(null);
        setMoveTo(null);
        setOptionSquares({});
        setCurrentColorToPlay(currentColorToPlay === "w" ? "b" : "w");
      }
    },
    [game, moveFrom, moveTo, myPiecesColor, currentColorToPlay, getMoveOptions]
  );

  function onSquareRightClick(square: Square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares((prev: SquareStyles) => ({
      ...prev,
      [square]:
        prev[square] && prev[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    }));
  }

  return (
    <div className="flex flex-row bg-purple-400 gap-8">
      <div className="flex flex-col justify-center items-center gap-4 ">
        {game ? (
          <div className="flex  flex-col w-full h-full gap-4">
            <Card styles="mx-auto">
              <Typography className="mx-auto flex">Walters</Typography>
            </Card>
            <Chessboard
              id="chess"
              animationDuration={200}
              arePiecesDraggable={false}
              position={game.fen()}
              onSquareClick={onSquareClick}
              onSquareRightClick={onSquareRightClick}
              customBoardStyle={{
                borderRadius: "4px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
              }}
              customSquareStyles={{
                ...optionSquares,
                ...rightClickedSquares,
              }}
              promotionToSquare={moveTo}
              showPromotionDialog={showPromotionDialog}
              boardOrientation={boardOrientation}
            />
            <Card styles="mx-auto">
              <Typography className="mx-auto flex">Internet</Typography>
            </Card>
            <div className="text-center">
              <Card>
                <Typography>
                  {myPiecesColor !== currentColorToPlay
                    ? `Please make a move and check back later. I try to play my moves
            within 24 hours. Thanks and good luck!`
                    : `It is currently my turn to play so please check back later. I try to
            make my moves within 24 hours. Thanks!`}
                </Typography>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex mx-auto ">
            <Spinner color="green" />
          </div>
        )}
      </div>
      <div className="flex w-96  bg-yellow-600">
        <div className="grid grid-cols-3 gap-x-2 w-96 bg-yellow-600 p-4">
          <div className="flex flex-col w-96 bg-yellow-600 p-4">
            {game?.moves().map((move, index, movesArray) => {
              // Only process every second move (index % 2 === 0) to display both White and Black moves together
              if (index % 2 === 0) {
                const moveNumber = Math.floor(index / 2) + 1;
                const whiteMove = move;
                const blackMove = movesArray[index + 1] || ""; // Get Black's move if it exists, otherwise leave empty

                return (
                  <p key={index}>
                    {`${moveNumber}. ${whiteMove} ${blackMove}`}
                  </p>
                );
              }
              return null; // Skip odd indices to avoid duplication
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChessGame;
