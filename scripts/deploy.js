const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  
  const [deployer] = await ethers.getSigners()
  const NAME = "Forum"
  const SYMBOL = "FM"

  // Deploy
  const Forum = await ethers.getContractFactory("Forum")
  const forum = await Forum.deploy(NAME, SYMBOL)
  await forum.deployed()

  console.log(`Deployed Forum Contract at: ${forum.address}\n`)

  //  Channels
  const CHANNEL_NAMES = [
     "Tech Help",
     "Current Trends ",
      "Memes",
      "Crypto Talks",
      "AI and Machine Learning",
      "Blockchain development", 
      "Cybersecurity", 
      "Cloud Computing",
      "Crypto Scams",
      "Gamers Cafe",
      "Channel Price List",
    ]
  const COSTS = [
     tokens(0.1),
     tokens(0.01), 
     tokens(0.25),
     tokens(0.10),
     tokens(0.10),
     tokens(0.10),
     tokens(0.10),
     tokens(0.10),
     tokens(0.10)
     ,tokens(0.10)
     ,tokens(0.00001)]

  for (var i = 0; i < 11; i++) {
    const transaction = await forum.connect(deployer).createChannel(CHANNEL_NAMES[i], COSTS[i])
    await transaction.wait()

    console.log(`Created text channel #${CHANNEL_NAMES[i]}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});