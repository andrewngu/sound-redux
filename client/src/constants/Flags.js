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
const fakeUserID =  "" + Math.random();
Rox.setCustomStringProperty('rox.distinct_id', fakeUserID);
analytics.identify(fakeUserID, {});
// setup the SDK with the production environment key of app soundredux - see https://app.rollout.io/app/5b5ea80aec73e3454653ecc4
Rox.setup('5bb493fcbae7137e6c9dea86', {
  impressionHandler: (reporting, experiment) => {
    if (experiment && experiment.labels.includes('segment')){
	let props = {};
        props[`rollout_${reporting.name}`] = reporting.value;
        props[`rollout_${reporting.name}_labels`] = experiment.labels.join(',');
        analytics.identify(fakeUserID, props);
    }
  }
});

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
