import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Chip from './Chip';

interface ChipData {
    id: string | number;
    label: string;
}

interface ChipListProps {
    chips: ChipData[];
}

const ChipList: React.FC<ChipListProps> = ({ chips }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const hiddenMeasureRef = useRef<HTMLDivElement>(null);
    const [visibleChips, setVisibleChips] = useState<ChipData[]>([]);
    const [hiddenChips, setHiddenChips] = useState<ChipData[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedChipIds, setSelectedChipIds] = useState<(string | number)[]>([]);

    const handleChipClick = (chipId: string | number) => {
        setSelectedChipIds((prev) =>
            prev.includes(chipId)
                ? prev.filter((id) => id !== chipId)
                : [...prev, chipId]
        );
    };

    const calculateVisibleChips = () => {
        if (!containerRef.current || !hiddenMeasureRef.current) return;

        const containerWidth = containerRef.current.offsetWidth - 120;
        const children = Array.from(hiddenMeasureRef.current.children) as HTMLElement[];

        let total = 0;
        const visible: ChipData[] = [];

        for (let i = 0; i < children.length; i++) {
            const width = children[i].offsetWidth;
            if (total + width  <= containerWidth) {
                visible.push(chips[i]);
                total += width;
            } else {
                break;
            }
        }

        setVisibleChips(visible);
        setHiddenChips(chips.slice(visible.length));
    };

    useLayoutEffect(() => {
        calculateVisibleChips();
    }, [chips]);

    useEffect(() => {
        window.addEventListener('resize', calculateVisibleChips);
        return () => {
            window.removeEventListener('resize', calculateVisibleChips);
        };
    }, [chips]);

    return (
        <div className="chip-list-wrapper">
            <div className="chip-list-container" ref={containerRef}>
                {visibleChips.map((chip) => (
                    <Chip
                        key={chip.id}
                        label={chip.label}
                        selected={selectedChipIds.includes(chip.id)}
                        onClickChip={() => handleChipClick(chip.id)}
                    />
                ))}
                {hiddenChips.length > 0 && (
                    <button className="more-button" onClick={() => setShowPopup((prev) => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor"
                             className="bi bi-three-dots" viewBox="0 0 14 14">
                            <path
                                d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                    </button>
                )}
            </div>

            <div
                ref={hiddenMeasureRef}
                style={{ visibility: 'hidden', position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
            >
                {chips.map((chip) => (
                    <Chip key={chip.id} label={chip.label} />
                ))}
            </div>

            {showPopup && (
                <div className="popup-container">
                    {hiddenChips.map((chip) => (
                        <Chip
                            key={chip.id}
                            label={chip.label}
                            selected={selectedChipIds.includes(chip.id)}
                            onClickChip={() => handleChipClick(chip.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ChipList;