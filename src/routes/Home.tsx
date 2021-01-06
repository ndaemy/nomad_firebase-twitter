import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import { dbService } from 'fbConfig';

interface HomeProps {
  userObj: firebase.User | null;
}

function Home({ userObj }: HomeProps) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<firebase.firestore.DocumentData[]>([]);

  useEffect(() => {
    dbService.collection('tweets').onSnapshot(ss => {
      const tweetArray = ss.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTweets(tweetArray);
    });
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dbService.collection('tweets').add({
      text: tweet,
      createdAt: Date.now(),
      creatorId: userObj?.uid,
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
            <h4>{t.text}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
