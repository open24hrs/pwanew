import {
  ConnectWallet,
  MediaRenderer,
  Web3Button,
  useAddress,
  useContract,
  useContractMetadata,
} from "@thirdweb-dev/react";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { SmartContract } from "@thirdweb-dev/sdk";

const getMintPrice = async (contract: SmartContract) => {
  try {
    const price = await contract.call("mintPrice", [0]);
    return price.displayValue;
  } catch (error) {
    console.error("Failed to fetch mint price:", error);
    return null;
  }
};

const getTotalSupply = async (contract: SmartContract) => {
  try {
    const supply = await contract.erc1155.totalSupply(0);
    return supply.toNumber();
  } catch (error) {
    console.error("Failed to fetch total supply:", error);
    return null;
  }
};

const Home: NextPage = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS as string);
  const { data: contractMetadata } = useContractMetadata(contract);

  const [totalSupply, setTotalSupply] = useState<number | null>(null);
  const [mintPrice, setMintPrice] = useState<string | null>(null);

  useEffect(() => {
    if (contract) {
      const fetchContractData = async () => {
        const supply = await getTotalSupply(contract);
        const price = await getMintPrice(contract);
        setTotalSupply(supply);
        setMintPrice(price);
      };

      fetchContractData();
    }
  }, [contract]);

  return (
    <div className={styles.container}>
      {address ? (
        <div className={styles.nftClaim}>
          <MediaRenderer
            src={contractMetadata?.image}
            width="auto"
            height="60%"
            style={{
              borderRadius: "20px",
              maxWidth: "500px",
            }}
          />
          <h1>{contractMetadata?.name}</h1>
          {totalSupply !== null && mintPrice !== null && (
            <div className={styles.contractInfo}>
              <p>Total Supply: {totalSupply}</p>
              <p>Mint Price: {mintPrice} ETH</p>
            </div>
          )}
          <Web3Button
            contractAddress={NFT_CONTRACT_ADDRESS}
            action={async (contract) => {
              await contract.erc1155.claim(0, 1);
            }}
            onSuccess={() => alert("NFT Claimed!")}
            onError={(error) => alert(`Error: ${error.message}`)}
          >
            Claim NFT
          </Web3Button>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <ConnectWallet btnTitle="Login" />
        </div>
      )}
    </div>
  );
};

export default Home;