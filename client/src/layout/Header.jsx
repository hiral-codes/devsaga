import React from "react";

export default function Header() {
  return (
    <div className="h-14 flex items-center shadow-sm justify-between px-20 border-b fixed top-0 left-0 right-0 bg-white">
      <div className="logo font-extrabold">DevSaga</div>
      <div className="flex items-center gap-4">
        <button>Create Post</button>
        <div>Notification</div>
        <div>Profile</div>
      </div>
    </div>
  );
}
