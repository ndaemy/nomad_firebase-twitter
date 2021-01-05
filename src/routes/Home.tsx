import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import { dbService } from 'fbConfig';

function Home() {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<firebase.firestore.DocumentData[]>([]);

  async function getTweets() {
    const db = await dbService.collection('tweet').get();
    db.forEach(document => {
      const tweetObject = {
        id: document.id,
        ...document.data(),
      };
      setTweets(prev => [...prev, tweetObject]);
    });
  }

  useEffect(() => {
    getTweets();
  }, []);

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
      <div>
        {tweets.map(t => (
          <div key={t.id}>
            <h4>{t.tweet}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
