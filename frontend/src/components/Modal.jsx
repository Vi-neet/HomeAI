/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
const Modal = ({ isOpen, onClose, onSave, defaultTitle, defaultContent }) => {
  const [title, setTitle] = useState(defaultTitle);
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    setTitle(defaultTitle);
    setContent(defaultContent);
  }, [defaultTitle, defaultContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal">
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
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </>
  );
};
export default Modal;