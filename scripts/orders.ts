/**
 * Owner tool for the store. Run from the project folder (set NORVIGATE_DATA_DIR to the same folder the site uses):
 *   npm run store:check                       readiness report (why live checkout is open or closed)
 *   npm run orders -- list [status]           list orders
 *   npm run orders -- show <orderId>          show one order
 *   npm run orders -- ship <orderId> <carrier> <trackingNumber>
 *   npm run orders -- deliver <orderId>
 *   npm run orders -- cancel <orderId> <reason>
 * Stop nothing: it is safe to run while the site is running, but run only ONE writer at a time.
 */
import { collections } from "../src/data";
import { liveProducts } from "../src/data/live-products";
import { business } from "../src/store-live/business";
import { shippingConfig } from "../src/store-live/shipping-config";
import { loadStoreConfig } from "../src/store-live/config";
import { checkReadiness } from "../src/store-live/readiness";
import { cancelOrder, getOrder, isOrderId, listOrders, markDelivered, markShipped, type OrderRecord, type OrderStatus } from "../src/store-live/orders";

const money = (minor: number) => `${(minor / 100).toFixed(2)} TRY`;

function line(o: OrderRecord) {
  return `${o.id}  ${o.status.padEnd(15)} ${o.createdAt.slice(0, 16)}  ${money(o.quote.totalMinor).padStart(12)}  ${o.buyer.name} ${o.buyer.surname} -> ${o.address.country}`;
}

async function main() {
  const [cmd, a, b, c] = process.argv.slice(2);
  switch (cmd) {
    case "check": {
      const config = loadStoreConfig();
      const products = config.allowSample && !config.production ? [...liveProducts, ...collections.products] : liveProducts;
      const r = checkReadiness({ config, business, shipping: shippingConfig, products });
      console.log(`mode: ${config.mode}   provider: ${config.provider}   ready: ${r.ready ? "YES" : "NO"}`);
      for (const i of r.issues) console.log("  - " + i);
      process.exit(r.ready ? 0 : 1);
    }
    case "list": {
      const all = await listOrders();
      const rows = a ? all.filter((o) => o.status === (a as OrderStatus)) : all;
      if (!rows.length) console.log("No orders.");
      rows.forEach((o) => console.log(line(o)));
      return;
    }
    case "show": {
      if (!isOrderId(a)) throw new Error("Give a valid order id, e.g. NVO-20261029-AB12CD");
      const o = await getOrder(a);
      if (!o) throw new Error("Order not found.");
      console.log(JSON.stringify({ ...o, accessTokenHash: "(hidden)" }, null, 2));
      return;
    }
    case "ship": {
      if (!isOrderId(a) || !b || !c) throw new Error("Usage: ship <orderId> <carrier> <trackingNumber>");
      console.log(line(await markShipped(a, b, c)));
      return;
    }
    case "deliver": {
      if (!isOrderId(a)) throw new Error("Usage: deliver <orderId>");
      console.log(line(await markDelivered(a)));
      return;
    }
    case "cancel": {
      if (!isOrderId(a) || !b) throw new Error("Usage: cancel <orderId> <reason>");
      console.log(line(await cancelOrder(a, b)));
      return;
    }
    default:
      console.log("Commands: check | list [status] | show <id> | ship <id> <carrier> <tracking> | deliver <id> | cancel <id> <reason>");
  }
}
main().catch((e) => { console.error("Error:", e instanceof Error ? e.message : e); process.exit(1); });
