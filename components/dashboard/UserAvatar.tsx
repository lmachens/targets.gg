import type { AvatarProps } from '@radix-ui/react-avatar';

import type { User } from 'next-auth';
import Avatar from 'components/Avatar';
import Icons from 'components/Icons';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image && <Avatar.Image alt="Picture" src={user.image} />}
      <Avatar.Fallback>
        <Icons.user />
      </Avatar.Fallback>
    </Avatar>
  );
}
