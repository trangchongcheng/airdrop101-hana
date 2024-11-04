import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import {
  accounts,
  BASE_RPC,
  CurrentUser,
  DEPOSIT_CONTRACT,
  HANA_URL,
  REFRESH_TOKEN_URL,
  SyncEthereumTx,
} from "./config";
const { Web3 } = require("web3");
const { sleep } = require("../utils/sleep");

const web3 = new Web3(BASE_RPC);

async function deposit() {
  for (let index = 0; index < accounts.length; index++) {
    const account = accounts[index];
    try {
      console.log(
        `============================ BẮT ĐẦU ${account.name} ===========================\n`
      );
      const axiosInstance = axios.create({
        httpsAgent: account?.proxy ? new HttpsProxyAgent(account.proxy) : null,
        headers: {
          Authorization: `Bearer ${account.access_token}`,
        },
      });

      const { address } = web3.eth.accounts.privateKeyToAccount(
        `0x${account.privateKey}`
      );

      const nonce = await web3.eth.getTransactionCount(address, "latest");

      const gasPrice = await web3.eth.getGasPrice();

      const payload = "0xf6326fb3";
      const value = getRandomDeposit();

      const gasEstimate = await web3.eth.estimateGas({
        from: address,
        to: DEPOSIT_CONTRACT,
        data: payload,
        value: web3.utils.toWei(value, "ether"),
      });

      const tx = {
        from: address,
        to: DEPOSIT_CONTRACT,
        nonce: nonce,
        gasLimit: gasEstimate + gasEstimate / 5n,
        gasPrice: gasPrice + gasPrice / 5n,
        data: payload,
        value: web3.utils.toWei(value, "ether"),
      };

      console.log(`Đang tiến hành deposit ${value} eth \n`);

      const signedTx = await web3.eth.accounts.signTransaction(
        tx,
        account.privateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      const txHash = receipt.transactionHash;
      console.log(`Đã deposit thành công ${value} eth, tx: ${txHash}\n`);

      await sleep(getRandomDelay());

      console.log(`Đang sync deposit....\n`);

      const { data } = await axiosInstance.post(HANA_URL, {
        ...SyncEthereumTx,
        variables: {
          ...SyncEthereumTx.variables,
          txHash,
        },
      });

      await sleep(getRandomDelay());

      const syncEthereumTx = data?.data?.syncEthereumTx;

      if (syncEthereumTx) {
        console.log(`Sync deposit thành công \n`);
        await sleep(getRandomDelay());

        const { data: data2 } = await axiosInstance.post(HANA_URL, CurrentUser);

        console.log(
          `Tổng deposit hiện tại: ${data2?.data?.currentUser?.depositCount} \n`
        );
        console.log(
          `Tổng điểm hiện tại: ${data2?.data?.currentUser?.totalPoint} \n`
        );
      } else {
        const error = data?.errors?.[0]?.message;
        if (error === "Unauthorized") {
          console.log("Hết hạn accessToken...\n");
          const new_access_token = await getNewAccesstoken(
            account.refresh_token
          );
          accounts[index].access_token = new_access_token;
        } else {
          console.log(`Sync deposit bị lỗi, tx:${txHash}`, data?.errors);
        }
      }
    } catch (error: any) {
      console.log(error);
      console.log("Đã xảy ra lỗi: ", error?.response?.data);
    }
    console.log(
      "============================== KẾT THÚC =============================\n\n"
    );
  }
  console.log("XONG 1 VÒNG !!! BẮT ĐẦU CHẠY TIẾP...\n\n");
  await sleep(getRandomDelay());
  deposit();
}

const getNewAccesstoken = async (refresh_token: string) => {
  const {
    data: { access_token },
  } = await axios.post(REFRESH_TOKEN_URL, {
    grant_type: "refresh_token",
    refresh_token,
  });
  if (access_token) {
    console.log(`Đang update access token mới:  ${access_token} \n`);
    return access_token;
  }
};
const getRandomDelay = () => {
  const minDelay = 1000;
  const maxDelay = 3000;
  return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};

function getRandomDeposit(min = 0.00001, max = 0.00009, decimals = 6) {
  if (min > max) {
    [min, max] = [max, min];
  }
  const randomValue = Math.random() * (max - min) + min;
  return Number(randomValue.toFixed(decimals));
}

deposit();
