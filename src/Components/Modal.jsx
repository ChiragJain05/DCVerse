const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <h2 className="text-2xl font-bold mb-4">Create New Avatar</h2>
        <form>
          <input
            type="text"
            placeholder="Name"
            className="border rounded w-full py-2 px-3 mb-4"
          />
          <input
            type="text"
            placeholder="Avatar URL"
            className="border rounded w-full py-2 px-3 mb-4"
          />
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
