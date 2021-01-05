import { useState } from 'react';

import { dbService } from 'fbConfig';

function Home() {
  const [tweet, setTweet] = useState('');
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dbService.collection('tweet').add({
      tweet,
      createdAt: Date.now(),
    });
    setTweet('');
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    setTweet(value);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="What's on your mind?"
          maxLength={120}
          value={tweet}
          onChange={handleChange}
        />
        <input type='submit' value='Nweet' />
      </form>
    </div>
  );
}

export default Home;
