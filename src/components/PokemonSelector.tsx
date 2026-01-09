import { useMemo, useState } from 'react';
import type { Pokemon } from '../types/pokemon';

// ตัวอย่างรายการ Pokemon (ย้ายมาไว้ระดับโมดูล เพื่อให้ stable และไม่ต้องใส่เป็น dependency ที่เปลี่ยนบ่อย)
const SAMPLE_POKEMONS: Pokemon[] = [
    {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    },
    {
        id: 4,
        name: 'charmander',
        height: 6,
        weight: 85,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    },
    {
        id: 7,
        name: 'squirtle',
        height: 5,
        weight: 90,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    },
    {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    },
    {
        id: 42,
        name: 'golbat',
        height: 16,
        weight: 550,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/42.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    },
    {
        id: 93,
        name: 'haunter',
        height: 16,
        weight: 1,
        sprites: {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/93.png',
            back_default: null,
            front_shiny: null,
            other: {}
        },
        types: [],
        stats: []
    }
];

function PokemonSelector() {
    // single selection
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    // favorites
    const [favorites, setFavorites] = useState<Pokemon[]>([]);

    // filters
    const [filters, setFilters] = useState<{
        type: string;
        search: string;
        page: number;
    }>({
        type: 'all',
        search: '',
        page: 1
    });

    // realtime filtered results (case-insensitive)
    const filteredResults = useMemo(() => {
        const q = filters.search.trim().toLowerCase();
        if (!q) return SAMPLE_POKEMONS;
        return SAMPLE_POKEMONS.filter(p => p.name.toLowerCase().includes(q) || String(p.id) === q);
    }, [filters.search]);

    const updateSearch = (searchText: string) => {
        setFilters(prev => ({ ...prev, search: searchText }));
    };

    const addToFavorites = (pokemon: Pokemon) => {
        setFavorites(prev => {
            if (prev.find(p => p.id === pokemon.id)) return prev;
            return [...prev, pokemon];
        });
    };

    const removeFromFavorites = (pokemonId: number) => {
        setFavorites(prev => prev.filter(p => p.id !== pokemonId));
        if (selectedPokemon && selectedPokemon.id === pokemonId) {
            setSelectedPokemon(null);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => updateSearch(e.target.value)}
                    placeholder="ค้นหา Pokemon (พิมพ์ชื่อหรือ id)..."
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 8 }}
                />

                <button onClick={() => setSelectedPokemon(filteredResults[0] ?? SAMPLE_POKEMONS[3])} title="เลือกตัวอย่าง">
                    เลือกตัวอย่าง
                </button>
                <button onClick={() => addToFavorites(SAMPLE_POKEMONS[3])} title="เพิ่มตัวอย่างใน Favorites">
                    เพิ่ม favorites
                </button>
            </div>

            {/* รายการผลการค้นหา (realtime) */}
            <div style={{ marginBottom: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
                    {filteredResults.map(p => (
                        <div key={p.id} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: 8, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                            <img src={p.sprites.front_default} alt={p.name} width={48} height={48} />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, textTransform: 'capitalize' }}>{p.name}</div>
                                <div style={{ fontSize: 12, color: '#ccc' }}>ID: #{p.id}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                                <button onClick={() => setSelectedPokemon(p)}>เลือก</button>
                                <button onClick={() => addToFavorites(p)}>เพิ่ม favorites</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedPokemon && (
                <div style={{ marginBottom: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
                    <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} width={64} height={64} />
                    <div>
                        <h3 style={{ margin: 0 }}>{selectedPokemon.name}</h3>
                        <div style={{ fontSize: 12, color: '#ccc' }}>ID: #{selectedPokemon.id}</div>
                    </div>
                    <button onClick={() => setSelectedPokemon(null)} style={{ marginLeft: 'auto' }}>เคลียร์</button>
                </div>
            )}

            <div>
                <p>Favorites: {favorites.length}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {favorites.map(f => (
                        <li key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                            <img src={f.sprites.front_default} alt={f.name} width={40} height={40} />
                            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{f.name}</span>
                            <button onClick={() => removeFromFavorites(f.id)} style={{ marginLeft: 'auto' }}>ลบ</button>
                            <button onClick={() => setSelectedPokemon(f)}>เลือก</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PokemonSelector;
