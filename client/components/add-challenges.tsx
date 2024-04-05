import { useState } from 'react';
import { FC } from 'react';
import { Button } from '@/ui/button';
import { MdCancel , MdAddCircleOutline  } from 'react-icons/md';
import { Input } from '@/ui/input';
import { Textarea } from '@/ui/textarea';
import Card from '@/ui/card-challenge';

interface Challenge {
  id: number;
  name: string;
  description: string;
}

export const AddChallenges: FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
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
    <div >
      <h2 className="text-[24px] font-semibold">List of challenges</h2>
      <div className="flex flex-row">
      <div className="basis-1/2"> 
      {challenges.map((challenge) => (
        <div  className=" my-10 ">
        <div key={challenge.id} className="flex flex-row my-4 "> 
          <MdCancel
            className="text-red-500 hover:text-red-700 cursor-pointer"
            size={24}
            onClick={() => handleCancel(challenge.id)}
          />
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
              size="small"
              value={challenge.description}
              onChange={(e) => handleDescriptionChange(challenge.id, e.target.value)}
            />
        </div>
          </div>
      ))}</div>
    <div className="basis-1/2 mx-5">
        
      {challenges.map((challenge) => (
        <Card key={challenge.id} title={challenge.name} description={challenge.description} />
      ))}
        </div>
</div>
     
    <div className='flex justify-center my-10' >
   
{/*       <Button title="add new challenge"  onClick={addChallenge} /> */}
      <MdAddCircleOutline 
            className="text-gray-400 hover:text-primary-yellow cursor-pointer"
            size={32}onClick={addChallenge}
          />
 

    </div>
    </div>
  );
};
