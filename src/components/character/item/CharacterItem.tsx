import { FC } from 'react';
import { Character } from '../../../types';
import { AttributeList } from '../../attributes/list/AttributeList';
import { ClassList } from '../../class/list/ClassList';
import { SkillCheck } from '../../skills/check/SkillCheck';
import { SkillList } from '../../skills/list/SkillList';

interface CharacterProps {
  character: Character;
  index: number;
  updateAttribute: (characterIndex: number, attributeName: string, delta: number) => void;
  updateSkill: (characterIndex: number, skillName: string, delta: number) => void;
}

export const CharacterItem: FC<CharacterProps> = ({
                                                character,
                                                index,
                                                updateAttribute,
                                                updateSkill,
                                              }) => {
  return (
    <div className="mb-8 border p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">{ character.name }</h2>
      {/* Skill Check Section */ }
      <SkillCheck skills={ character.skills } attributes={ character.attributes }/>
      <div className="flex flex-row justify-between mt-4">
        {/* Left Column: Attributes */ }
        <AttributeList
          attributes={ character.attributes }
          updateAttribute={ (attrName, delta) =>
            updateAttribute(index, attrName, delta)
          }
        />
        {/* Middle Column: Classes */ }
        <ClassList attributes={ character.attributes }/>
        {/* Right Column: Skills */ }
        <SkillList
          skills={ character.skills }
          attributes={ character.attributes }
          updateSkill={ (skillName, delta) =>
            updateSkill(index, skillName, delta)
          }
        />
      </div>
    </div>
  );
};
