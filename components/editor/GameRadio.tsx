import ActionIcon from 'components/ActionIcon';
import Avatar from 'components/Avatar';
import { POPULAR_GAMES } from 'lib/games';

type GameRadioProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function GameRadio({ value, onChange }: GameRadioProps) {
  return (
    <div className="flex gap-2">
      {POPULAR_GAMES.map((game) => (
        <ActionIcon
          key={game.gameClassId}
          onClick={() => onChange(game.gameClassId)}
          variant={game.gameClassId === value ? 'filled' : 'subtle'}
          title={game.title}
        >
          <Avatar>
            <Avatar.Image src={game.logoSrc} draggable={false} />
          </Avatar>
        </ActionIcon>
      ))}
    </div>
  );
}
