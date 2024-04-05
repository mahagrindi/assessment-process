import React from 'react'; // Import React if not already imported

interface CardProps {
  title: string;
  description: string;
  imageUrl?: string; // Optional imageUrl
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="m-10 my-5 rounded-md shadow-md p-5 border border-gray-200 rounded dark">
      {imageUrl && <img src={imageUrl} alt={title} className="w-full h-32 object-cover mb-4 rounded-lg" />}
      <h2 className="mx-2 text[20] font-medium">{title}</h2>
      <p className="mx-3 text[16] ">{description}</p>
    </div>
  );
};

export default Card;
