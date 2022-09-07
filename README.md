```ts
// 新连接
new WebSocket('...')
// 重连
new WebSocket('...[?wsId=xxx]')
```

- `/api`
    - `/ws/count` 获取连接数
    - `/ws/wsList` 获取连接id列表
    - `/ws/roomList` 获取房间id列表