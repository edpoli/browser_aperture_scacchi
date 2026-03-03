import { useState } from 'react'
import { Chess } from 'chess.js'
import Scacchiera from './Scacchiera'

function AperturaCard({ apertura, isPreferita, onTogglePreferito }) {
    const [mostraScacchiera, setMostraScacchiera] = useState(false)
    const [mossaCorrente, setMossaCorrente] = useState(0)

    const mosse = apertura.mossePgn.split(' ')

    function calcolaFen(fino) {
        const chess = new Chess()
        mosse.slice(0, fino).forEach((mossa) => chess.move(mossa))
        return chess.fen()
    }

    function toggleScacchiera() {
        setMostraScacchiera(!mostraScacchiera)
        setMossaCorrente(0)
    }

    return (
        <div className="bg-taupe-200 rounded-xl border border-gray-200 p-5">

            <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold text-gray-800">{apertura.nome}</h2>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                    {apertura.difficolta}
                </span>
            </div>

            <p className="text-sm font-mono text-blue-600 mb-2">{apertura.mosse}</p>
            <p className="text-sm text-gray-500">{apertura.descrizione}</p>

            {mostraScacchiera && (
                <div className="mt-4">

                    <div className="w-full max-w-70">
                        <Scacchiera fen={calcolaFen(mossaCorrente)} />
                    </div>

                    {/* Controlli */}
                    <div className="flex items-center gap-3 mt- flex-wrap3">
                        <button
                            onClick={() => setMossaCorrente(m => Math.max(0, m - 1))}
                            disabled={mossaCorrente === 0}
                            className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            ←
                        </button>

                        <div className="flex flex-wrap gap-1 flex-1">
                            {mosse.map((mossa, index) => (
                                <button
                                    key={index}
                                    onClick={() => setMossaCorrente(index + 1)}
                                    className={`text-xs px-2 py-1 rounded transition-colors
                    ${mossaCorrente > index
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    {mossa}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setMossaCorrente(m => Math.min(mosse.length, m + 1))}
                            disabled={mossaCorrente === mosse.length}
                            className="px-3 py-1 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            →
                        </button>
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        {mossaCorrente === 0 ? 'Posizione iniziale' : `Mossa ${mossaCorrente} di ${mosse.length}`}
                    </p>

                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                        {apertura.colore === 'bianco' ? '⬜ Bianco' : '⬛ Nero'}
                    </span>
                    <button
                        onClick={toggleScacchiera}
                        className="text-xs text-blue-500 hover:text-blue-700 transition-colors"
                    >
                        {mostraScacchiera ? 'Nascondi scacchiera' : 'Mostra scacchiera'}
                    </button>
                </div>
                <button
                    onClick={() => onTogglePreferito(apertura.id)}
                    className="text-xl transition-transform hover:scale-110"
                >
                    {isPreferita ? '❤️' : '🤍'}
                </button>
            </div>

        </div>
    )
}

export default AperturaCard