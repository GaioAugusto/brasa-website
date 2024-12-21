import React from "react";
import { TeamDialogViewProps } from "./types";
import { FaEnvelope, FaInstagram, FaPhone, FaYoutube } from "react-icons/fa";

type ComponentType = React.FC<TeamDialogViewProps>;

export const TeamDialogView: ComponentType = ({ team, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          ✕
        </button>

        {/* Team Image */}
        <img
          src={team.imageDialog}
          alt={team.title}
          className="object-cover rounded-md mb-6 mt-6 w-full h-60"
        />

        {/* Title and Social Links */}
        <div className="flex flex-row items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-green-900">{team.title}</h2>
          {team.instagramUrl && team.youtubeUrl && (
            <div className="flex space-x-4">
              <a
                href={team.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-700"
              >
                <FaInstagram className="h-7 w-7" />
              </a>
              <a
                href={team.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 hover:text-red-800"
              >
                <FaYoutube className="h-7 w-7" />
              </a>
            </div>
          )}
        </div>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {team.descriptionDialog}
        </p>

        <div className="flex items-center space-x-6 p-4 border border-green-800 rounded-lg bg-gray-50">
          <img
            src={team.captain?.image}
            alt="team captain"
            className="h-24 w-24 rounded-full border border-gray-300 object-cover"
          />
          <div className="text-left">
            <p className="font-bold text-lg text-green-900">
              {team.captain?.name}
            </p>
            <div className="flex flex-row space-x-2 items-center">
              <FaEnvelope className="h-4 w-4 text-gray-600" />
              <p className="text-sm text-gray-600">{team.captain?.email}</p>
            </div>
            <div className="flex flex-row space-x-2 items-center">
              <FaPhone className="h-4 w-4 text-gray-600" />
              <p className="text-sm text-gray-600">{team.captain?.phone}</p>
            </div>
            <a
              href={team.captain?.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-700 flex items-center space-x-2 mt-2"
            >
              <div className="flex flex-row space-x-2 items-center">
                <FaInstagram className="h-5 w-5" />
                <p className="text-sm text-gray-600">
                  {team.captain?.instagramUser}
                </p>
              </div>
            </a>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};
