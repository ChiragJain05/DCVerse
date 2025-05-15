import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import AvatarCard from "../Components/AvatarCard";
import { users as userData, presetImages } from "../assets/Data";

const Dashboard = () => {
  const [avatars, setAvatars] = useState(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);
  const [formData, setFormData] = useState({ name: "", image: "" });

  const cardsRef = useRef([]);

  const openEditModal = (id) => {
    const current = avatars.find((a) => a.id === id);
    if (current) {
      setFormData({ name: current.name, image: current.img });
      setCurrentEditId(id);
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    if (formData.name.trim() === "" || formData.image.trim() === "") {
      alert("Please fill out both name and image.");
      return;
    }

    if (currentEditId !== null) {
      setAvatars((prev) =>
        prev.map((avatar) =>
          avatar.id === currentEditId
            ? { ...avatar, name: formData.name, img: formData.image }
            : avatar
        )
      );
    } else {
      const newAvatar = {
        id: Date.now(),
        name: formData.name,
        img: formData.image,
      };
      setAvatars((prev) => [...prev, newAvatar]);
    }

    setIsModalOpen(false);
    setCurrentEditId(null);
    setFormData({ name: "", image: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageURL }));
    }
  };

  useGSAP(() => {
    gsap.from(".profile", {
      y: -60,
      duration: 0.8,
      delay: 0.3,
      opacity: 0,
      scale: 0,
      ease: "power2.out",
    });

    gsap.from(".avatar-card", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.5,
      ease: "power2.in",
      delay: 0.5,
    });

    gsap.from(".create-avatar-btn", {
      y: 100,
      opacity: 0,
      duration: 0.8,
      delay: 2.7,
      ease: "power3.out",
    });

  }, []);

  return (
    <div className="text-[#fcfbfe] py-10 px-4 flex flex-col gap-10 items-center justify-evenly">
      <h1 className="profile text-4xl text-[#fcfbfe] text-shadow-fuchsia-600 text-shadow-lg font-bold text-center mb-8">
        Your Profiles
      </h1>

      <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-20">
        {avatars.map((avatar, index) => (
          <div
            key={avatar.id}
            className="avatar-card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <AvatarCard
              id={avatar.id}
              name={avatar.name}
              img={avatar.img}
              onEdit={openEditModal}
            />
          </div>
        ))}
      </section>

      <button
        onClick={() => {
          setFormData({ name: "", image: "" });
          setCurrentEditId(null);
          setIsModalOpen(true);
        }}
        className="create-avatar-btn  bottom-6 font-bold right-6 z-40 rounded-full px-6 py-3 shadow-lg text-white bg-[#ff00d4] hover:bg-[#ff00fb] transition-colors"
      >
        + Create New Avatar
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1d1135] text-[#fcfbfe] p-6 rounded-lg w-full max-w-sm relative shadow-xl border border-[#5643fd]">
            <button
              className="absolute top-2 right-3 text-2xl text-[#fcfbfe] hover:text-[#ba1e68]"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4 text-[#fcfbfe]">
              {currentEditId !== null ? "Edit Avatar" : "Create Avatar"}
            </h2>

            <input
              type="text"
              className="bg-[#0c164f] border border-[#5643fd] text-[#fcfbfe] w-full p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-[#7649fe]"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter Name"
            />

            <label className="block mb-2 text-[#fcfbfe] font-semibold">
              Choose a preset:
            </label>
            <div className="flex gap-2 flex-wrap mb-4">
              {presetImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="preset"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, image: img }))
                  }
                  className={`w-12 h-12 rounded-full border-2 cursor-pointer transition ${
                    formData.image === img
                      ? "border-[#ba1e68] scale-110"
                      : "border-gray-300"
                  }`}
                />
              ))}
            </div>

            <label className="block mb-1 text-[#fcfbfe] font-semibold">
              Upload your own:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="text-sm text-[#fcfbfe] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#7649fe] file:text-white hover:file:bg-[#5643fd]"
            />

            <button
              className="mt-6 w-full bg-[#7649fe] hover:bg-[#ba1e68] text-white py-2 rounded transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
