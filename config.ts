export const accounts = [
  {
    name: "NICK 1",
    refresh_token:
      "AMf-vBy8ROnG9NKBypmYeRsT23tyq3UxRX4zwYKy_08WaqVRZCINMRToVyhs0ZK0kmXBDAsMMo5Cr-ws9Jdh150G81KNnLWFdOW3m0s_bwYnxDGC7cWSI9Ch3V3_y0FG1zdmlsOKwFzCaYyr9tl5uvNxtHid5vfv1yjJoJahGgvk-HCI87fxo2XwGg6k1XkEnlV5Gcdgj8e8-a1xKfRWotNnWbc9SnKcbWBdyI6VA_aXmrizwHddo03reQ216Lz7OdQAd2Hk4xe_bE5c4xj-ruhtMrb14fBkbxh-9f7NpLJM1TV6-NhEbBAUFYVr72BcV-Bj7_M_1MDoKnroeycTltCCr4vKDWXRHiOFkb-9l8DNnlDl987ftWohsD2AqQR6SfdD9hOS4d1W8SAK6IvXbFt1E0ukhRhlRe10_nVa2kLAS5Ol9Mu1z_emh4Ge96nBr6p4jSUKc23s",
    proxy: "", //http://sp08-15050:MABBX@sp08-100.proxy.mkvn.net:15050
    access_token: "",
  },
];
export const issueGrowAction = {
  query: "mutation issueGrowAction {\n  issueGrowAction\n}",
  operationName: "issueGrowAction",
};
export const commitGrowAction = {
  query: "mutation commitGrowAction {\n  commitGrowAction\n}",
  operationName: "commitGrowAction",
};

export const GetGardenForCurrentUser = {
  query:
    "query GetGardenForCurrentUser {\n  getGardenForCurrentUser {\n    id\n    inviteCode\n    gardenDepositCount\n    gardenStatus {\n      id\n      activeEpoch\n      growActionCount\n      gardenRewardActionCount\n    }\n    gardenMilestoneRewardInfo {\n      id\n      gardenDepositCountWhenLastCalculated\n      lastAcquiredAt\n      createdAt\n    }\n    gardenMembers {\n      id\n      sub\n      name\n      iconPath\n      depositCount\n    }\n  }\n}",
  operationName: "GetGardenForCurrentUser",
};

export const CurrentUser = {
  query:
    "query CurrentUser { currentUser { id sub name iconPath depositCount totalPoint evmAddress { userId address } inviter { id name } } }",
  operationName: "CurrentUser",
};

export const HANA_URL =
  "https://hanafuda-backend-app-520478841386.us-central1.run.app/graphql";
export const REFRESH_TOKEN_URL =
  "https://securetoken.googleapis.com/v1/token?key=AIzaSyDipzN0VRfTPnMGhQ5PSzO27Cxm3DohJGY";
export const SLEEPTIME = 2500;
