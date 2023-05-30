import React, { useState } from "react";
import "./UserItem.css";
import ArrowUp from "../../assets/collapse-arrow.png";
import ArrowDown from "../../assets/drop-down-arrow.png";
import FollowIcon from "../../assets/following-icon.png";

const UserItem = React.memo(
  function UserItem({
    user,
    followedUsers,
    blockedUsers,
    onFollowUser,
    onUnfollowUser,
    onBlockUser,
  }) {
    const [showButtons, setShowButtons] = useState(false);
    const isUserFollowed = followedUsers.includes(user.id);
    const isUserBlocked = blockedUsers.includes(user.id);

    const handleFollowClick = () => {
      onFollowUser(user.id);
    };

    const handleUnfollowClick = () => {
      onUnfollowUser(user.id);
    };

    const handleBlockClick = () => {
      onBlockUser(user.id);
      onUnfollowUser(user.id);
      setShowButtons(false);
    };

    const handleDropdownClick = () => {
      if (!isUserBlocked) {
        setShowButtons(!showButtons);
      }
    };

    return (
      <div
        className={`${isUserBlocked ? "blocked" : ""}`}
        style={{
          opacity: isUserBlocked ? 0.5 : 1,
        }}
      >
        <div className="profile">
          <img
            className="profile-picture"
            src={user.profileImage}
            alt="Profile"
          />
          <div className="details">
            <h2>{user.name}</h2>
            <p>Reputation: {user.reputation}</p>
            {showButtons && (
              <div className="options">
                {isUserFollowed ? (
                  <button
                    className="unfollow-button"
                    onClick={handleUnfollowClick}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button className="follow-button" onClick={handleFollowClick}>
                    Follow
                  </button>
                )}
                <button className="block-button" onClick={handleBlockClick}>
                  Block
                </button>
              </div>
            )}
          </div>
          <div className="following-btn">
            {isUserFollowed && <img src={FollowIcon} alt="Following" />}
          </div>

          <img
            className="drop-down-btn"
            src={showButtons ? ArrowUp : ArrowDown}
            alt="Dropdown"
            onClick={handleDropdownClick}
          />
        </div>
      </div>
    );
  }
);

UserItem.displayName = "UserItem";

export default UserItem;
