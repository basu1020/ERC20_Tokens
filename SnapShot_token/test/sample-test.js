const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Snapshot Token contract Deployment", function () {
  let Token;
  let owner;
  let addr1;
  let addr2;
  let addrs;
  let SnapShotToken;

  beforeEach(async function() {
    Token = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners() 
    SnapShotToken = await Token.deploy()
  })

  describe("Deployment", async function() {
    it("Should set the right owner", async() => {
      expect(await SnapShotToken.owner()).to.equal(owner.address);
    })

    it("Should set the Total Supply of tokens to the owner", async() => {
      expect(await SnapShotToken.balanceOf(owner.address)).to.equal(10000000000000000000000n)
    })
  })

  describe("Transaction", async() => {
    it("Should be able to transfer tokens between accounts", async function(){
      await SnapShotToken.transfer(addr1.address, 100)
      expect(await SnapShotToken.balanceOf(addr1.address)).to.equal(100)
      await SnapShotToken.connect(addr1).transfer(addr2.address, 50)
      expect(await SnapShotToken.balanceOf(addr2.address)).to.equal(50)
      expect(await SnapShotToken.balanceOf(addr1.address)).to.equal(50)
    })

    it("Should fail if sender does not have enough tokens", async function(){
      await expect(SnapShotToken.connect(addr1).transfer(addr2.address, 70)).to.be.revertedWith("ERC20: transfer amount exceeds balance")
    })
  })

  describe("Snapshot Functions", async () => {
    it("Should show the balance of an address at a particular snapshot", async () => {
      await SnapShotToken.transfer(addr1.address, 50)
      await SnapShotToken.snapshot()
      expect(await SnapShotToken.balanceOfAt(addr1.address, 1)).to.equal(50)
    })

    it("Should check the total supply of tokens at a particular snapshot", async() => {
      await SnapShotToken.snapshot()
      await SnapShotToken.mint(addr1.address, 100000000000000000000n)
      await SnapShotToken.snapshot()
      expect(await SnapShotToken.totalSupplyAt(2)).to.equal(10100000000000000000000n) 
    })
  })
});
