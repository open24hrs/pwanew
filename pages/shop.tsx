// pages/shop.tsx
import { ThirdwebProvider, useAddress, useContract, Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { NFT_CONTRACT_ADDRESS } from "../consts/addresses";
import { Sepolia } from "@thirdweb-dev/chains";

const Shop = () => {
  const address = useAddress();

  return (
    <div className={styles.container}>
      <h1>Shop</h1>
      <div className={styles.product}>
        <img src="/hoodie.png" alt="Sample Hoodie" className={styles.productImage} />
        <h2>Sample Hoodie</h2>
        <p>Price: 0.05 ETH or $50</p>
        <Web3Button
          contractAddress={NFT_CONTRACT_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
          onSuccess={() => alert("Purchase Successful!")}
        >
          Buy with ETH
        </Web3Button>
        <Web3Button
          contractAddress={NFT_CONTRACT_ADDRESS}
          action={(contract) => contract.erc1155.claim(0, 1)}
          onSuccess={() => alert("Purchase Successful!")}
        >
          Buy with Credit Card
        </Web3Button>
      </div>
    </div>
  );
};

export default Shop;