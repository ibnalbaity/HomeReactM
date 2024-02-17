// redux
import { useSelector } from 'src/redux/store';

// ----------------------------------------------------------------------

export default function useUser() {
  const { users, user, usersStatus, userStatus } = useSelector(
    (state) => state.user
  );

  return {
    users,
    user,
    usersStatus,
    userStatus,
  };
}
