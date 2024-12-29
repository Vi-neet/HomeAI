/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, onSave,defaultContent }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(defaultContent);
  useEffect(()=>{
    setContent(defaultContent);
  },[defaultContent])
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    onClose();
  };
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
