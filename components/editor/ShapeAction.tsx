import ActionIcon from "components/ActionIcon";
import Avatar from "components/Avatar";

type ShapeActionProps = {
  title: string;
  onClick: () => void;
  imgSrc: string;
};
export default function ShapeAction({
  title,
  onClick,
  imgSrc,
}: ShapeActionProps) {
  return (
    <ActionIcon title={title} onClick={onClick}>
      <Avatar draggable={false}>
        <Avatar.Image src={imgSrc} />
      </Avatar>
    </ActionIcon>
  );
}
