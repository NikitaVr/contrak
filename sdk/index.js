"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.connect = void 0;
const ethers_1 = require("ethers");
const fs = require("fs");
require("dotenv/config");
function connect({ contractName, chainID, contractAddress, contractDeploymentTransactionHash, orgPublicKey, }) {
    return __awaiter(this, void 0, void 0, function* () {
        // Should we add contractName to the signed data too?
        const messageData = {
            action: "connect",
            chainID: chainID,
            contractAddress: contractAddress,
            orgPublicKey: orgPublicKey,
        };
        // bas64 encode the message
        const message = Buffer.from(JSON.stringify(messageData)).toString("base64");
        // public key is 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 for private key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
        if (!deployerPrivateKey) {
            throw new Error("Private key not found in environment variables");
        }
        const signer = new ethers_1.ethers.Wallet(deployerPrivateKey);
        const signature = yield signer.signMessage(message);
        let teamSignature = null;
        const teamPrivateKey = process.env.TEAM_PRIVATE_KEY;
        if (teamPrivateKey) {
            const teamSigner = new ethers_1.ethers.Wallet(teamPrivateKey);
            teamSignature = yield teamSigner.signMessage(message);
        }
        const output = {
            contractName: contractName,
            chainID: chainID,
            contractAddress: contractAddress,
            contractDeploymentTransactionHash,
            orgPublicKey: orgPublicKey,
            message: message,
            deployerSignature: signature,
            teamSignature: teamSignature,
        };
        // write output to file
        fs.writeFileSync("output.json", JSON.stringify(output, null, 2));
        // log output file location
        //   console.log("output file location: ", __dirname + "/output.json");
    });
}
exports.connect = connect;
function verify({ message, signature }) {
    return __awaiter(this, void 0, void 0, function* () {
        const signer = ethers_1.ethers.verifyMessage(message, signature);
        console.log(`Signer: ${signer}`);
    });
}
exports.verify = verify;
