
# 2023_Dcard——Frontend_作業

強尼是一名工程師,他想要幫助開發團隊更有效地管理專案。團隊已⻑期使用 GitHub,但他們在使用 Issue 來追蹤進度上遇到困
難。因此他決定串接 GitHub API 並使用 React.js 開發一個網頁來提供更有效的專案管理工具,希望熟悉前端的你能幫助他完成這
個專案。

### 綫上網站：https://github-issuer.pages.dev/
#### ！！注意事項 ！！  

*目前Github o-auth預設登入口為http://127.0.0.1:3000/ ,登入取得權限后Github o-auth預設跳轉入口為http://127.0.0.1:3000/ ,所以若透過CDN上登入的使用者，需要手動把跳轉網址後面的* \
``?code=35afd147584ea5bd3847``
\
*再張貼至CDN網頁的尾部即可正常運作*  \
如 \
``https://github-issuer.pages.dev/?code=35afd147584ea5bd3847``

#### 有的功能：
1.登入（按下右上角“Login”按鈕即可）\
2.搜尋或顯示全部資料情況下可以依照['created', 'updated', 'comments']對資料進行排列\
3.搜尋或顯示全部資料情況下可以依照狀態（標簽），對資料進行篩選\
4.可自行添加或刪減狀態（標簽），目前預設可選擇添加的狀態有['Open', 'In Progress', 'Done']\
5.搜尋功能正常，以task的title包含的關鍵字爲主\
6.盡量效能化:例如避免重複發送 API 請求、避免 component re-render
#### 未完成功能：
1.單筆API請求載入10筆Task\
2.美化\
3.清理、重組代碼
#### 存在問題：
#### 1.身份鑰匙丟失
儅刷新頁面（Ctrl+R）時若尾部有``?code=35afd147584ea5bd3847``,會載入失敗且丟失登入鑰匙的暫存，需要移除
``?code=35afd147584ea5bd3847``的狀況下重新載入，才會運作正常（使用電腦上的暫存鑰匙，身份未過期前都不需要向github拿鑰匙或做重新登入的動作，無限次刷新都不會丟失身份）。

## 網頁流程與鏈接

1.[NextJs(ClientSideRendering Mode)](https://github.com/ChickenLamb/Github-Issuer) ——>static file->CDN
2.CDN->client->[MiddlewareAPI(to resolve CORS)](https://github.com/ChickenLamb/Github-Get-Token-API)->githubAPI
3.github o-auth->redirect to domain(localhost:3000 or CDN hosting domain)




## Installation/如何本地運行
#### 需要的工具
[npm and Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

Install Github-Issuer with npm
\
Open Prompt:
### build and run

```bash
  git clone https://github.com/ChickenLamb/Github-Issuer
  cd Gitbub-Issuer
  npm install
  npm run build
  npm run start
```
  go to https://localhost:3000
    


## Appendix/備注

#### Push then github Actions automatically Deploy to CDN

.github/workflows/*.yml -> github Actions -> build and export to -> branch/gh-pages -> deploy trigger to CDN(Cloudflare)

#### 使用的library:
1.MUI(CSS Framework）\
2.axios（API call) \
3.toastify(toasting style notify)\
4.react/next (JavaScript Framework)