/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Save, Trash2 } from "lucide-react";
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
        <h2 className="modal--add-item">Add Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="modal-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Content"
            className="modal-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="modal--btn-container">
            <button className="modal-submit--btn" type="submit">
              <Save />
              Save
            </button>
            <button
              className="modal-close--btn"
              type="button"
              onClick={onClose}
            >
              <Trash2 />
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default Modal;
