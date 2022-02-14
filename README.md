### UI
![screenshot1](https://user-images.githubusercontent.com/7741547/153894263-4ee672a1-59a0-4da6-90e7-a0273c05a8c5.jpg)

### TroubleShooting

- 진행하다가 갑자기 메타마스크 연결이 안되고, Remix 에서 minting 이 계속 pending 되는 이슈가 발생했다.
- 네트워크를 끊고 다시 연결도 해보고, 계정을 지우고 새로 만들어보고, 구글링해서 나오는 다양한 해결책들을 적용해보았지만 다 안됨.
- 원인은 Polygon Testnet > RPC 주소로 https://matic-testnet-archive-rpc.bwarelabs.com 를 사용했을때 발생하는 이슈였다.
- 원인은 아직 파악중이지만.. 저 주소는 에러가 발생해서 https://rpc-mumbai.matic.today 로 주소 변경하여 적용하니 정상동작함.
