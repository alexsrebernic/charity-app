const MORALIS_APP_ID = import.meta.env.VITE_APP_MORALIS_APP_ID;
const MORALIS_KEY = import.meta.env.VITE_APP_MORALIS_KEY;
const MOLARIS_SERVER_URL = import.meta.env.VITE_APP_MOLARIS_SERVER_URL;

const MoralisFactory = (function() {
    function MoralisInstance(appId, serverUrl) {
        Moralis.start({
            serverUrl,
            appId,
        }
        );

        return Moralis;
    }

    let instance = null;

    return {
        getInstance: function() {
            if (instance == null) {
                instance = MoralisInstance(MORALIS_APP_ID,  MOLARIS_SERVER_URL);
                instance.constructor = null;
            }
            return instance;
        },
    };
})();

export default MoralisFactory;