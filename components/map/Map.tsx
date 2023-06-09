import React, { useState, useEffect, useCallback, useRef } from 'react';
import { coords } from '../../data/coords';

interface PropTypes {
  deeds: {
    id: number;
  }[];
}

const Map: React.FC<PropTypes> = ({
  deeds,
}) => {
  const [mappedDeeds, setMappedDeeds] = useState<any[]>();
  const [width, seWidth] = useState<number>();

  const containerRef = useRef<HTMLDivElement>(null);

  const handleResizeContainer = () => {
    if (containerRef?.current) {
      const rect = containerRef.current.getBoundingClientRect();
      seWidth(rect.width);
    }
  }

  const renderDeeds = useCallback(() => {
    if (!width) return null;

    return mappedDeeds?.map((deed, i) => {
      const top = width / 2 - (deed.y * 1);
      const left = width / 2 - (deed.x * 1);

      console.log('=======================')
      console.log(width)
      console.log(top)
      console.log(left)

      return (
        <div 
          className="absolute w-3 h-3 rounded-full bg-red-500"
          key={i}
          style={{
            top: `${top}px`,
            left: `${left}px`,
          }}
        >
        </div>
      )
    })
  }, [mappedDeeds, width]);

  useEffect(() => {
    handleResizeContainer();
    window.addEventListener('resize', handleResizeContainer);

    return () => {
      window.removeEventListener('resize', handleResizeContainer);
    }
  }, []);

  useEffect(() => {
    const _mappedDeeds = deeds.map((deed) => {
      const coordinates = coords[deed.id] ?? {};
      return {
        ...deed,
        ...coordinates,
      }
    });
    setMappedDeeds(_mappedDeeds);
  }, [deeds]);

  return (
    <div 
      className="relative"
      ref={containerRef}
    >
      <img 
        src="/map.webp"
        className="w-full h-auto"
      />
      {renderDeeds()}
    </div>
  );
}

export default Map;