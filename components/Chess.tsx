"use client";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, Square, Move } from "chess.js";

type SquareStyles = Record<string, React.CSSProperties | undefined>;

const ChessGame: React.FC = () => {
  const [game, setGame] = useState(
    new Chess(
      "r1bq1rk1/pppn1ppp/4bn2/3pN3/3P4/2N1B3/PPP2PPP/R2Q1RK1 w - - 0 18"
    )
  );
  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [moveTo, setMoveTo] = useState<Square | null>(null);
  const [showPromotionDialog, setShowPromotionDialog] = useState(false);
  const [rightClickedSquares, setRightClickedSquares] = useState<SquareStyles>(
    {}
  );
  const [optionSquares, setOptionSquares] = useState<SquareStyles>({});

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const update = new Chess(g.fen());
      modify(update);
      return update;
    });
  }

  function getMoveOptions(square: Square): boolean {
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
  async function sendMoveToApi(
    from: Square,
    to: Square,
    promotion: string = "q"
  ) {
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

  function onSquareClick(square: Square) {
    setRightClickedSquares({});
    if (!moveFrom) {
      if (getMoveOptions(square)) setMoveFrom(square);
      return;
    }

    if (!moveTo) {
      const moves = game.moves({ square: moveFrom, verbose: true }) as Move[];
      const foundMove = moves.find(
        (m) => m.from === moveFrom && m.to === square
      );
      if (!foundMove) {
        if (getMoveOptions(square)) setMoveFrom(square);
        return;
      }

      setMoveTo(square);

      if (
        (foundMove.color === "w" &&
          foundMove.piece === "p" &&
          square[1] === "8") ||
        (foundMove.color === "b" &&
          foundMove.piece === "p" &&
          square[1] === "1")
      ) {
        setShowPromotionDialog(true);
        return;
      }

      const gameCopy = new Chess(game.fen());
      const move = gameCopy.move({
        from: moveFrom,
        to: square,
        promotion: "q",
      });
      if (move === null) {
        if (getMoveOptions(square)) setMoveFrom(square);
        return;
      }

      // Send move to API
      sendMoveToApi(moveFrom, square);

      setGame(gameCopy);
      setMoveFrom(null);
      setMoveTo(null);
      setOptionSquares({});
    }
  }

  // TODO why is this unused? Can this board promote properly?
  //   function onPromotionPieceSelect(piece: string) {
  //     if (piece) {
  //       const gameCopy = new Chess(game.fen());
  //       gameCopy.move({
  //         from: moveFrom!,
  //         to: moveTo!,
  //         promotion: piece[1].toLowerCase() ?? "q",
  //       });
  //       setGame(gameCopy);
  //     }
  //     setMoveFrom(null);
  //     setMoveTo(null);
  //     setShowPromotionDialog(false);
  //     setOptionSquares({});
  //   }

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
    <div style={{}}>
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
      />
      <button
        style={{}}
        onClick={() => {
          safeGameMutate((game) => game.reset());
          setOptionSquares({});
          setRightClickedSquares({});
        }}
      >
        reset
      </button>
      <button
        style={{}}
        onClick={() => {
          safeGameMutate((game) => game.undo());
          setOptionSquares({});
          setRightClickedSquares({});
        }}
      >
        undo
      </button>
    </div>
  );
};

export default ChessGame;
