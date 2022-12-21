import type { AvatarProps } from '@radix-ui/react-avatar';

import type { User } from 'next-auth';
import Avatar from 'components/Avatar';
import { IconUser } from '@tabler/icons';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image && <Avatar.Image alt="Picture" src={user.image} />}
      <Avatar.Fallback>
        <IconUser />
      </Avatar.Fallback>
    </Avatar>
  );
}
