import type { Game } from 'types';

type GameRadioProps = {
  game: Game;
  value: string;
  onChange: (value: string) => void;
};

export default function BackgroundImageRadio({
  game,
  value,
  onChange,
}: GameRadioProps) {
  return (
    <div className="flex gap-2">
      {game.backgroundImages.map((backgroundImage) => (
        <button
          key={backgroundImage.value}
          onClick={() => onChange(backgroundImage.value)}
          className={backgroundImage.value === value ? '' : 'grayscale'}
          title={backgroundImage.label}
          type="button"
        >
          {backgroundImage.label}
        </button>
      ))}
    </div>
  );
}
