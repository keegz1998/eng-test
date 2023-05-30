import React from "react";
import UserItem from "../UserItem/UserItem";

const UserList = React.memo(
  function UserList({
    users,
    followedUsers,
    blockedUsers,
    onFollowUser,
    onUnfollowUser,
    onBlockUser,
  }) {
    return (
      <>
        {users.length < 1 ? (
          <>
            <h2>No users matching that search term exist.</h2>
          </>
        ) : (
          <>
            {users.map((user) => (
              <UserItem
                key={user.id}
                user={user}
                followedUsers={followedUsers}
                blockedUsers={blockedUsers}
                onFollowUser={onFollowUser}
                onUnfollowUser={onUnfollowUser}
                onBlockUser={onBlockUser}
              />
            ))}
          </>
        )}
      </>
    );
  }
);

export default UserList;
