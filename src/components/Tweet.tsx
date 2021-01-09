import firebase from 'firebase/app';
import { useState } from 'react';

import { dbService, storageService } from 'fbConfig';

interface TweetProps {
  tweetObj: firebase.firestore.DocumentData;
  isOwner: boolean;
}

function Tweet({ tweetObj, isOwner }: TweetProps) {
  const [editing, setEditing] = useState(false);
  const [newTweet, setNewTweet] = useState(tweetObj.text);

  async function handleDelete() {
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (ok) {
      await dbService.doc(`tweets/${tweetObj.id}`).delete();
      await storageService.refFromURL(tweetObj.attachmentUrl).delete();
    }
  }

  function toggleEditing() {
    setEditing(prev => !prev);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = e;
    setNewTweet(value);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isOwner) {
      dbService.doc(`tweets/${tweetObj.id}`).update({
        text: newTweet,
      });
      setEditing(false);
      setNewTweet('');
    } else {
      console.error('You are not the owner!');
    }
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Edit your tweet'
              maxLength={120}
              value={newTweet}
              onChange={handleChange}
              required
            />
            <input type='submit' value='Update Tweet' />
          </form>
          <button type='button' onClick={toggleEditing}>
            Cancle
          </button>
        </>
      ) : (
        <>
          <h4>{tweetObj.text}</h4>
          {tweetObj.attachmentUrl && (
            <img
              src={tweetObj.attachmentUrl}
              alt='profile'
              width='50px'
              height='50px'
            />
          )}
          {isOwner && (
            <>
              <button type='button' onClick={handleDelete}>
                Delete Tweet
              </button>
              <button type='button' onClick={toggleEditing}>
                Edit Tweet
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Tweet;
