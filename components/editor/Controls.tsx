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

  return (
    <section>
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
