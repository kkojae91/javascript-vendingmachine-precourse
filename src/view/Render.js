import SetLocalStorage from '../controller/localStorage/SetLocalStorage.js';
import { TEMPLATE, DOM, STRING, SELECTOR, NUMBER } from '../utils/constant.js';

export default class Render {
  constructor(coins, product, vendingMachine) {
    this.coins = coins;
    this.product = product;
    this.vendingMachine = vendingMachine;
    this.setLocalStorage = new SetLocalStorage(this.coins, this.product, this.vendingMachine);
    this.$app = document.querySelector(DOM.$APP);
  }

  inputFocus = ($element) => $element.focus();

  alertMessage = (message) => alert(message);

  haveTemplate = (template) => {
    const $vendingMachineSection = document.querySelector(DOM.$VENDING_MACHINE_SECTION);
    $vendingMachineSection.innerHTML = template;
  };

  reRenderVendingMachineManageMenuTemplate = (vendingMachineManageMenuTemplate) => {
    this.setLocalStorage.reVendingMachineManageMenu(vendingMachineManageMenuTemplate);
  };

  purchaseChargeAmountTemplate = () => {
    const $chargeAmount = document.querySelector(DOM.$CHARGE_AMOUNT);
    $chargeAmount.textContent = this.vendingMachine.getChargeAmount();

    this.setLocalStorage.purchaseChargeAmount();
    this.setLocalStorage.productPurchaseMenu();
  };

  returnCoinTemplate = (coinQuantityHash) => {
    const $coin500 = document.querySelector(DOM.$COIN_500_QUANTITY);
    const $coin100 = document.querySelector(DOM.$COIN_100_QUANTITY);
    const $coin50 = document.querySelector(DOM.$COIN_50_QUANTITY);
    const $coin10 = document.querySelector(DOM.$COIN_10_QUANTITY);
    const [coin10, coin50, coin100, coin500] = Object.values(coinQuantityHash);
    $coin500.textContent = coin500 + STRING.GAE;
    $coin100.textContent = coin100 + STRING.GAE;
    $coin50.textContent = coin50 + STRING.GAE;
    $coin10.textContent = coin10 + STRING.GAE;

    this.setLocalStorage.coinsInformation();
  };

  purchaseTemplate = ($targetName, $targetPrice, $targetQuantity) => {
    $targetQuantity.dataset.productQuantity -= NUMBER.ONE;
    $targetQuantity.textContent -= NUMBER.ONE;

    this.product.replaceInformation(
      $targetName.textContent,
      Number($targetPrice.textContent),
      Number($targetQuantity.textContent)
    );

    this.setLocalStorage.productInformation();
    this.setLocalStorage.productPurchaseMenu();
    this.setLocalStorage.purchaseChargeAmount();
  };

  chargeInputTemplate = (template) => {
    const $chargeAmount = document.querySelector(DOM.$CHARGE_AMOUNT);
    $chargeAmount.textContent = template;
    this.setLocalStorage.productPurchaseMenu();
    this.setLocalStorage.purchaseChargeAmount();
  };

  productPurchaseStatusResetTemplate = () => {
    const $productPurchaseMenuTbody = document.querySelector(DOM.$PRODUCT_PURCHASE_MENU_TBODY);
    $productPurchaseMenuTbody.innerHTML = '';
  };

  productPurchaseStatusTemplate = (template) => {
    const $productPurchaseMenuTbody = document.querySelector(DOM.$PRODUCT_PURCHASE_MENU_TBODY);
    const $tr = document.createElement(DOM.$TR);
    $tr.setAttribute(SELECTOR.CLASS, DOM.$PRODUCT_PURCHASE_ITEM);
    $tr.innerHTML = template;
    $productPurchaseMenuTbody.appendChild($tr);
  };

  productPurchaseMenuTemplate = () => {
    const $vendingMachineSection = document.querySelector(DOM.$VENDING_MACHINE_SECTION);
    $vendingMachineSection.innerHTML = TEMPLATE.PRODUCT_PURCHASE_MENU;
  };

  vendingMachineChargeTableTemplate = (coin10, coin50, coin100, coin500) => {
    const $vendingMachineCoin10Quantity = document.querySelector(DOM.$VENDING_MACHINE_COIN_10_QUANTITY);
    $vendingMachineCoin10Quantity.textContent = coin10 + STRING.GAE;

    const $vendingMachineCoin50Quantity = document.querySelector(DOM.$VENDING_MACHINE_COIN_50_QUANTITY);
    $vendingMachineCoin50Quantity.textContent = coin50 + STRING.GAE;

    const $vendingMachineCoin100Quantity = document.querySelector(DOM.$VENDING_MACHINE_COIN_100_QUANTITY);
    $vendingMachineCoin100Quantity.textContent = coin100 + STRING.GAE;

    const $vendingMachineCoin500Quantity = document.querySelector(DOM.$VENDING_MACHINE_COIN_500_QUANTITY);
    $vendingMachineCoin500Quantity.textContent = coin500 + STRING.GAE;

    this.setLocalStorage.coinsInformation();
    this.setLocalStorage.vendingMachineManageMenu();
  };

  vendingMachineChargeAmountTemplate = (vendingMachineChargeAmount) => {
    const $vendingMachineChargeAmount = document.querySelector(DOM.$VENDING_MACHINE_CHARGE_AMOUNT);
    $vendingMachineChargeAmount.textContent = vendingMachineChargeAmount + STRING.WON;
  };

  vendingMachineManageMenuTemplate = () => {
    const $vendingMachineSection = document.querySelector(DOM.$VENDING_MACHINE_SECTION);
    $vendingMachineSection.innerHTML = TEMPLATE.VENDING_MACHINE_MANAGE_MENU;
  };

  productAddManageTableTemplate = (productName, productPrice, productQuantity) => {
    const $tr = document.createElement(DOM.$TR);
    $tr.setAttribute(SELECTOR.CLASS, DOM.$PRODUCT_MANAGE_ITEM);
    $tr.innerHTML = TEMPLATE.PRODUCT_MANAGE_TBODY(productName, productPrice, productQuantity);

    const $productManageTbody = document.querySelector(DOM.$PRODUCT_MANAGE_TBODY);
    $productManageTbody.appendChild($tr);

    this.setLocalStorage.productInformation();
    this.setLocalStorage.productAddMenu();
  };

  productAddMenuTemplate = () => {
    const $vendingMachineSection = document.querySelector(DOM.$VENDING_MACHINE_SECTION);
    $vendingMachineSection.innerHTML = TEMPLATE.PRODUCT_ADD_MENU;
  };

  mainTemplate = () => {
    this.$app.innerHTML = TEMPLATE.MAIN;
  };
}
