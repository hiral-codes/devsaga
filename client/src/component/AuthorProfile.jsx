import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
function Profile() {
  const { username } = useParams();
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await api.get(`/get-author/${username}`);
        setAuthor(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.log("error:", error);
      }
    };
    getBlog();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-md border overflow-hidden">
      <div className="flex items-center justify-between rounded-md border p-4">
        <div className="flex items-center gap-2">
          <img
            src={author.image || "/hiral.jpg"}
            alt=""
            className="h-12 w-12 overflow-hidden rounded-full object-cover"
          />
          <div>
            <div className="font-semibold">
              {author.firstName} {author.lastName}
            </div>
            <div className="text-xs">{author.authorUsername}</div>
          </div>
        </div>
        <div>{author.followersCount} Followers</div>
      </div>
      <div className="py-4">
        <button className="p-2 ring-1  ring-blue-600 w-full font-semibold text-blue-600 hover:bg-blue-600 hover:border-none hover:text-white rounded-md">
          Follow
        </button>
      </div>
    </div>
  );
}

export default Profile;
