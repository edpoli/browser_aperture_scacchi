import { Chess } from 'chess.js'

// Pezzi in Unicode
const PEZZI = {
    wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
    bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
}

function Scacchiera({ fen }) {
    const chess = new Chess(fen)
    const board = chess.board() // array 8x8 di pezzi

    return (
        <div className="inline-block border-2 border-gray-400">
            {board.map((riga, rigaIndex) => (
                <div key={rigaIndex} className="flex">
                    {riga.map((casa, colonnaIndex) => {
                        const casaChiara = (rigaIndex + colonnaIndex) % 2 === 0
                        const pezzo = casa ? PEZZI[casa.color + casa.type.toUpperCase()] : null

                        return (
                            <div
                                key={colonnaIndex}
                                className={`w-8 h-8 flex items-center justify-center text-xl select-none
                  ${casaChiara ? 'bg-amber-100' : 'bg-amber-700'}`}
                            >
                                {pezzo}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}

export default Scacchiera