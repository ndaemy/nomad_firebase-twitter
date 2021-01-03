import { authService } from 'fbConfig';

function Profile() {
  async function handleLogOut() {
    authService.signOut();
  }

  return (
    <>
      <button type='button' onClick={handleLogOut}>
        Log Out
      </button>
    </>
  );
}

export default Profile;
