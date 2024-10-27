import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import {
  accounts,
  commitGrowAction,
  CurrentUser,
  GetGardenForCurrentUser,
  HANA_URL,
  issueGrowAction,
  REFRESH_TOKEN_URL,
  SLEEPTIME,
} from "./config";

const sleep = (millis: number) => {
  return new Promise((resolve) => setTimeout(resolve, millis));
};

async function grows() {
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
      const { data } = await axiosInstance.post(
        HANA_URL,
        GetGardenForCurrentUser
      );

      await sleep(SLEEPTIME);

      const growActionCount =
        data?.data?.getGardenForCurrentUser?.gardenStatus?.growActionCount;

      if (growActionCount) {
        console.log(`Đang quay số ${account.name}....\n`);
        const { data: data1 } = await axiosInstance.post(
          HANA_URL,
          issueGrowAction
        );
        console.log(`Quay thành công ${data1.data.issueGrowAction} điểm\n`);

        await sleep(getRandomDelay());

        console.log("Đang confirm điểm\n");

        const { data: data2 } = await axiosInstance.post(
          HANA_URL,
          commitGrowAction
        );
        await sleep(getRandomDelay());
        console.log(`Confirm thành công: ${data2.data.commitGrowAction}\n`);
        console.log(`Bạn còn tổng ${growActionCount} lượt quay\n`);

        const { data: data3 } = await axiosInstance.post(HANA_URL, CurrentUser);

        console.log(
          `Tổng điểm hiện tại: ${data3?.data?.currentUser?.totalPoint} \n`
        );

        await sleep(getRandomDelay());
      } else {
        if (growActionCount === undefined) {
          console.log("Hết hạn accessToken...\n");
          const new_access_token = await getNewAccesstoken(
            account.refresh_token
          );
          accounts[index].access_token = new_access_token;
        } else {
          console.log(
            `Đã quay xong ${account.name}, lượt quay còn lại là: ${growActionCount}\n`
          );
        }
      }
    } catch (error: any) {
      console.log("Đã xảy ra lỗi: ", error?.response?.data);
    }
    console.log(
      "============================== KẾT THÚC =============================\n\n"
    );
  }
  console.log("XONG 1 VÒNG !!! BẮT ĐẦU CHẠY TIẾP...\n\n");
  await sleep(getRandomDelay());
  grows();
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
  const minDelay = 1000; // 1 giây
  const maxDelay = 5000; // 5 giây
  return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
};
grows();
