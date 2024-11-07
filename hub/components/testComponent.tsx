'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function TestComponent() {
  const [getData, setGetData] = useState(null);

    async function getDataFunc() {
      const response = await fetch('https://dummyjson.com/posts',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setGetData(data);
    }

    async function postDataFunc() {
        const response = await fetch('https://dummyjson.com/posts/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'I am in love with someone.',
              userId: 5,
              /* other post data */
            })
          });
        const data = await response.json();
        console.log(data);
      }

  return (
    <div>
      <Button onClick={() => getDataFunc()}>get Button</Button>
      <Button onClick={() => postDataFunc()}>post Button</Button>
      <Button onClick={() => console.log(getData)}>Test Button</Button>
      <h1>Test Component</h1>
      {getData && <pre>{JSON.stringify(getData, null, 2)}</pre>}
    </div>
  );
}