export type getPokemonResponse = {

  id: number;
  name: string;
  height: number;
  weight: number;

  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };

  types: {
    type: {
      name: string;
    };
  }[];

  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];

  abilities: {
    ability: {
      name: string;
    };
  }[];
};