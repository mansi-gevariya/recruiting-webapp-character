import { FC } from 'react';

interface SkillItemProps {
  skillName: string;
  relatedAttribute: string;
  attributeModifier: number;
  pointsSpent: number;
  totalSkillValue: number;
  updateSkill: (skillName: string, delta: number) => void;
  remainingSkillPoints: number;
}

export const SkillItem: FC<SkillItemProps> = ({
  skillName,
  relatedAttribute,
  attributeModifier,
  pointsSpent,
  totalSkillValue,
  updateSkill,
  remainingSkillPoints,
}) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-300">
      <div className="w-2/3">
        <div className="font-medium">{ skillName }</div>
        <div className="text-xs text-white">
          { relatedAttribute } Modifier:{ ' ' }
          { attributeModifier >= 0 ? `+${ attributeModifier }` : attributeModifier }
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={ () => updateSkill(skillName, -1) }
          disabled={ pointsSpent <= 0 }
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          -
        </button>
        <span className="mx-4 text-lg font-medium">{ pointsSpent }</span>
        <button
          onClick={ () => {
            if (remainingSkillPoints > 0) {
              updateSkill(skillName, 1);
            }
          } }
          disabled={ remainingSkillPoints <= 0 }
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          +
        </button>
      </div>
      <div className="w-1/4 text-right">
        <span className="text-sm">Total: { totalSkillValue }</span>
      </div>
    </div>
  );
};
