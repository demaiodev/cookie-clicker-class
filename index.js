class CookieClicker {
    constructor(milsec = 500) {
        this.loop;
        this.milsec = milsec;
        this.allowBuying = {
            products: true,
            upgrades: true
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
        const cookie = document.querySelector('#bigCookie');
        while (this.loop) {
            await this.timer();
            cookie.click();
            this.logger(
                `%c 🍪 *click* `
            );
            this.findShimmer();
            this.buyCheapestUpgrade();
            this.buyMostExpensiveProduct();
        }
    }

    stop() {
        this.loop = false;
    }

    findShimmer() {
        const shimmer = document.querySelector('.shimmer');
        if (shimmer) {
            this.logger(
                `%c ✨✨ Clicked shimmer ✨✨`
            );
            shimmer.click();
        }
    }

    buyCheapestUpgrade() {
        if (!this.allowBuying.upgrades) return;
        const upgrades = document.querySelector('#upgrades')?.children;
        if (upgrades.length > 0) upgrades[0].click();
    }

    buyMostExpensiveProduct() {
        if (!this.allowBuying.products) return;
        const products = document.querySelectorAll(".product:not(.locked):not(.disabled)");
        if (products.length > 0) {
            const product = products[products.length - 1];
            this.logger(
                `%c Buying ${product.children[2].children[1].innerHTML}`
            );
            product.children[0].click();
        }
    }

    toggleUpgradeBuying() {
        this.allowBuying.upgrades = !this.allowBuying.upgrades;
        this.logger(
            `%c You have set upgrade buying to ${this.allowBuying.products}`
        );
    }

    toggleProductBuying() {
        this.allowBuying.products = !this.allowBuying.products;
        this.logger(
            `%c You have set product buying to ${this.allowBuying.products}`
        );
    }

    toggleLogging() {
        this.logging = !this.logging;
    }

    logger(msg) {
        if (!this.logging) return;
        console.log(
            `${msg}`,
            `${this.styling}`
        );
    }

}

let clicker = new CookieClicker();
clicker.run();
