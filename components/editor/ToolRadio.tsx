import ActionIcon from 'components/ActionIcon';
import Icons from 'components/Icons';
import type { Tool } from 'types';

type ToolRadioProps = {
  value: Tool;
  onChange: (value: Tool) => void;
};
export default function ToolRadio({ value, onChange }: ToolRadioProps) {
  return (
    <div className="flex gap-2">
      <ActionIcon
        onClick={() => onChange('Move')}
        variant={value === 'Move' ? 'filled' : 'subtle'}
        title="Move"
      >
        <Icons.move />
      </ActionIcon>
      <ActionIcon
        onClick={() => onChange('Select')}
        variant={value === 'Select' ? 'filled' : 'subtle'}
        title="Select"
      >
        <Icons.select />
      </ActionIcon>
      <ActionIcon
        onClick={() => onChange('Brush')}
        variant={value === 'Brush' ? 'filled' : 'subtle'}
        title="Brush"
      >
        <Icons.brush />
      </ActionIcon>
      <ActionIcon
        onClick={() => onChange('Rectangle')}
        variant={value === 'Rectangle' ? 'filled' : 'subtle'}
        title="Rectangle"
      >
        <Icons.rectangle />
      </ActionIcon>
      <ActionIcon
        onClick={() => onChange('Circle')}
        variant={value === 'Circle' ? 'filled' : 'subtle'}
        title="Circle"
      >
        <Icons.circle />
      </ActionIcon>
      <ActionIcon
        onClick={() => onChange('Text')}
        variant={value === 'Text' ? 'filled' : 'subtle'}
        title="Text"
      >
        <Icons.text />
      </ActionIcon>
    </div>
  );
}
