const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Token implementation", function(){
  let VotingToken
  let Token
  let owner
  let addr1
  let addr2
  let addrs

  beforeEach(async () => {
    Token = await ethers.getContractFactory("VotingToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    VotingToken = await Token.deploy()
  })

  describe("Deployment", async() => {
    it("Should set the right owner", async () => {
      expect(await VotingToken.owner()).to.equal(owner.address)
    })

    it("Should set the total balance to the owner", async () => {
      expect(await VotingToken.balanceOf(owner.address)).to.equal(await VotingToken.totalSupply())
    })
  })

  describe("Delgation of Voting powers", async () => {
    it("Should delgate the correct delegatee", async () => {
      await VotingToken.delegate(addr1.address)
      expect(await VotingToken.delegates(owner.address)).to.equal(addr1.address)

      await VotingToken.connect(addr1).delegate(addr2.address)
      expect(await VotingToken.delegates(addr1.address)).to.equal(addr2.address)
    })
  })
})
