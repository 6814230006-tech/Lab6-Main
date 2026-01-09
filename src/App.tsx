import Header from './components/Header';
import Footer from './components/Footer';
import PokemonCard from './components/PokemonCard';
import PokemonSelector from './components/PokemonSelector';
import type { PokemonCardData } from './types/pokemon';
import './App.css';

// ข้อมูลตัวอย่าง (ยังไม่ได้ดึงจาก API)
const samplePokemons: PokemonCardData[] = [
    {
        id: 1,
        name: 'bulbasaur',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        types: ['grass', 'poison']
    },
    {
        id: 4,
        name: 'charmander',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        types: ['fire']
    },
    {
        id: 7,
        name: 'squirtle',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        types: ['water']
    },
    {
        id: 25,
        name: 'pikachu',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        types: ['electric']
    }
];

function App() {
    const handleFavoriteClick = (id: number) => {
        console.log('Favorite clicked:', id);
        // จะเพิ่ม logic ใน Part ถัดไป
    };

    return (
        <div className="app">
            <Header />

            <main className="main-content">
                <PokemonSelector />
                <h2>Starter Pokemon</h2>

                <div className="pokemon-grid">
                    {samplePokemons.map((pokemon) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            onFavoriteClick={handleFavoriteClick}
                            isFavorite={pokemon.id === 25}  // Pikachu is favorite
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default App;