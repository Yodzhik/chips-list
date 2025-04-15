import React from 'react';

interface ChipProps {
  label: string;
  onClickChip?: () => void;
  selected?: boolean;
}

const Chip: React.FC<ChipProps> = ({ label, onClickChip, selected = false }) => {
  return (
      <button
          className={`chips-item ${ selected ? 'chips-item-selected' : '' }`}
          onClick={onClickChip}
      >
        {label}
      </button>
  );
};

export default Chip;