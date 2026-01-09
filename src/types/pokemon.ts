// Types สำหรับ Pokemon App

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface Pokemon {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
        back_default: string | null;
        front_shiny: string | null;
        other?: {
            'official-artwork'?: {
                front_default: string;
            };
        };
    };
    types: PokemonType[];
    stats: PokemonStat[];
}

// Type สำหรับ Pokemon Card (เลือกเฉพาะที่ต้องใช้)
export interface PokemonCardData {
    id: number;
    name: string;
    imageUrl: string;
    types: string[];
}