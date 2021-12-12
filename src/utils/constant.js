export const DOM = {
  $TR: 'tr',
  $APP: '#app',
  $COIN_500_QUANTITY: '#coin-500-quantity',
  $COIN_100_QUANTITY: '#coin-100-quantity',
  $COIN_50_QUANTITY: '#coin-50-quantity',
  $COIN_10_QUANTITY: '#coin-10-quantity',
  $$PURCHASE_BUTTONS: '.purchase-button',
  $COIN_RETURN_BUTTON: '#coin-return-button',
  $PRODUCT_PURCHASE_ITEM: 'product-purchase-item',
  $CHARGE_BUTTON: '#charge-button',
  $CHARGE_INPUT: '#charge-input',
  $CHARGE_AMOUNT: '#charge-amount',
  $PRODUCT_MANAGE_ITEM: 'product-manage-item',
  $PRODUCT_ADD_MENU: '#product-add-menu',
  $PRODUCT_PURCHASE_MENU: '#product-purchase-menu',
  $PRODUCT_PURCHASE_MENU_TBODY: '#product-purchase-menu-tbody',
  $PRODUCT_NAME_INPUT: '#product-name-input',
  $PRODUCT_PRICE_INPUT: '#product-price-input',
  $PRODUCT_QUANTITY_INPUT: '#product-quantity-input',
  $PRODUCT_ADD_BUTTON: '#product-add-button',
  $PRODUCT_MANAGE_TBODY: '#product-manage-tbody',
  $VENDING_MACHINE_MANAGE_MENU: '#vending-machine-manage-menu',
  $VENDING_MACHINE_SECTION: '#vending-machine-section',
  $VENDING_MACHINE_CHARGE_INPUT: '#vending-machine-charge-input',
  $VENDING_MACHINE_CHARGE_BUTTON: '#vending-machine-charge-button',
  $VENDING_MACHINE_CHARGE_AMOUNT: '#vending-machine-charge-amount',
  $VENDING_MACHINE_MANAGE_TBODY: '#vending-machine-manage-tbody',
  $VENDING_MACHINE_COIN_500_QUANTITY: '#vending-machine-coin-500-quantity',
  $VENDING_MACHINE_COIN_100_QUANTITY: '#vending-machine-coin-100-quantity',
  $VENDING_MACHINE_COIN_50_QUANTITY: '#vending-machine-coin-50-quantity',
  $VENDING_MACHINE_COIN_10_QUANTITY: '#vending-machine-coin-10-quantity',
};

export const NUMBER = {
  BLANK_CHECK_LENGTH: 1,
  UNIT_CHECK_TEN: 10,
  ZERO: 0,
  ONE: 1,
  COIN_10: 10,
  COIN_100: 100,
  COIN_50: 50,
  COIN_500: 500,
};

export const PRODUCT = {
  NAME: 0,
  QUANTITY: 2,
};

export const COIN = {
  LIST: [500, 100, 50, 10],
  HASH: { 500: 0, 100: 0, 50: 0, 10: 0 },
};

export const ERROR_MESSAGE = {
  PRODUCT_BLANK(placeholder) {
    return `${placeholder}을 입력해주세요.`;
  },
  PRODUCT_POSITIVE_INTEGER: '양의 정수를 입력해주세요.',
  PRODUCT_MORE_THAN_ONE_HUNDRED: '상품 가격은 100원 이상으로 입력해주세요.',
  NOT_ENOUGH_AMOUNT: '금액이 부족합니다. 금액을 투입해주세요.',
  OUT_OF_STOCK: '해당 상품은 품절입니다.',
  UNIT_OF_TEN(placeholder) {
    return `${placeholder}은 10원 단위로 입력해주세요.`;
  },
  CHARGE_COIN_FIRST: '자판기에 잔돈 충전을 먼저 해주세요.',
};

export const LOCAL_STORAGE = {
  PRODUCTS_INFORMATION: 'productsInformation',
  COINS_INFORMATION: 'coinsInformation',
  PRODUCT_ADD_MENU: 'productAddMenu',
  VENDING_MACHINE_MANAGE_MENU: 'vendingMachineManageMenu',
  PRODUCT_PURCHASE_MENU: 'productPurchaseMenu',
  PURCHASE_CHARGE_AMOUNT: 'purchaseChargeAmount',
};

export const STRING = {
  WON: '원',
  GAE: '개',
};

export const EVENT = {
  CLICK: 'click',
};

export const SELECTOR = {
  CLASS: 'class',
};

export const TEMPLATE = {
  MAIN: `
  <header id="vending-machine-header">
    <h1>🥤자판기🥤</h1>
    <button id="product-add-menu">상품 관리</button>
    <button id="vending-machine-manage-menu">잔돈 충전</button>
    <button id="product-purchase-menu">상품 구매</button>
  </header>
  <section id="vending-machine-section"></section>
  `,
  PRODUCT_ADD_MENU: `
  <h3>상품 추가하기</h3>
  <input type='text' placeholder='상품명' id='product-name-input' />
  <input type='number' placeholder='가격' id='product-price-input' />
  <input type='number' placeholder='수량' id='product-quantity-input' />
  <button id='product-add-button'>추가하기</button>
  <br /><br /><br />
  <h3>상품 현황</h3>
  <table id='product-manage-table'>
    <thead>
      <tr>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
      </tr>
    </thead>
    <tbody id="product-manage-tbody"></tbody>
  </table>
  `,
  PRODUCT_MANAGE_TBODY(productName, productPrice, productQuantity) {
    return `
    <td class="product-manage-name">${productName}</td>
    <td class="product-manage-price">${productPrice}</td>
    <td class="product-manage-quantity" data-product-name="${productName}">${productQuantity}</td>
    `;
  },
  PRODUCT_MANAGE_QUANTITY(productName, productQuantity) {
    return `<td class="product-manage-quantity" data-product-name="${productName}">${productQuantity}</td>`;
  },
  VENDING_MACHINE_MANAGE_MENU: `
  <h3>자판기 동전 충전하기</h3>
  <input type="number" placeholder="자판기가 보유할 금액" id="vending-machine-charge-input"/>
  <button id="vending-machine-charge-button">충전하기</button>
  <br /><br />
  <span>보유 금액: 
    <span id='vending-machine-charge-amount'></span>
  </span>
  <br /><br /><br />
  <h3>자판기가 보유한 동전</h3>
  <table id='vending-machine-manage-table'>
    <thead>
      <tr>
        <th>동전</th>
        <th>개수</th>
      </tr>
    </thead>
    <tbody id='vending-machine-manage-tbody'>
      <tr>
        <th>500원</th>
        <td id='vending-machine-coin-500-quantity'>0개</td>
      </tr>
      <tr>
        <th>100원</th>
        <td id='vending-machine-coin-100-quantity'>0개</td>
      </tr>
      <tr>
        <th>50원</th>
        <td id='vending-machine-coin-50-quantity'>0개</td>
      </tr>
      <tr>
        <th>10원</th>
        <td id='vending-machine-coin-10-quantity'>0개</td>
      </tr>
    </tbody>
  </table>
  `,
  PRODUCT_PURCHASE_MENU: `
  <h3>금액 투입</h3>
    <input type="number" id="charge-input" placeholder="투입할 금액"/>
    <button id="charge-button">투입하기</button>
    <br /><br />
    <span
      >투입한 금액:
      <span id="charge-amount">0</span>
      원
    </span>
    <br /><br /><br />
    <h3>구매할 수 있는 상품 현황</h3>
    <table id="product-purchase-menu-table">
      <thead>
        <tr>
          <th>상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>구매</th>
        </tr>
      </thead>
      <tbody id="product-purchase-menu-tbody"></tbody>
    </table>
    <br /><br /><br />
    <h3>잔돈</h3>
    <button id="coin-return-button">반환하기</button>
    <table id="product-purchase-change-table">
      <thead>
        <tr>
          <th>동전</th>
          <th>개수</th>
        </tr>
      </thead>
      <tbody id="product-purchase-change-tbody">
        <tr>
          <th>500원</th>
          <td id="coin-500-quantity"></td>
        </tr>
        <tr>
          <th>100원</th>
          <td id="coin-100-quantity"></td>
        </tr>
        <tr>
          <th>50원</th>
          <td id="coin-50-quantity"></td>
        </tr>
        <tr>
          <th>10원</th>
          <td id="coin-10-quantity"></td>
        </tr>
      </tbody>
    </table>
  `,
  PRODUCT_PURCHASE_STATUS(productName, productPrice, productQuantity) {
    return `
      <td class="product-purchase-name" data-product-name="${productName}">${productName}</td>
      <td class="product-purchase-price" data-product-price="${productPrice}">${productPrice}</td>
      <td class="product-purchase-quantity" data-product-quantity="${productQuantity}">${productQuantity}</td>
      <td>
        <button class="purchase-button">구매하기</button>
      </td>
    `;
  },
  CHARGE_INPUT(amount) {
    return `${amount}`;
  },
  VENDING_MACHINE_CHARGE_AMOUNT(amount) {
    return `<span id="vending-machine-charge-amount">${amount}</span>`;
  },
  VENDING_MACHINE_COIN(coin, coinQuantity) {
    return `<td id="vending-machine-coin-${coin}-quantity">${coinQuantity}개</td>`;
  },
};
