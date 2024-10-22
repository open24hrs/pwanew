// pages/nfts.tsx
import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import NFTCard from "../components/nft-card";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";

const Nfts = () => {
  const address = useAddress();
  const { contract } = useContract(NFT_CONTRACT_ADDRESS);
  const {
    data: ownedNFTs,
    isLoading: ownedNFTsLoading
  } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>NFTs</h1>
        {ownedNFTsLoading ? (
          <p>Loading...</p>
        ) : (
          ownedNFTs && ownedNFTs.length > 0 ? (
            ownedNFTs.map((nft) => {
              return (
                <NFTCard
                  key={nft.metadata.id}
                  nft={nft}
                  quantity={parseInt(nft.quantityOwned!)}
                />
              )
            })
          ) : (
            <p>No NFTs owned</p>
          )
        )}
      </div>
    </div>
  );
};

export default Nfts;