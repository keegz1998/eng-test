
import React from "react";
import { render, screen, fireEvent} from "@testing-library/react";
import UserItem from "./UserItem";

describe("UserItem", () => {
  const user = {
    id: 1,
    name: "John Doe",
    reputation: 100,
    profileImage: "profile.jpg",
  };
  const followedUsers = [4, 2, 3];
  const blockedUsers = [4, 5, 6];
  const onFollowUser = jest.fn();
  const onUnfollowUser = jest.fn();
  const onBlockUser = jest.fn();

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <UserItem
        user={user}
        followedUsers={followedUsers}
        blockedUsers={blockedUsers}
        onFollowUser={onFollowUser}
        onUnfollowUser={onUnfollowUser}
        onBlockUser={onBlockUser}
      />
    );
  });

  it("renders user details correctly", () => {
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Reputation: 100")).toBeInTheDocument();
    expect(screen.getByAltText("Profile")).toHaveAttribute("src", "profile.jpg");
  });

  it('displays follow button if user is not followed', async () => {
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    await fireEvent.click(dropDownBtn[0]);
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.queryByText("Unfollow")).not.toBeInTheDocument();
  });

  it("displays unfollow button if user is followed", async () => {
    followedUsers.push(user.id);
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    await fireEvent.click(dropDownBtn[0]);
    expect(screen.getByText("Unfollow")).toBeInTheDocument();
    expect(screen.queryByText("Follow")).not.toBeInTheDocument();
  });

  it("triggers onFollowUser when follow button is clicked",  () => {
    followedUsers.pop();
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    fireEvent.click(dropDownBtn[0]);
    const followButton = screen.getByText("Follow");
    fireEvent.click(followButton);
    expect(onFollowUser).toHaveBeenCalledWith(user.id);
  });

  it("triggers onUnfollowUser when unfollow button is clicked", () => {
    followedUsers.push(user.id);
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    fireEvent.click(dropDownBtn[0]);
    const unfollowButton = screen.getByText("Unfollow");
    fireEvent.click(unfollowButton);
    expect(onUnfollowUser).toHaveBeenCalledWith(user.id);
  });

  it("triggers onBlockUser and onUnfollowUser when block button is clicked", () => {
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    fireEvent.click(dropDownBtn[0]);
    const blockButton = screen.getByText("Block");
    fireEvent.click(blockButton);
    expect(onBlockUser).toHaveBeenCalledWith(user.id);
    expect(onUnfollowUser).toHaveBeenCalledWith(user.id);
  });

  it("toggles showButtons state when dropdown button is clicked", () => {
    followedUsers.pop();
    expect(screen.queryByText("Follow")).not.toBeInTheDocument();
    expect(screen.queryByText("Unfollow")).not.toBeInTheDocument();
    expect(screen.queryByText("Block")).not.toBeInTheDocument();
    let dropDownBtn = screen.getAllByAltText('Dropdown');
    fireEvent.click(dropDownBtn[0]);
    expect(screen.getByText("Follow")).toBeInTheDocument();
    expect(screen.getByText("Block")).toBeInTheDocument();
  });
});