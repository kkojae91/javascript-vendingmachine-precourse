import { DOM, LOCAL_STORAGE, EVENT, TEMPLATE, ERROR_MESSAGE, NUMBER, STRING, COIN } from '../utils/constant.js';
import SetVendingMachinePurchase from './SetVendingMachinePurchase.js';
import CheckProductAddMenu from './CheckProductAddMenu.js';
import CheckVendingMachineManageMenu from './CheckVendingMachineManageMenu.js';

export default class CheckEventTarget {
  constructor(render, coins, product, vendingMachine) {
    this.render = render;
    this.coins = coins;
    this.product = product;
    this.vendingMachine = vendingMachine;
  }

  isProductAddMenu = (eventTarget, $productAddMenu) => {
    if (eventTarget === $productAddMenu) {
      const checkProductAddMenu = new CheckProductAddMenu(this.render, this.product);
      checkProductAddMenu.hasTemplate();
    }
  };

  isVendingMachineManageMenu = (eventTarget, $vendingMachineManageMenu) => {
    if (eventTarget === $vendingMachineManageMenu) {
      const checkVendingMachineManageMenu = new CheckVendingMachineManageMenu(this.render, this.coins);
      checkVendingMachineManageMenu.hasTemplate();
    }
  };

  onClickChargeButton = () => {
    const $chargeButton = document.querySelector(DOM.$CHARGE_BUTTON);
    $chargeButton.addEventListener(EVENT.CLICK, () => {
      this.setVendingMachinePurchase = new SetVendingMachinePurchase(this.render, this.vendingMachine);
      this.setVendingMachinePurchase.setVendingMachineCharge();
    });
  };

  renderProductStatus = () => {
    this.render.productPurchaseStatusResetTemplate();
    const productsStatus = this.vendingMachine.getCurrentProductStatus();
    productsStatus.forEach((productStatus) => {
      const [productName, productPrice, productQuantity] = productStatus;
      this.render.productPurchaseStatusTemplate(
        TEMPLATE.PRODUCT_PURCHASE_STATUS(productName, productPrice, productQuantity)
      );
    });
  };

  reRenderPurchaseChargeAmount = (productPrice) => {
    if (!this.vendingMachine.decreaseChargeAmount(productPrice)) {
      this.render.alertMessage(ERROR_MESSAGE.NOT_ENOUGH_AMOUNT);

      return false;
    }

    this.render.chargeInputTemplate(TEMPLATE.CHARGE_INPUT(this.vendingMachine.getChargeAmount()));
    return true;
  };

  isOutOfStock = (productName, productPrice, productQuantity, $targetName, $targetPrice, $targetQuantity) => {
    if (productQuantity <= NUMBER.ZERO) {
      this.render.alertMessage(ERROR_MESSAGE.OUT_OF_STOCK);

      return;
    }

    if (this.reRenderPurchaseChargeAmount(productPrice)) {
      this.render.purchaseTemplate($targetName, $targetPrice, $targetQuantity);
      this.localStorageProductAddMenu = this.localStorageProductAddMenu.replace(
        TEMPLATE.PRODUCT_MANAGE_QUANTITY(productName, productQuantity),
        TEMPLATE.PRODUCT_MANAGE_QUANTITY(productName, productQuantity - NUMBER.ONE)
      );
    }
  };

  isTargetName = (information, $targetName, $targetPrice, $targetQuantity) => {
    const [productName, productPrice, productQuantity] = information;
    if ($targetName.textContent === productName) {
      this.isOutOfStock(productName, productPrice, productQuantity, $targetName, $targetPrice, $targetQuantity);
    }
  };

  reRenderProductAddMenu = ($targetName, $targetPrice, $targetQuantity) => {
    this.localStorageProductAddMenu = localStorage.getItem(LOCAL_STORAGE.PRODUCT_ADD_MENU);
    this.product.getProductsInformation().forEach((information) => {
      this.isTargetName(information, $targetName, $targetPrice, $targetQuantity);
    });

    localStorage.setItem(LOCAL_STORAGE.PRODUCT_ADD_MENU, this.localStorageProductAddMenu);
  };

  onClickPurchaseButton = ($purchaseButton) => {
    $purchaseButton.addEventListener(EVENT.CLICK, (event) => {
      const $targetQuantity = event.target.parentElement.previousElementSibling;
      const $targetPrice = $targetQuantity.previousElementSibling;
      const $targetName = $targetPrice.previousElementSibling;
      this.reRenderProductAddMenu($targetName, $targetPrice, $targetQuantity);
    });
  };

  getPurchaseButtons = () => {
    const $$purchaseButtons = document.querySelectorAll(DOM.$$PURCHASE_BUTTONS);
    $$purchaseButtons.forEach(($purchaseButton) => this.onClickPurchaseButton($purchaseButton));
  };

  spendCoin = (vendingMachineCoinQuantity, currentCoin, vendingMachineCoinAmount, userCoinAmount) => {
    while (vendingMachineCoinQuantity > NUMBER.ZERO && userCoinAmount - currentCoin >= NUMBER.ZERO) {
      userCoinAmount -= currentCoin;
      vendingMachineCoinAmount -= currentCoin;
      vendingMachineCoinQuantity -= NUMBER.ONE;
    }

    return [vendingMachineCoinQuantity, vendingMachineCoinAmount, userCoinAmount];
  };

  compareVendingMachineCoinAndUserCoin = (vendingMachineCoinQuantityHash, vendingMachineCoinAmount, userCoinAmount) => {
    COIN.LIST.forEach((currentCoin) => {
      const [spendVendingMachineCoinQuantity, spendVendingMachineCoinAmount, spendUserCoinAmount] = this.spendCoin(
        vendingMachineCoinQuantityHash[currentCoin],
        currentCoin,
        vendingMachineCoinAmount,
        userCoinAmount
      );
      vendingMachineCoinQuantityHash[currentCoin] -= spendVendingMachineCoinQuantity;
      vendingMachineCoinAmount = spendVendingMachineCoinAmount;
      userCoinAmount = spendUserCoinAmount;
    });

    return [vendingMachineCoinQuantityHash, vendingMachineCoinAmount, userCoinAmount];
  };

  renderReturnCoin = (vendingMachineCoinQuantityHash) => {
    this.render.returnCoinTemplate(vendingMachineCoinQuantityHash);
  };

  hasReturnCoin = () => {
    const [vendingMachineCoinQuantityHash, vendingMachineCoinAmount, userCoinAmount] =
      this.compareVendingMachineCoinAndUserCoin(
        { ...this.coins.getCoinsHash() },
        this.coins.getCoinAmount(),
        this.vendingMachine.getChargeAmount()
      );

    this.coins.replaceCoinsHash(vendingMachineCoinQuantityHash);
    this.coins.replaceCoinAmount(vendingMachineCoinAmount);
    this.vendingMachine.replaceChargeAmount(userCoinAmount);
    this.renderReturnCoin(vendingMachineCoinQuantityHash);
  };

  renderPurchaseChargeAmount = () => {
    this.render.purchaseChargeAmountTemplate();
  };

  replaceManageChargeAmount = (previousCoinAmount, currentCoinAmount) => {
    this.vendingMachineManageMenuTemplate = this.vendingMachineManageMenuTemplate.replace(
      TEMPLATE.VENDING_MACHINE_CHARGE_AMOUNT(previousCoinAmount + STRING.WON),
      TEMPLATE.VENDING_MACHINE_CHARGE_AMOUNT(currentCoinAmount + STRING.WON)
    );
  };

  replaceManageCoin = (previousCoinEntries, currentCoinEnries) => {
    previousCoinEntries.forEach((previousCoinEntry, index) => {
      const [previousCoin, previousCoinQuantity] = previousCoinEntry;
      const [currentCoin, currentCoinQuantity] = currentCoinEnries[index];

      this.vendingMachineManageMenuTemplate = this.vendingMachineManageMenuTemplate.replace(
        TEMPLATE.VENDING_MACHINE_COIN(previousCoin, previousCoinQuantity),
        TEMPLATE.VENDING_MACHINE_COIN(currentCoin, currentCoinQuantity)
      );
    });
  };

  reRenderMachineManageMenu = (previousCoinEntries, previousCoinAmount) => {
    this.vendingMachineManageMenuTemplate = localStorage.getItem(LOCAL_STORAGE.VENDING_MACHINE_MANAGE_MENU);
    const currentCoinEnries = Object.entries(this.coins.getCoinsHash());
    const currentCoinAmount = this.coins.getCoinAmount();

    this.replaceManageChargeAmount(previousCoinAmount, currentCoinAmount);
    this.replaceManageCoin(previousCoinEntries, currentCoinEnries);
    this.render.reRenderVendingMachineManageMenuTemplate(this.vendingMachineManageMenuTemplate);
  };

  onClickCoinReturnButton = () => {
    const $coinReturnButton = document.querySelector(DOM.$COIN_RETURN_BUTTON);
    $coinReturnButton.addEventListener(EVENT.CLICK, () => {
      const previousCoinsHash = { ...this.coins.getCoinsHash() };
      const previousCoinAmount = this.coins.getCoinAmount();
      if (previousCoinAmount === NUMBER.ZERO) {
        this.render.alertMessage(ERROR_MESSAGE.CHARGE_COIN_FIRST);
        return;
      }

      this.hasReturnCoin();
      this.renderPurchaseChargeAmount();
      this.reRenderMachineManageMenu(Object.entries(previousCoinsHash), previousCoinAmount);
    });
  };

  hasProductPurchaseMenuTemplate = () => {
    const productPurchaseMenuTemplate = localStorage.getItem(LOCAL_STORAGE.PRODUCT_PURCHASE_MENU);
    if (!productPurchaseMenuTemplate) {
      this.render.productPurchaseMenuTemplate();
    }

    if (productPurchaseMenuTemplate) {
      this.render.haveTemplate(productPurchaseMenuTemplate);
    }

    this.renderProductStatus();
    this.onClickChargeButton();
    this.getPurchaseButtons();
    this.onClickCoinReturnButton();
  };

  isProductPurchaseMenu = (eventTarget, $productPurchaseMenu) => {
    if (eventTarget === $productPurchaseMenu) {
      this.hasProductPurchaseMenuTemplate();
    }
  };
}
