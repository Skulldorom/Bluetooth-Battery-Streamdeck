import { action, KeyDownEvent, SingletonAction, WillAppearEvent, DidReceiveSettingsEvent } from "@elgato/streamdeck";

@action({ UUID: "com.skulldorom.bluetoothbattery.battery" })
export class BluetoothBatteryAction extends SingletonAction<BluetoothBatterySettings> {
    private intervalId: NodeJS.Timeout | null = null;

    onWillAppear(ev: WillAppearEvent<BluetoothBatterySettings>): void | Promise<void> {
        // Clear any existing intervals to avoid multiple timers
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }

        // Set up a recurring API call every 5 minutes
        this.intervalId = setInterval(() => {
            this.checkBatteryLevel(ev);
        }, 5 * 60 * 1000); // 5 minutes in milliseconds

        // Make an immediate API call when the action appears
        this.checkBatteryLevel(ev);

        return ev.action.setTitle("Bluetooth Battery");
    }

    async onKeyDown(ev: KeyDownEvent<BluetoothBatterySettings>): Promise<void> {
        // Manually trigger the battery check
        this.checkBatteryLevel(ev);
    }

	async onDidReceiveSettings(ev: DidReceiveSettingsEvent<BluetoothBatterySettings>): Promise<void> {
		// Manually trigger the battery check when settings are updated
		this.checkBatteryLevel(ev);
	}

    private async checkBatteryLevel(ev: WillAppearEvent<BluetoothBatterySettings> | KeyDownEvent<BluetoothBatterySettings> | DidReceiveSettingsEvent<BluetoothBatterySettings>): Promise<void> {
        try {
            const response = await fetch(ev.payload.settings.apiUrl??"http://127.0.0.1:9876/devices", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data: any = await response.json();

				let deviceNumber = ev.payload.settings.deviceNumber ?? 0;
				let deviceName = ev.payload.settings.deviceName ?? "Unknown Device";

                // Update the Stream Deck title with battery level info from the API response
				if (deviceNumber >= data["devices"].length) {
					await ev.action.setTitle("Device\nNot\nFound");
					await ev.action.setImage("imgs/actions/battery/Error");
					return;
				}
				

                const batteryLevel = data["devices"][deviceNumber].level;
                await ev.action.setTitle(`${deviceName}\n${batteryLevel}%`);

				

				// Update the Stream Deck image based on the battery level
				await animateBatteryImage(ev,batteryLevel);


            }
        } catch (error) {
            console.error("Network Error:", error);
            await ev.action.setTitle("Api\nError");
			await ev.action.setImage("imgs/actions/battery/Error");
        }
    }

    onWillDisappear(): void {
        // Clear the interval when the action disappears to avoid unnecessary API calls
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

// Function to animate the battery level image
async function animateBatteryImage(ev: WillAppearEvent<BluetoothBatterySettings> | KeyDownEvent<BluetoothBatterySettings> | DidReceiveSettingsEvent<BluetoothBatterySettings>,batteryLevel: number): Promise<void> {
	let batteryArray = ["imgs/actions/battery/Empty","imgs/actions/battery/Low","imgs/actions/battery/One","imgs/actions/battery/Half","imgs/actions/battery/Three","imgs/actions/battery/Full"];
	let chargeIntervals = [10,30,50,70,90];
	let waitTime = 500

	if(ev.payload.settings.charge) {
	  batteryArray = batteryArray.reverse();
	  chargeIntervals = chargeIntervals.reverse();
	}
	
	await ev.action.setImage(batteryArray[0]);
	if (batteryLevel >= chargeIntervals[4]) return;
	await new Promise(r => setTimeout(r, waitTime));
	await ev.action.setImage(batteryArray[1]);
	if (batteryLevel >= chargeIntervals[3]) return;
	await new Promise(r => setTimeout(r, waitTime));
	await ev.action.setImage(batteryArray[2]);
	if (batteryLevel >= chargeIntervals[2]) return;
	await new Promise(r => setTimeout(r, waitTime));
	await ev.action.setImage(batteryArray[3]);
	if (batteryLevel >= chargeIntervals[1]) return;
	await new Promise(r => setTimeout(r, waitTime));
	await ev.action.setImage(batteryArray[4]);
	if (batteryLevel >= chargeIntervals[0]) return;
	await new Promise(r => setTimeout(r, waitTime));
	await ev.action.setImage(batteryArray[5]);
}

type BluetoothBatterySettings = {
    apiUrl: string;
	deviceNumber: number;
	deviceName: string;
	charge: true;
};
