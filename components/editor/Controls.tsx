'use client';

import ActionIcon from 'components/ActionIcon';
import ColorSwatch from 'components/ColorSwatch';
import Icons from 'components/Icons';
import { fabric } from 'fabric';
import { DEFAULT_COLORS } from 'lib/colors';
import { useEffect, useState } from 'react';
import ShapeAction from './ShapeAction';

import { useWhiteboardStore } from './store';

export default function Controls() {
  const { canvas, tool, setTool, color, setColor } = useWhiteboardStore();
  const [background, setBackground] = useState<string | null>(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!canvas) {
      return;
    }
    if (background) {
      canvas.setBackgroundImage(background, canvas.renderAll.bind(canvas), {
        originX: 'center',
        originY: 'center',
      });
    } else {
      const image = new fabric.Image('');
      canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
    }
  }, [background, canvas]);

  const swatches = Object.entries(DEFAULT_COLORS).map(([key, values]) => (
    <ActionIcon
      key={key}
      onClick={() => setColor(key)}
      variant={key === color ? 'filled' : 'subtle'}
    >
      <ColorSwatch color={values[6]} />
    </ActionIcon>
  ));
  return (
    <section>
      <h4>Meta</h4>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <h4>Background</h4>
      <select
      //   placeholder={
      //     !game || game.backgroundImages.length === 0
      //       ? "No images available"
      //       : "Select background image"
      //   }
      //   disabled={!game || game.backgroundImages.length === 0}
      //   data={game?.backgroundImages ?? []}
      //   value={background}
      //   onChange={setBackground}
      />
      <h4>Colors</h4>
      <div>{swatches}</div>
      <h4>Tools</h4>
      <div>
        <ActionIcon
          onClick={() => setTool('Move')}
          variant={tool === 'Move' ? 'filled' : 'subtle'}
          title="Move"
        >
          <Icons.move />
        </ActionIcon>
        <ActionIcon
          onClick={() => setTool('Select')}
          variant={tool === 'Select' ? 'filled' : 'subtle'}
          title="Select"
        >
          <Icons.select />
        </ActionIcon>
        <ActionIcon
          onClick={() => setTool('Brush')}
          variant={tool === 'Brush' ? 'filled' : 'subtle'}
          title="Brush"
        >
          <Icons.brush />
        </ActionIcon>
        <ActionIcon
          onClick={() => setTool('Rectangle')}
          variant={tool === 'Rectangle' ? 'filled' : 'subtle'}
          title="Rectangle"
        >
          <Icons.rectangle />
        </ActionIcon>
        <ActionIcon
          onClick={() => setTool('Circle')}
          variant={tool === 'Circle' ? 'filled' : 'subtle'}
          title="Circle"
        >
          <Icons.circle />
        </ActionIcon>
        <ActionIcon
          onClick={() => setTool('Text')}
          variant={tool === 'Text' ? 'filled' : 'subtle'}
          title="Text"
        >
          <Icons.text />
        </ActionIcon>
      </div>
      <h4>Shapes</h4>
      <div>
        <ShapeAction
          title="Covenant"
          onClick={() => setTool('/new_world/covenant.webp')}
          imgSrc="/new_world/covenant.webp"
        />
        <ShapeAction
          title="Marauder"
          onClick={() => setTool('/new_world/marauder.webp')}
          imgSrc="/new_world/marauder.webp"
        />
      </div>
      <h4>Actions</h4>
      {/* <div>
          <Button
            onClick={() => {
              canvas?.clear();
              setBackground(null);
            }}
            color="orange"
          >
            Reset
          </Button>
          <Button
            disabled={!title || !game || !background}
            loading={isLoading}
            onClick={() =>
            //   mutate({
            //     gameClassId: game!.gameClassId,
            //     title,
            //     background: background!,
            //     data: JSON.stringify(canvas),
            //   })
            }
            color="green"
          >
            Save
          </Button>
        </div> */}
    </section>
  );
}
