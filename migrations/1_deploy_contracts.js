require('dotenv').config();

const Store = artifacts.require('Store');
const StoreFactory = artifacts.require('StoreFactory');

module.exports = async (deployer, network, accounts) => {
  const owner = accounts[0];
  if (network == "development") {
    let storeInstance = await deployer.deploy(Store, { from: owner });
    storeInstance = await Store.deployed();
    console.log('store instance deployed', storeInstance.address);
    let storeFactoryInstance = await deployer.deploy(StoreFactory, storeInstance.address, { from: owner });
    storeFactoryInstance = await StoreFactory.deployed();
    console.log('store factory deployed', storeFactoryInstance.address);
    await storeFactoryInstance.cloneStore();
    let storeatInstance = await Store.at(await storeFactoryInstance.getAddress(0))
    console.log(await storeatInstance.value());
  }

}