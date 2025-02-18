import { FC } from 'react';
import { ATTRIBUTE_LIST } from '../../../consts';
import { AttributeItem } from '../item/AttributeItem';

interface AttributeListProps {
  attributes: Record<string, number>;
  updateAttribute: (name: string, delta: number) => void;
}

export const AttributeList: FC<AttributeListProps> = ({ attributes, updateAttribute }) => {
  return (
    <div className="w-1/3 p-4 mx-8 bg-gray-600 border-gray-300 rounded-2xl my-6 text-left">
      <div className="text-xl font-bold mb-4">Attributes</div>
      {ATTRIBUTE_LIST.map(attr => (
        <AttributeItem
          key={attr}
          name={attr}
          value={attributes[attr]}
          onIncrement={() => updateAttribute(attr, 1)}
          onDecrement={() => updateAttribute(attr, -1)}
        />
      ))}
    </div>
  );
};
