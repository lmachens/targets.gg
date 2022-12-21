import type { Game } from 'types';

// See https://overwolf.github.io/api/games/ids#the-gamelistxml-file
export const POPULAR_GAMES: Game[] = [
  {
    title: 'League of Legends',
    logoSrc: 'https://static.overwolf.com/GameIcons/5426.png',
    gameClassId: 5426,
    backgroundImages: [
      {
        label: "Summoner's Rift",
        value: '/lol/summoners_rift.jpg',
      },
      {
        label: "Summoner's Rift Fire",
        value: '/lol/summoners_rift_fire.jpg',
      },
      {
        label: "Summoner's Rift Ocean",
        value: '/lol/summoners_rift_ocean.jpg',
      },
      {
        label: "Summoner's Rift Wind",
        value: '/lol/summoners_rift_wind.jpg',
      },
      {
        label: "Summoner's Rift Earth",
        value: '/lol/summoners_rift_earth.jpg',
      },
      {
        label: "Summoner's Rift Minimap",
        value:
          'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/map/map11.png',
      },
      {
        label: 'ARAM Minimap',
        value:
          'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/map/map12.png',
      },
    ],
  },
  {
    title: 'New World',
    logoSrc: 'https://static.overwolf.com/GameIcons/21816.png',
    gameClassId: 21816,
    backgroundImages: [
      {
        label: 'Brightwood',
        value: '/new_world/brightwood.webp',
      },
    ],
  },
  {
    title: 'Lost Ark',
    logoSrc: 'https://static.overwolf.com/GameIcons/21864.png',
    gameClassId: 21864,
    backgroundImages: [],
  },
  {
    title: 'Songs of Conquest',
    logoSrc: 'https://static.overwolf.com/GameIcons/21986.png',
    gameClassId: 21986,
    backgroundImages: [],
  },
  {
    title: 'Valorant',
    logoSrc: 'https://static.overwolf.com/GameIcons/21640.png',
    gameClassId: 21640,
    backgroundImages: [],
  },
].sort((a, b) => {
  return a.title.localeCompare(b.title);
});

export function getGame(gameClassId: number) {
  return POPULAR_GAMES.find((game) => game.gameClassId === gameClassId);
}
