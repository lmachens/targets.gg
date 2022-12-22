type ColorSwatchType = {
  color: string;
};
export default function ColorSwatch({ color }: ColorSwatchType) {
  return (
    <div className="h-6 w-6 rounded-full" style={{ backgroundColor: color }} />
  );
}
