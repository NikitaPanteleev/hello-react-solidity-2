import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    '0xC1Ae2Df108Bb6B4C834Cf7718Fd5798452944Fa6'
);

export default instance;