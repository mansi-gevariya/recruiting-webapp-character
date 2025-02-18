import { FC } from 'react';
import { SKILL_LIST } from '../../../consts';
import { SkillItem } from '../item/SkillItem';

interface SkillListProps {
  skills: Record<string, number>;
  attributes: Record<string, number>;
  updateSkill: (skillName: string, delta: number) => void;
}

export const SkillList: FC<SkillListProps> = ({ skills, attributes, updateSkill }) => {
  // Calculate the Intelligence modifier using the standard formula.
  const intelligenceValue = attributes['Intelligence'] || 10;
  const intModifier = Math.floor((intelligenceValue - 10) / 2);

  // Total skill points available.
  const totalSkillPoints = 10 + (4 * intModifier);

  // Total points allocated across all skills.
  const allocatedSkillPoints = Object.values(skills).reduce((sum, val) => sum + val, 0);

  // Remaining points available to allocate.
  const remainingSkillPoints = totalSkillPoints - allocatedSkillPoints;

  return (
    <div className="w-1/3 p-4 mx-8 bg-gray-600 border-gray-300 rounded-2xl my-6 text-left">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="mb-4">
        <p>Total Skill Points: {totalSkillPoints}</p>
        <p>Allocated: {allocatedSkillPoints}</p>
        <p>Remaining: {remainingSkillPoints}</p>
      </div>
      <div className="space-y-2">
        {SKILL_LIST.map((skill) => {
          const skillName = skill.name;
          const relatedAttribute = skill.attributeModifier; // e.g., "Dexterity"
          const attributeValue = attributes[relatedAttribute] || 10;
          const attributeModifier = Math.floor((attributeValue - 10) / 2);
          const pointsSpent = skills[skillName] || 0;
          const totalSkillValue = pointsSpent + attributeModifier;
          return (
            <SkillItem
              key={skillName}
              skillName={skillName}
              relatedAttribute={relatedAttribute}
              attributeModifier={attributeModifier}
              pointsSpent={pointsSpent}
              totalSkillValue={totalSkillValue}
              updateSkill={updateSkill}
              remainingSkillPoints={remainingSkillPoints}
            />
          );
        })}
      </div>
    </div>
  );
};
