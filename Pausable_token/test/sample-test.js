const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Snapshot Token contract Deployment", function () {
  let Token;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let PausableToken;

  beforeEach(async function() {
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners() 
    PausableToken = await Token.deploy()
  })

  describe("Deployment", async function() {
    it("Should set the right", async() => {
      expect(await PausableToken.owner()).to.equal(owner.address);
    })

    it("Should give the address of the owner", async() => {
      expect(await PausableToken.owner()).to.equal(owner.address)
    })

    it("Should give the correct total supply", async function(){
        expect(await PausableToken.totalSupply()).to.equal(10000000000000000000000n)
    })
  })

  describe("Transaction", async() => {
    it("Should be able to transfer tokens between accounts", async function(){
      await PausableToken.transfer(addr1.address, 100)
      expect(await PausableToken.balanceOf(addr1.address)).to.equal(100)

      await PausableToken.connect(addr1).transfer(addr2.address, 50)
      expect(await PausableToken.balanceOf(addr2.address)).to.equal(50)
      expect(await PausableToken.balanceOf(addr1.address)).to.equal(50)
    })

    it("Should fail if sender does not have enough tokens", async function(){
      await expect(PausableToken.connect(addr1).transfer(addr2.address, 70)).to.be.revertedWith("ERC20: transfer amount exceeds balance")
    })
  })

  describe("Pausable Functions", async () => {
    it("Should fail transaction if contract is paused", async () => {
      await PausableToken.pause()
      await expect(PausableToken.transfer(addr2.address, 70)).to.be.revertedWith("Pausable: paused")
    })

    it("It should fail the unpause function when contract is not paused", async function(){
        await expect(PausableToken.unpause()).to.be.revertedWith('Pausable: not paused')
    })
  })
});
