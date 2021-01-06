import firebase from 'firebase/app';

interface TweetProps {
  tweetObj: firebase.firestore.DocumentData;
  isOwner: boolean;
}

function Tweet({ tweetObj, isOwner }: TweetProps) {
  return (
    <div>
      <h4>{tweetObj.text}</h4>
      {isOwner && (
        <>
          <button type='button'>Delete Tweet</button>
          <button type='button'>Edit Tweet</button>
        </>
      )}
    </div>
  );
}

export default Tweet;
