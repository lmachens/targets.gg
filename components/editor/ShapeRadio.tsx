import ActionIcon from 'components/ActionIcon';
import Avatar from 'components/Avatar';

const shapes = [
  {
    title: 'Covenant',
    imgSrc: '/new_world/covenant.webp',
  },
  {
    title: 'Marauder',
    imgSrc: '/new_world/marauder.webp',
  },
  {
    title: 'Syndicate',
    imgSrc: '/new_world/syndicate.webp',
  },
];
type ShapeRadioProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function ShapeRadio({ value, onChange }: ShapeRadioProps) {
  return (
    <div className="flex gap-2">
      {shapes.map((shape) => (
        <ActionIcon
          key={shape.imgSrc}
          title={shape.title}
          onClick={() => onChange(shape.imgSrc)}
          variant={shape.imgSrc === value ? 'filled' : 'subtle'}
        >
          <Avatar>
            <Avatar.Image src={shape.imgSrc} draggable={false} />
          </Avatar>
        </ActionIcon>
      ))}
    </div>
  );
}
