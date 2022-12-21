import ActionIcon from 'components/ActionIcon';
import ColorSwatch from 'components/ColorSwatch';
import { DEFAULT_COLORS } from 'lib/colors';

type ColorRadioProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function ColorRadio({ value, onChange }: ColorRadioProps) {
  return (
    <>
      {Object.entries(DEFAULT_COLORS).map(([key, values]) => (
        <ActionIcon
          key={key}
          onClick={() => onChange(key)}
          variant={key === value ? 'filled' : 'subtle'}
          title={key}
        >
          <ColorSwatch color={values[6]} />
        </ActionIcon>
      ))}
    </>
  );
}
