import { FC, useState } from 'react';
import { SKILL_LIST } from '../../../consts';

interface SkillCheckProps {
  skills: Record<string, number>;
  attributes: Record<string, number>;
}

export const SkillCheck: FC<SkillCheckProps> = ({ skills, attributes }) => {
  // Local state for selected skill, DC, roll result, and outcome message.
  const [selectedSkill, setSelectedSkill] = useState<string>(SKILL_LIST[0].name);
  const [dc, setDC] = useState<number>(10);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [outcome, setOutcome] = useState<string>('');

  const handleRoll = () => {
    // Generate a random number between 1 and 20 (inclusive).
    const randomRoll = Math.floor(Math.random() * 20) + 1;
    setRollResult(randomRoll);

    // Find the chosen skill in SKILL_LIST.
    const skillObj = SKILL_LIST.find(skill => skill.name === selectedSkill);
    if (!skillObj) return;

    // Calculate the ability modifier for the skill's associated attribute.
    const attributeName = skillObj.attributeModifier;
    const attributeValue = attributes[attributeName] || 10;
    const modifier = Math.floor((attributeValue - 10) / 2);

    // The total skill is the allocated skill points plus the ability modifier.
    const skillPoints = skills[selectedSkill] || 0;
    const totalSkill = skillPoints + modifier;

    // Calculate the sum of the random roll and the total skill.
    const total = randomRoll + totalSkill;

    // Determine success or failure.
    if (total >= dc) {
      setOutcome(`Success! (Roll: ${randomRoll}, Total Skill: ${totalSkill}, Sum: ${total})`);
    } else {
      setOutcome(`Failure. (Roll: ${randomRoll}, Total Skill: ${totalSkill}, Sum: ${total})`);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-600 border-gray-300 rounded-2xl my-6">
      <h3 className="text-xl font-bold mb-2">Skill Check</h3>
      <div className="flex flex-col space-y-2">
        <div>
          <label className="mr-2 font-medium">Skill:</label>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="p-1 border rounded text-black w-64"
          >
            {SKILL_LIST.map(skill => (
              <option key={skill.name} value={skill.name}>
                {skill.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2 font-medium">DC:</label>
          <input
            type="number"
            value={dc}
            onChange={(e) => setDC(Number(e.target.value))}
            className="p-1 border rounded text-black w-64"
          />
        </div>
        <div>
          <button
            onClick={handleRoll}
            className="w-32 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            Roll
          </button>
        </div>
        {rollResult !== null && (
          <div className="mt-2">
            <p>Random Roll: {rollResult}</p>
            <p>{outcome}</p>
          </div>
        )}
      </div>
    </div>
  );
};
