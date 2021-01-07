import firebase from 'firebase/app';
import { useEffect, useState } from 'react';

import Tweet from 'components/Tweet';
import { dbService } from 'fbConfig';

interface HomeProps {
  userObj: firebase.User | null;
}

function Home({ userObj }: HomeProps) {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState<firebase.firestore.DocumentData[]>([]);
  const [attachment, setAttachment] = useState();

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

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = e;
    const file = files![0];
    const reader = new FileReader();

    reader.onloadend = finishedEvent => {
      const {
        // @ts-expect-error
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(file);
  }

  function handleClearAttachment() {
    setAttachment(undefined);
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
        <input type='file' accept='image/*' onChange={handleFileChange} />
        <input type='submit' value='Nweet' />
        {attachment && (
          <div>
            <img alt='preview' src={attachment} width='50px' height='50px' />
            <button type='button' onClick={handleClearAttachment}>
              Clear
            </button>
          </div>
        )}
      </form>
      <div>
        {tweets.map(t => (
          <Tweet
            key={t.id}
            tweetObj={t}
            isOwner={t.creatorId === userObj?.uid}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
