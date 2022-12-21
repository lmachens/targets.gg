type ColorSwatchType = {
  color: string;
};
export default function ColorSwatch({ color }: ColorSwatchType) {
  return <div style={{ backgroundColor: color }} />;
}
