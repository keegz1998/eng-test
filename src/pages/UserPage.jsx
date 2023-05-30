import { useState, useEffect, useCallback } from "react";
import UserList from "../components/UserList/UserList";
import Pagination from "../components/Pagination/Pagination";
import './UserPage.css';

const UsersPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchCachedUsers();
  }, []);

  const fetchCachedUsers = () => {
    const cachedUsers = JSON.parse(localStorage.getItem("cachedUsers") || "[]");
    if (cachedUsers.length > 0) {
      setUsers(cachedUsers);
      setLoading(false);
    } else {
      fetchUsers();
    }
  };

  const fetchUsers = () => {
    setLoading(true);
    fetch("https://api.stackexchange.com/2.2/users?site=stackoverflow")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        const usersData = data.items.slice(0, 20).map((item) => ({
          id: item.user_id,
          name: item.display_name,
          reputation: item.reputation,
          profileImage: item.profile_image,
        }));
        setUsers(usersData);
        setLoading(false);
        localStorage.setItem("cachedUsers", JSON.stringify(usersData));
        localStorage.removeItem("cachedUsers");
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  };

  const handleSearchChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    },
    []
  );

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="user-page-container">
      <h1>Users</h1>
      <div>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: Failed to fetch users</div>
      ) : (
        <>
          <UserList
            users={currentUsers}
            followedUsers={followedUsers}
            blockedUsers={blockedUsers}
            onFollowUser={(userId) =>
              setFollowedUsers([...followedUsers, userId])
            }
            onUnfollowUser={(userId) =>
              setFollowedUsers(followedUsers.filter((id) => id !== userId))
            }
            onBlockUser={(userId) =>
              setBlockedUsers([...blockedUsers, userId])
            }
          />
          <div>
            {filteredUsers.length > usersPerPage && (
              <Pagination
                currentPage={currentPage}
                totalUsers={filteredUsers.length}
                usersPerPage={usersPerPage}
                paginate={paginate}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersPage;
