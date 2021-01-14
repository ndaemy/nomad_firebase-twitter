import firebase from 'firebase/app';
import { useEffect } from 'react';

import { authService, dbService } from 'fbConfig';

interface ProfileProps {
  userObj: firebase.User | null;
}

function Profile({ userObj }: ProfileProps) {
  async function handleLogOut() {
    authService.signOut();
  }

  async function getMyTweets() {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', userObj!.uid)
      .orderBy('createdAt')
      .get();
    console.log(tweets.docs.map(doc => doc.data()));
  }

  useEffect(() => {
    getMyTweets();
  }, []);

  return (
    <>
      <button type='button' onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}

export default Profile;
