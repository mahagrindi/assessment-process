import { useState } from 'react';
import { FC } from 'react';
import { MdCancel, MdAddCircleOutline } from 'react-icons/md';
import { Input } from '@/ui/input';
import Card from '@/ui/card-challenge'; 
import { Textarea } from '@/ui/textarea';


interface Props {
  challenges: Challenge[];
  setChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
} 

export const AddChallenges : React.FC<Props> = ({ challenges, setChallenges }) => {
 
  const [nextId, setNextId] = useState<number>(1);

  const addChallenge = () => {
    const newChallenge: Challenge = { id: nextId, name: '', description: '' };
    setChallenges([...challenges, newChallenge]);
    setNextId(nextId + 1);
  };

  const handleNameChange = (id: number, value: string) => {
    const updatedChallenges = challenges.map(challenge =>
      challenge.id === id ? { ...challenge, name: value } : challenge
    );
    setChallenges(updatedChallenges);
  };

  const handleDescriptionChange = (id: number, value: string) => {
    const updatedChallenges = challenges.map(challenge =>
      challenge.id === id ? { ...challenge, description: value } : challenge
    );
    setChallenges(updatedChallenges);
  };

  const handleCancel = (id: number) => {
    const updatedChallenges = challenges.filter(challenge => challenge.id !== id);
    setChallenges(updatedChallenges);
  };

  return (
    <div>
      <h2 className="text-[24px] font-semibold">List of challenges</h2>
      <div className="flex flex-row">
        <div className="basis-1/2">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="my-10">
              <div className="flex flex-row my-4">

              <div className='relative'>
    <div 
      className='before:absolute before:content-[attr(data-tip)]
       before:px-3 before:py-2 before:left-1/2 before:-top-3 
       before:w-max before:max-w-xs before:-translate-x-1/2 
       before:-translate-y-full before:bg-primary-black 
       before:text-primary-white 
       before:text-sm 
       before:rounded-md before:opacity-0 
       before:transition-all 
       after:absolute after:left-1/2 
       after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 
       after:border-8 
       after:border-t-primary-black after:border-l-transparent 
       after:border-b-transparent after:border-r-transparent 
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100' 
      data-tip="Remove Challenge"
    >
   <MdCancel
                  className="text-red-500 hover:text-red-700 cursor-pointer
                  
                  "
                  size={24}
                  onClick={() => handleCancel(challenge.id)}
                />
    </div>
  </div>
              
                <p className="mx-2 text-lg font-medium">Challenge {challenge.id}</p>
              </div>
              <div className="w-full grid gap-4 mx-4">
                <Input
                  type="text"
                  placeholder="Enter the challenge name"
                  label="Challenge's Name"
                  value={challenge.name}
                  onChange={(e) => handleNameChange(challenge.id, e.target.value)}
                />
                <Textarea
                  label="Challenge's description"
                //  size="small"
                 
                />
              </div>
            </div>
          ))}
        </div>
        <div className="basis-1/2 mx-5">
          {challenges.map((challenge) => (
            <Card key={challenge.id} title={challenge.name} description={challenge.description} />
          ))}
        </div>
      </div>
      <div className='flex justify-center my-10 '>
      <div className='flex justify-center my-10'>
  <div className='relative'>
    <div 
      className='before:absolute before:content-[attr(data-tip)]
       before:px-3 before:py-2 before:left-1/2 before:-top-3 
       before:w-max before:max-w-xs before:-translate-x-1/2 
       before:-translate-y-full before:bg-primary-black 
       before:text-primary-white 
       before:text-sm 

       before:rounded-md before:opacity-0 
       before:transition-all after:absolute after:left-1/2 
       after:-top-3 after:h-0 after:w-0 after:-translate-x-1/2 
       after:border-8 
       after:border-t-primary-black after:border-l-transparent 
       after:border-b-transparent after:border-r-transparent 
       after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100' 
      data-tip="Add New challenge"
    >
      <MdAddCircleOutline
        size={32}
        onClick={addChallenge}
        className="text-gray-400 hover:text-primary-yellow cursor-pointer"
      />
    </div>
  </div>
</div>
  </div>
    </div>
  );
};
