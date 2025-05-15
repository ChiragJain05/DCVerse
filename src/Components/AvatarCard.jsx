import { useState } from "react";
import { FiEdit } from "react-icons/fi";

const AvatarCard = ({ id, name, img, onEdit }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative p-4 text-center rounded-lg backdrop-blur-md bg-white/10 border border-white/20 transition hover:scale-105"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative w-24 h-24 mx-auto mb-2">
        <img
          src={img}
          alt={name}
          className="w-24 h-24 rounded-full object-cover border-2 border-white"
        />
        {hovered && (
          <div
            className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full cursor-pointer"
            onClick={() => onEdit(id)}
          >
            <FiEdit size={22} color="#fff" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold">{name}</h3>
    </div>
  );
};

export default AvatarCard;
