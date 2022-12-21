import ShapeAction from './ShapeAction';

type ShapeRadioProps = {
  value: string;
  onChange: (value: string) => void;
};
export default function ShapeRadio({ value, onChange }: ShapeRadioProps) {
  return (
    <div className="flex gap-2">
      <ShapeAction
        title="Covenant"
        onClick={() => onChange('/new_world/covenant.webp')}
        imgSrc="/new_world/covenant.webp"
      />
      <ShapeAction
        title="Marauder"
        onClick={() => onChange('/new_world/marauder.webp')}
        imgSrc="/new_world/marauder.webp"
      />
    </div>
  );
}
