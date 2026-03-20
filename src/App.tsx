import { useState } from 'react'
import aperture, { Apertura } from './aperture'
import AperturaCard from './AperturaCard' // ← nuovo

function App() {
  const [preferiti, setPreferiti] = useState <number[]>([])
  const [ricerca, setRicerca] = useState ('')
  const [colore, setColore] = useState< "bianco" | "nero" | "tutti"> ('tutti')
  const [difficolta, setDifficolta] = useState <"principiante" | "intermedio" | "avanzato"|"tutti"> ('tutti')
  const [mostraPreferiti, setMostraPreferiti] = useState(false)

  function togglePreferito(id:number) {
    if (preferiti.includes(id)) {
      setPreferiti(preferiti.filter((p) => p !== id))
    } else {
      setPreferiti([...preferiti, id])
    }
  }

  const apertureFiltrate = aperture.filter((apertura) => {
    const matchRicerca = apertura.nome.toLowerCase().includes(ricerca.toLowerCase())
    const matchColore = colore === 'tutti' || apertura.colore === colore
    const matchDifficolta = difficolta === 'tutti' || apertura.difficolta === difficolta
    const matchPreferiti = !mostraPreferiti || preferiti.includes(apertura.id)
    return matchRicerca && matchColore && matchDifficolta && matchPreferiti
  })

  return (
    <div className="min-h-screen bg-stone-900 px-4 py-12">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100">
            ♟️ Explorer Aperture
          </h1>
          <button
            onClick={() => setMostraPreferiti(!mostraPreferiti)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition-colors
              ${mostraPreferiti
                ? 'bg-red-400 text-white border-red-400'
                : 'bg-white text-gray-500 border-gray-300 hover:border-red-300'
              }`}
          >
            ❤️ Preferiti {preferiti.length > 0 && `(${preferiti.length})`}
          </button>
        </div>

        {/* Ricerca */}
        <input
          type="text"
          value={ricerca}
          onChange={(e) => setRicerca(e.target.value)}
          placeholder="Cerca un'apertura..."
          className="w-full px-4 py-2 rounded-lg border text-amber-300 border-gray-300 outline-none focus:border-blue-500 mb-4"
        />

        {/* Filtri */}
        <div className="flex flex-col gap-6 mb-6">

          <div className="flex flex-wrap gap-2">
            <p className=' text-white'>  Colore:</p>
            {(['tutti', 'bianco', 'nero'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setColore(c)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors
                  ${colore === c
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-blue-400'
                  }`}
              >
                {c === 'tutti' ? 'Tutti' : c === 'bianco' ? '⬜ Bianco' : '⬛ Nero'}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <p className=' text-white'>  Difficoltà:  </p>
            {(['tutti', 'principiante', 'intermedio', 'avanzato']as const).map((d) => (
              <button
                key={d}
                onClick={() => setDifficolta(d)}
                className={`px-3 py-1 rounded-full text-sm border transition-colors
                  ${difficolta === d
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-white text-gray-500 border-gray-300 hover:border-blue-400'
                  }`}
              >
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Lista */}
        <div className="flex flex-col gap-4">
          {apertureFiltrate.length === 0 ? (
            <p className="text-center text-gray-400 py-12">Nessuna apertura trovata</p>
          ) : (
            apertureFiltrate.map((apertura) => (
              <AperturaCard
                key={apertura.id}
                apertura={apertura}
                isPreferita={preferiti.includes(apertura.id)}
                onTogglePreferito={togglePreferito}
              />
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default App