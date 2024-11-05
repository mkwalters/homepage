"use client";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, Move } from "chess.js";
import { Spinner, Typography } from "@material-tailwind/react";
import { BoardOrientation } from "react-chessboard/dist/chessboard/types";
import Card from "./TypographyCard";
import React from "react";
import { ChessScoreboard } from "./ChessScoreboard";

type SquareStyles = Record<string, React.CSSProperties | undefined>;

const ChessGame: React.FC = () => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [gameToDisplay, setGameToDisplay] = useState<Chess>(new Chess());
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({});
  const [myPiecesColor, setMyPiecesColor] = useState<"w" | "b">("w");
  const [currentColorToPlay, setCurrentColorToPlay] = useState<"w" | "b">("w");
  const [boardOrientation, setBoardOrientation] =
    useState<BoardOrientation>("white");

  const [viewCurrentMoveNumber, setViewCurrentMoveNumber] = useState<number>(0);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  useEffect(() => {
    const updatedGameToDisplay = new Chess();
    moveHistory.forEach((move, index) => {
      if (index <= viewCurrentMoveNumber) {
        updatedGameToDisplay.move(move);
      }
    });
    setGameToDisplay(updatedGameToDisplay);
  }, [moveHistory, viewCurrentMoveNumber]);

  useEffect(() => {
    // Fetch all moves from the API and update the game state
    async function fetchMoves() {
      try {
        const response = await fetch("/api/game");
        const data = await response.json();

        if (response.ok) {
          const fetchedGame = new Chess();
          data.game.moves.forEach((move: Move) => {
            fetchedGame.move({
              from: move.from,
              to: move.to,
              promotion: move.promotion,
            });
          });

          setBoardOrientation(
            data.game.playerColor !== "w" ? "white" : "black"
          );
          setMoveHistory(data?.game?.moves || []);
          setMyPiecesColor(data.game.playerColor as "w" | "b");
          setCurrentColorToPlay(data.game.moves.length % 2 === 0 ? "w" : "b");
          setViewCurrentMoveNumber(data.game.moves.length - 1);
          setGame(fetchedGame);
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

  const onSquareClick = (square: Square) => {
    if (currentColorToPlay === myPiecesColor) return;
    setRightClickedSquares({});

    if (!moveFrom) {
      if (getMoveOptions(square)) setMoveFrom(square);
      return;
    }

    const moves = game.moves({ square: moveFrom, verbose: true }) as Move[];
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    if (!foundMove) {
      if (getMoveOptions(square)) setMoveFrom(square);
      return;
    }

    if (
      (foundMove.color === "w" &&
        foundMove.piece === "p" &&
        square[1] === "8") ||
      (foundMove.color === "b" && foundMove.piece === "p" && square[1] === "1")
    ) {
      setMoveTo(square);
      setShowPromotionDialog(true);
      return;
    }
    const gameCopy = new Chess();
    game.history({ verbose: true }).forEach((move) => {
      gameCopy.move(move);
    });

    const move = gameCopy.move({
      from: moveFrom,
      to: square,
    });
    setMoveHistory((prevHistory) => [...prevHistory, move]);
    setGame((prevGame) => {
      const gameCopy = new Chess();
      prevGame.history({ verbose: true }).forEach((move) => {
        gameCopy.move(move);
      });

      const move = gameCopy.move({
        from: moveFrom,
        to: square,
      });
      if (move === null) {
        if (getMoveOptions(square)) setMoveFrom(square);
        return prevGame;
      }

      return gameCopy;
    });

    sendMoveToApi(moveFrom, square);
    setViewCurrentMoveNumber((prev) => prev + 1);
    setMoveFrom(null);
    setMoveTo(null);
    setOptionSquares({});
    setCurrentColorToPlay(currentColorToPlay === "w" ? "b" : "w");
  };

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

  if (!gameToDisplay) {
    return (
      <div className="flex mx-auto">
        <Spinner color="green" />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-12">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col w-full h-full gap-4">
          <Card styles="mx-auto">
            <Typography className="mx-auto flex">Walters</Typography>
          </Card>
          <Chessboard
            id="chess"
            animationDuration={200}
            arePiecesDraggable={false}
            position={gameToDisplay.fen()}
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
                  ? `Please make a move and check back later. I try to play my moves within 24 hours. Thanks and good luck!`
                  : `It is currently my turn to play so please check back later. I try to make my moves within 24 hours. Thanks!`}
              </Typography>
            </Card>
          </div>
        </div>
      </div>
      <Card styles="p-4">
        <ChessScoreboard
          game={game}
          viewCurrentMoveNumber={viewCurrentMoveNumber}
          setViewCurrentMoveNumber={setViewCurrentMoveNumber}
          numberOfMoves={moveHistory.length}
        />
      </Card>
    </div>
  );
};

export default ChessGame;
