import { CartItem, CartState } from "@/app/models/product";
import { dateParser } from "../dates";
import { formatCurrency } from "../currency";
import { BLEPrinter } from "react-native-thermal-receipt-printer";

export async function printReceipt(cart: CartState, noNota: string) {
  try {
    await BLEPrinter.init();

    const devices = await BLEPrinter.getDeviceList();
    if (!devices || devices.length === 0) {
      throw new Error("No Bluetooth printers found");
    }

    const device = devices[0];
    await BLEPrinter.connectPrinter(device.inner_mac_address);

    const transDate = dateParser(new Date(), "YYYY-MM-DD HH:mm:ss");

    let receipt = "";
    receipt += "Kopmensa POS\n";
    receipt += "============================\n";
    receipt += `No Nota: ${noNota}\n`;
    receipt += `Tanggal: ${transDate}\n`;
    receipt += "----------------------------\n";

    for (const item of cart.items) {
      const left = `${item.merk} (${item.quantity}x)`;
      const right = formatCurrency(item.harga_jual * item.quantity);

      const line = left.padEnd(24, " ") + right.padStart(8, " ");
      receipt += line + "\n";
    }

    receipt += "----------------------------\n";
    receipt += "TOTAL".padEnd(24, " ") + formatCurrency(cart.totalPrice).padStart(8, " ") + "\n";
    receipt += "\nTerima Kasih 🙏\n\n\n";

    await BLEPrinter.printBill(receipt);

    console.log("✅ Print Success");
  } catch (err) {
    console.error("❌ Print Error:", err);
  }
}

export async function discoverPrinters() {
  try {
    await BLEPrinter.init();
    const devices = await BLEPrinter.getDeviceList();
    console.log("🔍 Found devices:", devices);
    return devices;
  } catch (err) {
    console.error("❌ Discover error:", err);
    return [];
  }
}
