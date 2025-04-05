import { expect } from "chai";
import { ethers } from "hardhat";
import { CBKToken } from "../typechain-types";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";

describe("CBKToken", function () {
  let cbkToken: CBKToken;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    
    const CBKToken = await ethers.getContractFactory("CBKToken");
    cbkToken = await CBKToken.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await cbkToken.hasRole(await cbkToken.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
    });

    it("Should assign the minter role to owner", async function () {
      expect(await cbkToken.hasRole(await cbkToken.MINTER_ROLE(), owner.address)).to.equal(true);
    });

    it("Should have correct name and symbol", async function () {
      expect(await cbkToken.name()).to.equal("Cyberk Token");
      expect(await cbkToken.symbol()).to.equal("CBK");
    });
  });

  describe("Minting", function () {
    it("Should allow minting by minter role", async function () {
      await cbkToken.mint(addr1.address, ethers.parseEther("100"));
      expect(await cbkToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("100"));
    });

    it("Should fail when non-minter tries to mint", async function () {
      await expect(
        cbkToken.connect(addr1).mint(addr2.address, ethers.parseEther("100"))
      ).to.be.revertedWithCustomError(cbkToken, "AccessControlUnauthorizedAccount");
    });
  });

  describe("Transfers", function () {
    beforeEach(async function () {
      await cbkToken.mint(addr1.address, ethers.parseEther("100"));
    });

    it("Should transfer tokens between accounts", async function () {
      await cbkToken.connect(addr1).transfer(addr2.address, ethers.parseEther("50"));
      expect(await cbkToken.balanceOf(addr2.address)).to.equal(ethers.parseEther("50"));
    });

    it("Should fail if sender doesn't have enough tokens", async function () {
      await expect(
        cbkToken.connect(addr1).transfer(addr2.address, ethers.parseEther("101"))
      ).to.be.revertedWithCustomError(cbkToken, "ERC20InsufficientBalance");
    });
  });

  describe("Burning", function () {
    beforeEach(async function () {
      await cbkToken.mint(addr1.address, ethers.parseEther("100"));
    });

    it("Should allow token burning", async function () {
      await cbkToken.connect(addr1).burn(ethers.parseEther("50"));
      expect(await cbkToken.balanceOf(addr1.address)).to.equal(ethers.parseEther("50"));
    });
  });

  describe("Pausing", function () {
    beforeEach(async function () {
      await cbkToken.mint(addr1.address, ethers.parseEther("100"));
    });

    it("Should pause and unpause", async function () {
      await cbkToken.pause();
      await expect(
        cbkToken.connect(addr1).transfer(addr2.address, ethers.parseEther("50"))
      ).to.be.revertedWithCustomError(cbkToken, "EnforcedPause");

      await cbkToken.unpause();
      await cbkToken.connect(addr1).transfer(addr2.address, ethers.parseEther("50"));
      expect(await cbkToken.balanceOf(addr2.address)).to.equal(ethers.parseEther("50"));
    });
  });
}); 