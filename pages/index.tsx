import React from 'react';
import { Map } from '@/components/map';

export default function Home() {
  return (
    <div className="mt-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-20">
          <div>
            <Map 
              deeds={[
                { id: 2 },
                { id: 70735 }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
