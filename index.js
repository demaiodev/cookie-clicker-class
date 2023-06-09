class CookieClicker {
    constructor(milsec = 50) {
        this.loop;
        this.milsec = milsec;
        this.allowBuying = {
            products: true,
            upgrades: true,
            techUpgrades: true
        };
        this.logging = true;
        this.styling = `
            color:white;
            background-color:black;
            border-left: 1px solid tomato;
            padding: 8px;
            font-weight: 600;
            font-family: "Comic Sans MS", "Comic Sans", cursive;
            font-size: 12px;
        `;
    }

    async timer() {
        await new Promise((res) => setTimeout(res, this.milsec));
    }

    async run() {
        this.loop = true;
        while (this.loop) {
            await this.timer();
            Game.ClickCookie();
            this.logger(`%c🍪 *click* `);
            this.findShimmer();
            this.buyTechUpgrades();
            this.buyUpgrades();
            this.buyProducts();
            this.playWizardGame();
        }
    }

    stop() {
        this.loop = false;
    }

    findShimmer() {
        const shimmer = document.querySelector('.shimmer');
        if (shimmer) {
            this.logger(`%c✨✨ Clicked shimmer ✨✨`);
            shimmer.click();
        }
    }

    buyUpgrades() {
        if (!this.allowBuying.upgrades) return;
        const upgrades = document.querySelector('#upgrades')?.children;
        if (upgrades.length > 0) {
            if (upgrades[0].innerText === 'Buy all upgrades') {
                upgrades[0].childNodes[0].click();
            } else {
                upgrades[0].click();
            }
        }
    }

    buyProducts() {
        if (!this.allowBuying.products) return;
        const products = document.querySelectorAll(".product:not(.locked):not(.disabled)");
        if (products.length > 0) {
            const product = products[products.length - 1];
            this.logger(`%cBuying ${product.children[2].children[1].innerText}`);
            product.children[0].click();
        }
    }

    buyTechUpgrades() {
        if (!this.allowBuying.techUpgrades) return;
        const techUpgrades = document.querySelector('#techUpgrades');
        if (techUpgrades.children.length > 0) {
            this.logger(`%cBuying ${techUpgrades.childNodes[0].innerText}`);
            techUpgrades.childNodes[0].click();
            const confirm = document.querySelector('#promptOption0');
            if (confirm) confirm.click();
        }
    }

    playWizardGame() {
        const wizardGrimoireMenu = document.querySelector(`#productMinigameButton7`);
        if (!wizardGrimoireMenu.parentNode.parentNode.classList.contains('onMinigame')) {
            wizardGrimoireMenu.click();
        }
        const mana = +document.querySelector('#grimoireBarText')?.innerText.split(' ')[0].split('/')[0];
        const handOfFate = document.querySelector('#grimoireSpell1');
        const handOfFateCost = +handOfFate?.childNodes[1].innerText;
        if (mana >= handOfFateCost) {
            this.logger(`%cCasting Hand of Fate!🤙👌`);
            handOfFate.click();
        }
    }

    toggleUpgradeBuying() {
        this.allowBuying.upgrades = !this.allowBuying.upgrades;
        this.logger(`%cYou have set upgrade buying to ${this.allowBuying.products}`);
    }

    toggleProductBuying() {
        this.allowBuying.products = !this.allowBuying.products;
        this.logger(`%cYou have set product buying to ${this.allowBuying.products}`);
    }

    toggleLogging() {
        this.logging = !this.logging;
    }

    logger(msg) {
        if (!this.logging) return;
        console.log(`${msg}`, `${this.styling}`);
    }
}

const clicker = new CookieClicker();
clicker.run();
