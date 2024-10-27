Tác giả script: x.com/trangchongcheng

Group telegram về airdrop, blockchain: t.me/airdrop101xyz

## Hana network

Backer: Binance Labs...

Raised: 4M

## Đăng ký tài khoản hana

https://hanafuda.hana.network/

Dùng invite code ủng hộ: VQY1TS

## Cách chạy code

1. Sửa file config.ts, chỉ cần điền refresh_token vào, nếu có proxy thì điền proxy vào theo cú pháp minh họa ở dưới.Cách lấy refresh token xem video trên telegram airdrop101xyz

```

export const accounts = [
  {
    name: "NICK 1",
    refresh_token: "",
    proxy: "", //http://sp08-15050:MABBX@sp08-100.proxy.mkvn.net:15050
    access_token: "",
  },
];

```

Nếu muốn farm nhiều nick thì thêm nhiều item vào, ví dụ:

```
export const accounts = [
{
name: "NICK 1",
refresh_token: "",//http://sp08-15050:MABBX@sp08-100.proxy.mkvn.net:15050
access_token: "",
},
{
name: "NICK 2",
refresh_token: "",
proxy: "",
access_token: "",
},
{
name: "NICK 3",
refresh_token: "",
proxy: "",
access_token: "",
},
];
```

2. Cài đặt thư viện cần thiết

```
npm install
```

```
npm install -g typescript ts-node

```

3. Run code

```
ts-node index.ts
```

Xong!!!
