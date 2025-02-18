import { useEffect, useState } from 'react';
import { ATTRIBUTE_LIST, SKILL_LIST } from '../../../consts';
import { getCharacter, saveCharacter } from '../../../services/character.service';
import { CharacterItem } from '../item/CharacterItem';

// If you don't have a separate types file, you can also define the type here:
export interface Character {
  name: string;
  attributes: Record<string, number>;
  skills: Record<string, number>;
}

export const CharacterList = () => {
  // Initialize attributes from ATTRIBUTE_LIST (defaulting to 0)
  const initialAttributes = ATTRIBUTE_LIST.reduce(
    (acc, attr) => ({ ...acc, [attr]: 0 }),
    {} as Record<string, number>
  );

  // Initialize skills from SKILL_LIST (defaulting to 0 points per skill)
  const initialSkills = SKILL_LIST.reduce(
    (acc, skill) => ({ ...acc, [skill.name]: 0 }),
    {} as Record<string, number>
  );

  // Start with one character by default.
  const [characters, setCharacters] = useState<Character[]>([
    {
      name: 'Character 1',
      attributes: { ...initialAttributes },
      skills: { ...initialSkills },
    },
  ]);

  // Update attribute for a given character by index.
  const updateCharacterAttribute = (characterIndex: number, name: string, delta: number) => {
    setCharacters((prev) => {
      const updated = [...prev];
      const character = updated[characterIndex];
      const currentAttributeValue = character.attributes[name];

      // Calculate the current total across all attributes.
      const currentTotal = Object.values(character.attributes).reduce((sum, val) => sum + val, 0);

      // Calculate the new value and new total if we apply the delta.
      const newValue = currentAttributeValue + delta;
      const newTotal = currentTotal + delta;

      // When increasing, check the maximum total limit.
      if (delta > 0) {
        if (currentTotal === 70 || newTotal > 70) {
          alert(
            'Maximum total attribute points of 70 reached. You must reduce an attribute before increasing another.'
          );
          return prev;
        }
        if (newValue > 70) {
          alert('Individual attribute cannot exceed 70.');
          return prev;
        }
      }

      if (delta < 0 && newValue < 0) {
        return prev;
      }

      updated[characterIndex] = {
        ...character,
        attributes: {
          ...character.attributes,
          [name]: newValue,
        },
      };
      return updated;
    });
  };

  // Update skill points for a given character by index.
  const updateCharacterSkill = (characterIndex: number, skillName: string, delta: number) => {
    setCharacters((prev) => {
      const updated = [...prev];
      const character = updated[characterIndex];
      const newValue = character.skills[skillName] + delta;
      if (newValue < 0) return prev;
      updated[characterIndex] = {
        ...character,
        skills: {
          ...character.skills,
          [skillName]: newValue,
        },
      };
      return updated;
    });
  };

  // Add a new character with default attributes and skills.
  const addCharacter = () => {
    const newCharacter: Character = {
      name: `Character ${characters.length + 1}`,
      attributes: { ...initialAttributes },
      skills: { ...initialSkills },
    };
    setCharacters((prev) => [...prev, newCharacter]);
  };

  // Save all characters to API.
  const handleSaveCharacters = async () => {
    try {
      await saveCharacter(characters);
      alert('Characters saved successfully!');
    } catch (error) {
      console.error('Error saving characters:', error);
      alert('Error saving characters');
    }
  };

  // Load characters from API when the component mounts.
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await getCharacter();
        if (data && Array.isArray(data.body)) {
          setCharacters(data.body);
        }
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
    fetchCharacters();
  }, []);

  return (
    <div>
      {/* Top controls */}
      <div className="flex justify-between mb-4">
        <button
          onClick={addCharacter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Character
        </button>
        <button
          onClick={handleSaveCharacters}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save Characters
        </button>
      </div>

      {/* Render each character */}
      {characters.map((character, index) => (
        <CharacterItem
          key={index}
          character={character}
          index={index}
          updateAttribute={updateCharacterAttribute}
          updateSkill={updateCharacterSkill}
        />
      ))}
    </div>
  );
};
