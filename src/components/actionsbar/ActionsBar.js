import React from "react";
import "./ActionsBar.css";

const ActionsBar = ({ postId }) => {
  return (
    <div className="actionsbar">
      <img
        src="https://www.searchpng.com/wp-content/uploads/2019/02/Instagram-Like-Icon-1.png"
        alt="like"
        className="actionsbar___icon"
      />

      <img
        src="https://img.pngio.com/instagram-comment-icon-clipart-images-gallery-for-free-download-instagram-comment-png-2048_2048.png"
        alt="comment"
        className="actionsbar___iconComment"
      />

      <img
        src="https://static.thenounproject.com/png/3084968-200.png"
        alt="directmessage"
        className="actionsbar___iconMessage"
      />
    </div>
  );
};

export default ActionsBar;
