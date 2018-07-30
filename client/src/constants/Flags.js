// import rox-browser from npm
import Rox from 'rox-browser' 
import UserRepo from  '../store/UserRepo'

// define an exported object that contains the flags
const Flags = {
  followingView: new Rox.Flag(),
  history: new Rox.Flag(),
  shuffle: new Rox.Flag(),
  repeat: new Rox.Flag(),
  startFollowingWord: new Rox.Variant('Follow', ['Follow', 'Start Following', 'Watch Him'])
};

//  Register the flags object under the namespace "default"
Rox.register('default', Flags);
// setup the SDK with the production environment key of app soundredux - see https://app.rollout.io/app/5b5ea80aec73e3454653ecc4
Rox.setup('5b5ea80aec73e3454653ecc7');

// For demo purposes we will etch the configuration from the server every 4 seoconds 
setInterval( function(){
  Rox.fetch();
}, 4000);

// Dummy user state
Rox.setCustomStringProperty('plan', () => UserRepo.getUser().plan);
Rox.setCustomStringProperty('email', () => UserRepo.getUser().email);
Rox.setCustomNumberProperty('playlist_count', () => UserRepo.getUser().playlistCount);
Rox.setCustomStringProperty('soundcloud_id', () => UserRepo.getUser().id);

export default Flags;
